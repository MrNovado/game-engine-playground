import React, { useLayoutEffect, useRef } from 'react';
import styled from '@emotion/styled';

import { useSelector } from 'react-redux';
import { ENGINE_SIMULATED_TIME_PER_TICK, ENGINE_UPDATE_TICK } from '../../store/appConfig';
import { AppStore } from '../../store/common';

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 8px;
`;

const TimeInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;

  > div {
    display: grid;
    grid-template-columns: 200px 100px 1fr;
    gap: 8px;

    > *:nth-child(2) {
      color: purple;
    }

    > *:nth-child(3) {
      color: gray;
    }
  }
`;

const TimeInfo = () => {
  const ref = useRef<HTMLElement>(null);
  const time = useSelector<AppStore, AppStore['simulatedTime']>((s) => s.simulatedTime);
  const freq = useSelector<AppStore, AppStore['simulatedTimeFreq']>((s) => s.simulatedTimeFreq);

  useLayoutEffect(
    function updateTime() {
      if (ref.current) {
        ref.current.innerHTML = `${time.toFixed(2)}`;
      }
    },
    [time],
  );

  return (
    <TimeInfoContainer>
      <div>
        <span>Simulated time:</span>
        <span ref={ref} />
        <span>su</span>
      </div>
      <div>
        <span>Simulated t/update:</span>
        <span>{ENGINE_SIMULATED_TIME_PER_TICK}</span>
        <span>su</span>
      </div>
      <div>
        <span>Model update time:</span>
        <span>{ENGINE_UPDATE_TICK}</span>
        <span>ms</span>
      </div>
      <div>
        <span>Simulated freq req:</span>
        <span>{freq}</span>
        <span />
      </div>
      <div>
        <span>Simulated freq act:</span>
        <span>60 fps / update_delta</span>
        <span />
      </div>
    </TimeInfoContainer>
  );
};

export const Menu: React.FC = () => {
  return (
    <MenuContainer>
      <TimeInfo />
    </MenuContainer>
  );
};
