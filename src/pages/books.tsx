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
  Stack,
  tokens,
} from '@cebus/react-components';
import type { InputProps } from '@cebus/react-components';
import { dehydrate } from 'react-query/hydration';
import { useQuery, useMutation } from 'react-query';
import { fetchBooks, createBook, deleteBook, updateBook } from '../server';
import { queryClient } from '../clients/react-query';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

const inputStyles = {
  height: '34px',
  width: '100%',
  margin: '-15px',
  border: '0px',
  padding: '15px',
  color: tokens.textColor,
  backgroundColor: tokens.canvasColor,
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

  const onPost = () => {
    const incomingData = {
      title: title,
      author: author,
      genre: genre,
      stock: parseInt(stock),
      price: parseInt(price),
    };

    postItem.mutate(incomingData);
  };

  const onUpdate = (props: any) => {
    updateItem.mutate(props);
  };

  const onDelete = (itemToRemove: number) => {
    deleteItem.mutate({ id: itemToRemove });
  };

  const DataRow = (props: any) => {
    const { id, author, genre, price, stock, title } = props;

    const [inputTitle, setInputTitle] = React.useState(title);

    const onInputTitleChange = (ev: React.ChangeEvent<HTMLInputElement>) => setInputTitle(ev.target.value);

    return (
      <TableRow key={id}>
        <TableCell>{id}</TableCell>
        <TableCell>
          <input id={id + '-title'} value={inputTitle} onChange={onInputTitleChange} style={inputStyles} />
        </TableCell>
        <TableCell>{author}</TableCell>
        <TableCell>{genre}</TableCell>
        <TableCell>{price}</TableCell>
        <TableCell>{stock}</TableCell>
        <TableCell>
          <Button
            appearance="transparent"
            color="brand"
            shape="circle"
            onClick={() => onUpdate({ where: id, data: { inputTitle, author, genre, price, stock } })}
          >
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
      <Header1>Books</Header1>
      <Body>Type in a table cell and press save to update an item.</Body>
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
        <Button appearance="primary" onClick={onPost}>
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
            <TableCell>Save</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>{TableItems}</TableBody>
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
