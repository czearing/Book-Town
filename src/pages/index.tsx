import * as React from 'react';
import { SubHeadline, Display, Container } from '@cebus/react-components';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <>
      <Container
        style={{ height: '80vh', width: '100%', margin: '-15px' }}
        horizontalAlignment="center"
        verticalAlignment="center"
      >
        <span style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <Display align="center">Welcome to</Display>
          <Display color="brand" align="center">
            Book Town!
          </Display>
        </span>
        <SubHeadline align="center" style={{ width: '100%' }}>
          Navigate using the taskbar.
        </SubHeadline>
      </Container>
    </>
  );
};

export default Home;
