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
  Input,
  Header3,
  Stack,
  Divider,
  tokens,
} from '@cebus/react-components';
import type { InputProps } from '@cebus/react-components';
import { dehydrate } from 'react-query/hydration';
import { useQuery, useMutation } from 'react-query';
import { createWarehouse, deleteWarehouse, fetchWarehouse, updateWarehouse } from '../server';
import { queryClient } from '../clients/react-query';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

const inputStyles = {
  height: '34px',
  width: 'calc(100%-1px)',
  margin: '-15px',
  border: '0px',
  padding: '15px',
  color: tokens.textColor,
  backgroundColor: tokens.canvasColor,
};

const Warehouse: InferGetServerSidePropsType<typeof getServerSideProps> = ({}) => {
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

  const AddRecord = () => {
    const [address, setAddress] = React.useState('');

    const onAddressChange: InputProps['onChange'] = (ev, incomingValue) => setAddress(incomingValue.value);

    const onPost = () => {
      const incomingData = {
        address: address,
      };

      postItem.mutate(incomingData);
    };

    return (
      <Stack verticalAlignment="center">
        <Input
          value={address}
          onChange={onAddressChange}
          label="Address"
          size="small"
          style={{ maxWidth: '150px' }}
          danger={isError}
        />
        <Button appearance="primary" onClick={onPost}>
          Add record
        </Button>
      </Stack>
    );
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

  return (
    <>
      <Header1>Warehouses</Header1>
      <Divider />
      <Header3>Add a Record</Header3>
      <Body>To add a record fill out the rows below. To edit a cell, update its input field and then press save.</Body>
      <AddRecord />
      <Divider />
      <Header3>Table</Header3>
      <Body>To edit a cell, update its input field and then press save.</Body>
      {!isLoading ? (
        <Table label="Basic table example">
          <TableHeader>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Save</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>{TableItems}</TableBody>
        </Table>
      ) : (
        <Body>Loading...</Body>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  await queryClient.prefetchQuery('warehouse', fetchWarehouse);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Warehouse;
