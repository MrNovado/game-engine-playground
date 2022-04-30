import React, { useLayoutEffect, useMemo, useRef } from 'react';
import styled from '@emotion/styled';

import { ENGINE_UPDATE_TICK, Entity } from '../../store/common';

const Ball = styled.div`
  position: absolute;
  border: 1px solid gray;
  border-radius: 50%;
  transition: transform ${ENGINE_UPDATE_TICK}ms linear;
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
      }
    },
    [entity],
  );

  return useMemo(() => <Ball ref={elRef} />, []);
};
