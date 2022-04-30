import React from 'react';
import styled from '@emotion/styled';

import { GameField } from './features';

const AppContainer = styled.div`
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 16px;
`;

export const App: React.FC = () => {
  return (
    <AppContainer>
      <GameField />
      <div />
    </AppContainer>
  );
};
