import * as React from 'react';
import { Display } from '@cebus/react-components';
import { dehydrate } from 'react-query/hydration';
import { useQuery } from 'react-query';
import { fetchBooks } from '../server';
import { queryClient } from '../clients/react-query';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

const Home: InferGetServerSidePropsType<typeof getServerSideProps> = ({}) => {
  const { data } = useQuery('books', fetchBooks);
  console.log(data);
  return <>Hello world</>;
};

export default Home;
