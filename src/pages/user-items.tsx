import * as React from 'react';
import { useQuery, useMutation } from 'react-query';
import { createUserItems, deleteUserItems, fetchUserItems, updateUserItems } from '../server';
import { Header1, Divider } from '@cebus/react-components';
import { AddRecord, DataTable } from '../components';
import type { Record } from '../components';
import { queryClient } from '../clients/react-query';
import type { NextPage } from 'next';

const UserItems: NextPage = () => {
  const { data, isLoading } = useQuery('user-items', fetchUserItems);

  const [isError, setIsError] = React.useState(false);

  const postItem = useMutation(createUserItems, {
    onError: async () => {
      setIsError(true);
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries('user-items');
      setIsError(false);
    },
  });

  const deleteItem = useMutation(deleteUserItems, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('user-items');
    },
  });

  const updateItem = useMutation(updateUserItems, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('user-items');
    },
  });

  const records: Record[] = [
    { name: 'Id User', id: 'idUser', type: 'number' },
    { name: 'Id Book', id: 'idBook', type: 'number' },
  ];

  return (
    <>
      <Header1>User items</Header1>
      <Divider />
      <AddRecord records={records} postItem={postItem} isError={isError} />
      <Divider />
      <DataTable records={records} data={data} isLoading={isLoading} updateItem={updateItem} deleteItem={deleteItem} />
    </>
  );
};

export default UserItems;
