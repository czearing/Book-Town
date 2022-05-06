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
import { createUser, deleteUser, fetchUser, updateUser } from '../server';
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

const User: InferGetServerSidePropsType<typeof getServerSideProps> = ({}) => {
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

  const AddRecord = () => {
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [userName, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [email, setEmail] = React.useState('');

    const onFirstNameChange: InputProps['onChange'] = (ev, incomingValue) => setFirstName(incomingValue.value);
    const onLastNameChange: InputProps['onChange'] = (ev, incomingValue) => setLastName(incomingValue.value);
    const onUserNameChange: InputProps['onChange'] = (ev, incomingValue) => setUsername(incomingValue.value);
    const onPasswordChange: InputProps['onChange'] = (ev, incomingValue) => setPassword(incomingValue.value);
    const onEmailChange: InputProps['onChange'] = (ev, incomingValue) => setEmail(incomingValue.value);

    const onPost = () => {
      const incomingData = {
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        password: password,
        email: email,
      };

      postItem.mutate(incomingData);
    };

    return (
      <Stack verticalAlignment="center">
        <Input
          value={firstName}
          onChange={onFirstNameChange}
          label="First name"
          size="small"
          style={{ maxWidth: '150px' }}
          danger={isError}
        />
        <Input
          value={lastName}
          onChange={onLastNameChange}
          label="Last name"
          size="small"
          style={{ maxWidth: '150px' }}
          danger={isError}
        />
        <Input
          value={userName}
          onChange={onUserNameChange}
          label="Username"
          size="small"
          style={{ maxWidth: '150px' }}
          danger={isError}
        />
        <Input
          value={password}
          onChange={onPasswordChange}
          label="Password"
          size="small"
          style={{ maxWidth: '150px' }}
          danger={isError}
        />
        <Input
          value={email}
          onChange={onEmailChange}
          label="Email"
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

  return (
    <>
      <Header1>User</Header1>
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
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Genre</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Stock</TableCell>
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
  await queryClient.prefetchQuery('user', fetchUser);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default User;
