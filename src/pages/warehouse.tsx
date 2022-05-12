import * as React from 'react';
import {
  Header1,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  Body,
  Button,
  Header3,
  Divider,
  tokens,
} from '@cebus/react-components';
import { AddRecord } from '../components';
import type { Record } from '../components';
import { useQuery, useMutation } from 'react-query';
import { createWarehouse, deleteWarehouse, fetchWarehouse, updateWarehouse } from '../server';
import { queryClient } from '../clients/react-query';
import type { NextPage } from 'next';

const inputStyles = {
  height: '34px',
  width: 'calc(100%-1px)',
  margin: '-15px',
  border: '0px',
  padding: '15px',
  color: tokens.textColor,
  backgroundColor: tokens.canvasColor,
};

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

  const onUpdate = (props: any) => {
    updateItem.mutate(props);
  };

  const onDelete = (itemToRemove: number) => {
    deleteItem.mutate({ id: itemToRemove });
  };

  const DataRow = (props: any) => {
    const [address, setAddress] = React.useState(props.address);

    const onAddressChange = (ev: React.ChangeEvent<HTMLInputElement>) => setAddress(ev.target.value);

    const onUpdateClick = () =>
      onUpdate({
        where: { id: props.id },
        data: {
          address: address,
        },
      });

    return (
      <TableRow key={props.id}>
        <TableCell>{props.id}</TableCell>
        <TableCell>
          <input value={address} onChange={onAddressChange} style={inputStyles} />
        </TableCell>
        <TableCell>
          <Button appearance="transparent" color="brand" shape="circle" onClick={onUpdateClick}>
            Save
          </Button>
        </TableCell>
        <TableCell>
          <Button appearance="subtle" color="danger" shape="circle" onClick={() => onDelete(props.id)}>
            X
          </Button>
        </TableCell>
      </TableRow>
    );
  };

  const TableItems = data?.map((item: any) => {
    return <DataRow {...item} />;
  });

  const records: Record[] = [{ name: 'Address', id: 'address', type: 'text' }];

  return (
    <>
      <Header1>Warehouses</Header1>
      <Divider />
      <AddRecord records={records} isError={isError} postItem={postItem} />
      <Divider />
      <Header3>Table</Header3>
      <Body>To edit a cell, update its input field and then press save.</Body>

      <Table label="Basic table example">
        <TableHeader>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Save</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHeader>
        {!isLoading ? <TableBody>{TableItems}</TableBody> : <Body>Loading...</Body>}
      </Table>
    </>
  );
};

export default Warehouse;
