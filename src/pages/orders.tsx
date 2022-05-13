import * as React from 'react';
import { Header1, Divider } from '@cebus/react-components';
import { AddRecord, DataTable } from '../components';
import type { Record } from '../components';
import { useQuery, useMutation } from 'react-query';
import { createOrders, deleteOrders, fetchOrders, updateOrders } from '../server';
import { queryClient } from '../clients/react-query';
import type { NextPage } from 'next';

const Orders: NextPage = ({}) => {
  const { data, isLoading } = useQuery('orders', fetchOrders);

  const [isError, setIsError] = React.useState(false);

  const postItem = useMutation(createOrders, {
    onError: async () => {
      setIsError(true);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries('orders');
      setIsError(false);
    },
  });

  const deleteItem = useMutation(deleteOrders, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('orders');
    },
  });

  const updateItem = useMutation(updateOrders, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('orders');
    },
  });

  const records: Record[] = [
    { name: 'ID User', id: 'idUser', type: 'number' },
    { name: 'ID Book', id: 'idBook', type: 'number' },
    { name: 'Order date', id: 'orderDate', type: 'text' },
  ];

  return (
    <>
      <Header1>Orders</Header1>
      <Divider />
      <AddRecord records={records} postItem={postItem} isError={isError} />
      <Divider />
      <DataTable records={records} data={data} isLoading={isLoading} updateItem={updateItem} deleteItem={deleteItem} />
    </>
  );
};

export default Orders;
