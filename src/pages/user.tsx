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
import { createUser, deleteUser, fetchUser, updateUser } from '../server';
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

  const onUpdate = (props: any) => {
    updateItem.mutate(props);
  };

  const onDelete = (itemToRemove: number) => {
    deleteItem.mutate({ id: itemToRemove });
  };

  const DataRow = (props: any) => {
    const [firstName, setFirstName] = React.useState(props.firstName);
    const [lastName, setLastName] = React.useState(props.lastName);
    const [userName, setUsername] = React.useState(props.userName);
    const [password, setPassword] = React.useState(props.password);
    const [email, setEmail] = React.useState(props.email);

    const onFirstNameChange = (ev: React.ChangeEvent<HTMLInputElement>) => setFirstName(ev.target.value);
    const onLastNameChange = (ev: React.ChangeEvent<HTMLInputElement>) => setLastName(ev.target.value);
    const onUserNameChange = (ev: React.ChangeEvent<HTMLInputElement>) => setUsername(ev.target.value);
    const onPasswordChange = (ev: React.ChangeEvent<HTMLInputElement>) => setPassword(ev.target.value);
    const onEmailChange = (ev: React.ChangeEvent<HTMLInputElement>) => setEmail(ev.target.value);

    const onUpdateClick = () =>
      onUpdate({
        where: { id: props.id },
        data: {
          firstName: firstName,
          lastName: lastName,
          userName: userName,
          password: password,
          email: email,
        },
      });

    return (
      <TableRow key={props.id}>
        <TableCell>{props.id}</TableCell>
        <TableCell>
          <input value={firstName} onChange={onFirstNameChange} style={inputStyles} />
        </TableCell>
        <TableCell>
          <input value={lastName} onChange={onLastNameChange} style={inputStyles} />
        </TableCell>
        <TableCell>
          <input value={userName} onChange={onUserNameChange} style={inputStyles} />
        </TableCell>
        <TableCell>
          <input value={email} onChange={onEmailChange} style={inputStyles} />
        </TableCell>
        <TableCell>
          <input value={password} onChange={onPasswordChange} style={inputStyles} />
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
      <Header3>Table</Header3>
      <Body>To edit a cell, update its input field and then press save.</Body>
      <Table label="Basic table example">
        <TableHeader>
          <TableRow>
            <TableCell>Id</TableCell>
            {records.map(record => (
              <TableCell>{record.name}</TableCell>
            ))}
            <TableCell>Save</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHeader>
        {!isLoading ? <TableBody>{TableItems}</TableBody> : <Body>Loading...</Body>}
      </Table>
    </>
  );
};

export default User;
