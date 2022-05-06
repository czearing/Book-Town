import * as React from 'react';
import { queryClient } from '../clients/react-query';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { fetchUserItems } from '../server';

const UserItems: InferGetServerSidePropsType<typeof getServerSideProps> = ({}) => {
  const { data } = useQuery('userItems', fetchUserItems);
  console.log(data);
  return <>asdasd</>;
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  await queryClient.prefetchQuery('userItems', fetchUserItems);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default UserItems;
