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
import { fetchBooks, createBook, deleteBook, updateBook, fetchUser } from '../server';
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
  const { data, isLoading } = useQuery('user', fetchBooks);

  const [isError, setIsError] = React.useState(false);

  const postItem = useMutation(createBook, {
    onError: async () => {
      setIsError(true);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries('books');
      setIsError(false);
    },
  });

  const deleteItem = useMutation(deleteBook, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('books');
    },
  });

  const updateItem = useMutation(updateBook, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('books');
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
          type="number"
          style={{ maxWidth: '150px' }}
          danger={isError}
        />
        <Input
          value={email}
          onChange={onEmailChange}
          label="Email"
          type="number"
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
    const { id, author, genre, price, stock, title } = props;

    const [inputTitle, setInputTitle] = React.useState(title);
    const [inputAuthor, setInputAuthor] = React.useState(author);
    const [inputGenre, setInputGenre] = React.useState(genre);
    const [inputPrice, setInputPrice] = React.useState(price);
    const [inputStock, setInputStock] = React.useState(stock);

    const onInputTitleChange = (ev: React.ChangeEvent<HTMLInputElement>) => setInputTitle(ev.target.value);
    const onInputAuthorChange = (ev: React.ChangeEvent<HTMLInputElement>) => setInputAuthor(ev.target.value);
    const onInputGenreChange = (ev: React.ChangeEvent<HTMLInputElement>) => setInputGenre(ev.target.value);
    const onInputPriceChange = (ev: React.ChangeEvent<HTMLInputElement>) => setInputPrice(ev.target.value);
    const onInputStockChange = (ev: React.ChangeEvent<HTMLInputElement>) => setInputStock(ev.target.value);

    const onUpdateClick = () =>
      onUpdate({
        where: { id: id },
        data: {
          title: inputTitle,
          author: inputAuthor,
          genre: inputGenre,
          price: parseInt(inputPrice),
          stock: parseInt(inputStock),
        },
      });

    return (
      <TableRow key={id}>
        <TableCell>{id}</TableCell>
        <TableCell>
          <input value={inputTitle} onChange={onInputTitleChange} style={inputStyles} />
        </TableCell>
        <TableCell>
          <input value={inputAuthor} onChange={onInputAuthorChange} style={inputStyles} />
        </TableCell>
        <TableCell>
          <input value={inputGenre} onChange={onInputGenreChange} style={inputStyles} />
        </TableCell>
        <TableCell>
          <input value={inputPrice} onChange={onInputPriceChange} style={inputStyles} />
        </TableCell>
        <TableCell>
          <input value={inputStock} onChange={onInputStockChange} style={inputStyles} />
        </TableCell>
        <TableCell>
          <Button appearance="transparent" color="brand" shape="circle" onClick={onUpdateClick}>
            Save
          </Button>
        </TableCell>
        <TableCell>
          <Button appearance="subtle" color="danger" shape="circle" onClick={() => onDelete(id)}>
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
