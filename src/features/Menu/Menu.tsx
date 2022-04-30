import React, { useLayoutEffect, useRef } from 'react';
import styled from '@emotion/styled';

import { useSelector } from 'react-redux';
import { AppStore } from '../../store/common';

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 8px;
`;

const Time = () => {
  const ref = useRef<HTMLElement>(null);
  const time = useSelector<AppStore, AppStore['simulatedTime']>((s) => s.simulatedTime);

  useLayoutEffect(
    function updateTime() {
      if (ref.current) {
        ref.current.innerHTML = `${time.toFixed(2)}`;
      }
    },
    [time],
  );

  return (
    <div>
      Simulated time: <span ref={ref} />
    </div>
  );
};

export const Menu: React.FC = () => {
  return (
    <MenuContainer>
      <Time />
    </MenuContainer>
  );
};
