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
  SearchIcon,
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
  width: 'calc(100%-1px)',
  margin: '-15px',
  border: '0px',
  padding: '15px',
  color: tokens.textColor,
  backgroundColor: tokens.canvasColor,
};

const Books: InferGetServerSidePropsType<typeof getServerSideProps> = ({}) => {
  const [searchValue, setSearchValue] = React.useState('');
  const { data } = useQuery(['books', searchValue], () => fetchBooks({ id: 134 }));

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

  const onSearchValueChange: InputProps['onChange'] = (ev, incomingValue) => setSearchValue(incomingValue.value);

  const AddRecord = () => {
    const [title, setTitle] = React.useState('');
    const [author, setAuthor] = React.useState('');
    const [genre, setGenre] = React.useState('');
    const [stock, setStock] = React.useState('');
    const [price, setPrice] = React.useState('');

    const onTitleChange: InputProps['onChange'] = (ev, incomingValue) => setTitle(incomingValue.value);
    const onAuthorChange: InputProps['onChange'] = (ev, incomingValue) => setAuthor(incomingValue.value);
    const onGenreChange: InputProps['onChange'] = (ev, incomingValue) => setGenre(incomingValue.value);
    const onStockChange: InputProps['onChange'] = (ev, incomingValue) => setStock(incomingValue.value);
    const onPriceChange: InputProps['onChange'] = (ev, incomingValue) => setPrice(incomingValue.value);

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

    return (
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
      <Header1>Books</Header1>
      <Divider />
      <Header3>Search Titles</Header3>
      <Body>Type in the input field below to search for an item.</Body>
      <Input
        value={searchValue}
        onChange={onSearchValueChange}
        contentAfter={<SearchIcon />}
        placeholder="Enter your search value"
        label="Search"
      />
      <Divider />
      <Header3>Add a Record</Header3>
      <Body>To add a record fill out the rows below. To edit a cell, update its input field and then press save.</Body>
      <AddRecord />
      <Divider />
      <Header3>Table</Header3>
      <Body>To edit a cell, update its input field and then press save.</Body>
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

// export const getServerSideProps: GetServerSideProps = async () => {
//   await queryClient.prefetchQuery('books', fetchBooks);

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// };

export default Books;
