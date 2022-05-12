import * as React from 'react';
import type { NextPage } from 'next';
import { useQuery } from 'react-query';
import { fetchUserItems } from '../server';

const UserItems: NextPage = ({}) => {
  const { data } = useQuery('userItems', fetchUserItems);
  console.log(data);
  return <>asdasd</>;
};

export default UserItems;
