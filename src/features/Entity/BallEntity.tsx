import React, { useLayoutEffect, useMemo, useRef } from 'react';
import styled from '@emotion/styled';

import { Entity } from '../../store/common';
import { ENGINE_UPDATE_TICK } from '../../store/appConfig';

const Ball = styled.div`
  position: absolute;
  box-sizing: border-box;
  border: 2px solid gray;
  border-radius: 50%;
  /* transition: transform ${ENGINE_UPDATE_TICK}ms linear; */
`;

export const BallEntity: React.FC<{ entity: Entity }> = ({ entity }) => {
  const elRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(
    function update() {
      if (elRef.current) {
        const size = `${entity.size}px`;
        elRef.current.style.width = size;
        elRef.current.style.height = size;
        elRef.current.style.background = `${entity.color}`;
        elRef.current.style.transform = `translate(${entity.vector.x}px, ${entity.vector.y}px)`;

        elRef.current.style.borderRightColor = 'gray';
        elRef.current.style.borderLeftColor = 'gray';
        if (entity.vector.velocity > 0) {
          elRef.current.style.borderRightColor = 'red';
        } else {
          elRef.current.style.borderLeftColor = 'red';
        }
      }
    },
    [entity],
  );

  return useMemo(() => <Ball ref={elRef} />, []);
};
