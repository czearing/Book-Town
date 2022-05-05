import * as React from 'react';
import {
  Header1,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Input,
  Stack,
  tokens,
} from '@cebus/react-components';
import type { InputProps } from '@cebus/react-components';
import { dehydrate } from 'react-query/hydration';
import { useQuery, useMutation } from 'react-query';

import { fetchBooks, saveBook, deleteBook } from '../server';
import { queryClient } from '../clients/react-query';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

const inputStyles = {
  height: '34px',
  margin: '-15px',
  border: '0px',
  padding: '15px',
  backgroundColor: tokens.canvasColor,
  color: tokens.inherit,
};

const Books: InferGetServerSidePropsType<typeof getServerSideProps> = ({}) => {
  const [title, setTitle] = React.useState('');
  const [author, setAuthor] = React.useState('');
  const [genre, setGenre] = React.useState('');
  const [stock, setStock] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [isError, setIsError] = React.useState(false);

  const onTitleChange: InputProps['onChange'] = (ev, incomingValue) => setTitle(incomingValue.value);
  const onAuthorChange: InputProps['onChange'] = (ev, incomingValue) => setAuthor(incomingValue.value);
  const onGenreChange: InputProps['onChange'] = (ev, incomingValue) => setGenre(incomingValue.value);
  const onStockChange: InputProps['onChange'] = (ev, incomingValue) => setStock(incomingValue.value);
  const onPriceChange: InputProps['onChange'] = (ev, incomingValue) => setPrice(incomingValue.value);

  const { data } = useQuery('books', fetchBooks);

  const save = useMutation(saveBook, {
    onError: async () => {
      setIsError(true);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries('books');
      setIsError(false);
    },
  });

  const removeItem = useMutation(deleteBook, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('books');
    },
  });

  const handleSubmit = () => {
    const incomingData = {
      title: title,
      author: author,
      genre: genre,
      stock: parseInt(stock),
      price: parseInt(price),
    };

    save.mutate(incomingData);
  };

  const onDelete = () => {
    removeItem.mutate(1);
  };

  return (
    <>
      <Header1>Books</Header1>
      <Stack verticalAlignment="center">
        <Input
          value={title}
          onChange={onTitleChange}
          label="Title"
          size="small"
          style={{ maxWidth: '150px' }}
          danger={isError}
        />
        <Input
          value={author}
          onChange={onAuthorChange}
          label="Author"
          size="small"
          style={{ maxWidth: '150px' }}
          danger={isError}
        />
        <Input
          value={genre}
          onChange={onGenreChange}
          label="Genre"
          size="small"
          style={{ maxWidth: '150px' }}
          danger={isError}
        />
        <Input
          value={stock}
          onChange={onStockChange}
          label="Stock"
          size="small"
          type="number"
          style={{ maxWidth: '150px' }}
          danger={isError}
        />
        <Input
          value={price}
          onChange={onPriceChange}
          label="Price"
          type="number"
          size="small"
          style={{ maxWidth: '150px' }}
          danger={isError}
        />
        <Button appearance="primary" onClick={handleSubmit}>
          Add record
        </Button>
      </Stack>

      <Table label="Basic table example">
        <TableHeader>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Genre</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Stock</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((book: any) => (
            <TableRow>
              <TableCell>{book.id}</TableCell>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.genre}</TableCell>
              <TableCell>{book.price}</TableCell>
              <TableCell>{book.stock}</TableCell>
              <TableCell>
                <Button appearance="subtle" color="danger" shape="circle" onClick={onDelete}>
                  X
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  await queryClient.prefetchQuery('books', fetchBooks);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Books;
