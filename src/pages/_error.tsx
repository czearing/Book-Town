import * as React from 'react';
import { Container, Header1, SubHeadline, Button } from '@cebus/react-components';
import type { NextPage } from 'next';

type ErrorProps = {
  statusCode: number | undefined;
};

const Error: NextPage<ErrorProps> = ({ statusCode }) => {
  return (
    <Container>
      <Header1 color="danger">Error {statusCode}</Header1>
      <SubHeadline>Oops you shouldn't be here. Here is a magical button to go back home.</SubHeadline>
      <Button as="a" size="large" href="/">
        Go back home 🏠
      </Button>
    </Container>
  );
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  return { statusCode };
};

export default Error;
