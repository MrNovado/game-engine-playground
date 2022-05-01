import React from 'react';
import styled from '@emotion/styled';

const Ball = styled.div`
  position: absolute;
  box-sizing: border-box;
  border: 2px solid gray;
  border-radius: 50%;
`;

type BallEntityProps = {
  id: string;
  onRef: (id: string) => (element: HTMLDivElement) => void;
};

export const BallEntity = React.memo<BallEntityProps>(({ id, onRef }) => {
  return <Ball ref={onRef(id)} />;
});

BallEntity.displayName = 'BallEntity[memo]';
