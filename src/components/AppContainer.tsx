import { Container } from '@cebus/react-components';
import { ReactNode } from 'react';
import { Toolbar } from './Toolbar';

export const AppContainer = (props: { children: ReactNode }) => {
  return (
    <>
      <Toolbar />
      <Container>{props.children}</Container>
    </>
  );
};
