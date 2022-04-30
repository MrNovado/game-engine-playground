import React, { useEffect, useMemo, useRef } from 'react';
import styled from '@emotion/styled';

import { Entity } from '../../store/common';

const Ball = styled.div`
  position: absolute;
  border: 1px solid gray;
  border-radius: 50%;
`;

export const BallEntity: React.FC<{ entity: Entity }> = ({ entity }) => {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(
    function update() {
      if (elRef.current) {
        const size = `${entity.radius * 2}px`;
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
