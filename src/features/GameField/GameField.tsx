import React, { useMemo } from 'react';
import styled from '@emotion/styled';

import { useSelector } from 'react-redux';
import { AppStore } from '../../store/common';
import { BallEntity } from '../Entity';

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
  width: 600px;
  height: 600px;

  position: relative;

  border: 1px solid black;
  background: #edededd4;
`;

export const GameField: React.FC = () => {
  const entityList = useSelector<AppStore, AppStore['entityList']>((s) => s.entityList);

  const entityListPresentation = useMemo(
    () => Object.keys(entityList).map((id) => <BallEntity key={id} entity={entityList[id]} />),
    [entityList],
  );

  return (
    <GameFieldContainer>
      <Canvas>{entityListPresentation}</Canvas>
    </GameFieldContainer>
  );
};
