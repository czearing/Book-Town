import * as React from 'react';
import { Header1, Divider } from '@cebus/react-components';
import { AddRecord, DataTable } from '../components';
import type { Record } from '../components';
import { useQuery, useMutation } from 'react-query';
import { createWarehouse, deleteWarehouse, fetchWarehouse, updateWarehouse } from '../server';
import { queryClient } from '../clients/react-query';
import type { NextPage } from 'next';

const Warehouse: NextPage = ({}) => {
  const { data, isLoading } = useQuery('warehouse', fetchWarehouse);

  const [isError, setIsError] = React.useState(false);

  const postItem = useMutation(createWarehouse, {
    onError: async () => {
      setIsError(true);
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries('warehouse');
      setIsError(false);
    },
  });

  const deleteItem = useMutation(deleteWarehouse, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('warehouse');
    },
  });

  const updateItem = useMutation(updateWarehouse, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('warehouse');
    },
  });

  const records: Record[] = [{ name: 'Address', id: 'address', type: 'text' }];

  return (
    <>
      <Header1>Warehouses</Header1>
      <Divider />
      <AddRecord records={records} postItem={postItem} isError={isError} />
      <Divider />
      <DataTable records={records} data={data} isLoading={isLoading} updateItem={updateItem} deleteItem={deleteItem} />
    </>
  );
};

export default Warehouse;
