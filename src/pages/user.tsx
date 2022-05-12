import * as React from 'react';
import { Header1, Divider } from '@cebus/react-components';
import { AddRecord, DataTable } from '../components';
import type { Record } from '../components';
import { useQuery, useMutation } from 'react-query';
import { createUser, deleteUser, fetchUser, updateUser } from '../server';
import { queryClient } from '../clients/react-query';
import type { NextPage } from 'next';

const User: NextPage = ({}) => {
  const { data, isLoading } = useQuery('user', fetchUser);

  const [isError, setIsError] = React.useState(false);

  const postItem = useMutation(createUser, {
    onError: async () => {
      setIsError(true);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries('user');
      setIsError(false);
    },
  });

  const deleteItem = useMutation(deleteUser, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('user');
    },
  });

  const updateItem = useMutation(updateUser, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('user');
    },
  });

  const records: Record[] = [
    { name: 'First name', id: 'firstName', type: 'text' },
    { name: 'Last name', id: 'lastName', type: 'text' },
    { name: 'User name', id: 'userName', type: 'text' },
    { name: 'Password', id: 'password', type: 'text' },
    { name: 'Email', id: 'email', type: 'text' },
  ];

  return (
    <>
      <Header1>User</Header1>
      <Divider />
      <AddRecord records={records} postItem={postItem} isError={isError} />
      <Divider />
      <DataTable records={records} data={data} isLoading={isLoading} updateItem={updateItem} deleteItem={deleteItem} />
    </>
  );
};

export default User;
