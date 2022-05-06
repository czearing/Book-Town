import * as React from 'react';
import { queryClient } from '../clients/react-query';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { fetchUserItems } from '../server';

const UserItems: InferGetServerSidePropsType<typeof getServerSideProps> = ({}) => {
  const { data } = useQuery('userItems', fetchUserItems);
  console.log(data);
  return <>asdasd</>;
};

export const getServerSideProps: GetServerSideProps = async () => {
  await queryClient.prefetchQuery('userItems', fetchUserItems);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default UserItems;
