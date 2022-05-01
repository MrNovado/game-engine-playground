import React, { useCallback, useLayoutEffect, useMemo, useRef } from 'react';
import styled from '@emotion/styled';

import { useSelector } from 'react-redux';
import { BallEntity } from '../Entity';

import { AppStore } from '../../store/common';
import { ENGINE_SIMULATED_TIME_PER_TICK, ENGINE_UPDATE_TICK, GAME_FIELD_SIZE } from '../../store/appConfig';

import { entityUpdateCase } from '../../store/entity';

const GameFieldContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background: #deb88725;
`;

const Canvas = styled.div`
  width: ${GAME_FIELD_SIZE}px;
  height: ${GAME_FIELD_SIZE}px;

  position: relative;

  outline: 1px solid black;
  background: #edededd4;
`;

export const GameField: React.FC = () => {
  const entityList = useSelector<AppStore, AppStore['entityList']>((s) => s.entityList);
  const entityListRef = useRef<Record<string, HTMLDivElement>>({});

  const onRef = useCallback(
    (id: string) => (element: HTMLDivElement) => {
      entityListRef.current[id] = element;
    },
    [],
  );

  const entityListPresentation = useMemo(() => {
    return Object.keys(entityList).map((id) => {
      return <BallEntity key={id} id={id} onRef={onRef} />;
    });
  }, [entityList, onRef]);

  useLayoutEffect(
    function planPresentationUpdate() {
      let prevUpdate = performance.now();
      let nextUpdate = prevUpdate + ENGINE_UPDATE_TICK;

      let entityListInfo = entityList;

      const update = (subsequentUpdate?: number) => {
        // updating model on subsequent updates
        if (subsequentUpdate) {
          const supposedUpdTime = nextUpdate - prevUpdate;
          const supposedUpdTimeOnePercent = supposedUpdTime / 100;

          const actualUpdTime = subsequentUpdate - prevUpdate;
          const actualUpdTimeInPercent = actualUpdTime / supposedUpdTimeOnePercent;

          const supposedSimulatedTime = ENGINE_SIMULATED_TIME_PER_TICK;
          const actualSimulatedTime = (supposedSimulatedTime / 100) * actualUpdTimeInPercent;

          entityListInfo = entityUpdateCase(entityListInfo, {
            type: '@engine/flow/tick',
            simulatedTimeOverride: actualSimulatedTime,
          });

          prevUpdate = subsequentUpdate;
          nextUpdate = prevUpdate + ENGINE_UPDATE_TICK;
        }

        // updating presentation
        Object.entries(entityListRef.current).forEach(([id, el]) => {
          const entityRef = el;
          const entity = entityListInfo[id];
          const size = `${entity.size}px`;

          entityRef.style.width = size;
          entityRef.style.height = size;
          entityRef.style.background = `${entity.color}`;
          entityRef.style.transform = `translate(${entity.vector.x}px, ${entity.vector.y}px)`;

          entityRef.style.borderRightColor = 'gray';
          entityRef.style.borderLeftColor = 'gray';
          if (entity.vector.velocity > 0) {
            entityRef.style.borderRightColor = 'red';
          } else {
            entityRef.style.borderLeftColor = 'red';
          }
        });
      };

      // first update
      update();

      // subsequent updates
      let rafId = window.requestAnimationFrame(function intoTheFutureUpdate(subsequentUpdate) {
        update(subsequentUpdate);
        rafId = window.requestAnimationFrame(intoTheFutureUpdate);
      });

      return function dispose() {
        window.cancelAnimationFrame(rafId);
      };
    },
    [entityList],
  );

  return (
    <GameFieldContainer>
      <Canvas>{entityListPresentation}</Canvas>
    </GameFieldContainer>
  );
};
