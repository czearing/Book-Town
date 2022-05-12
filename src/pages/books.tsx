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
  Divider,
  SearchIcon,
  tokens,
} from '@cebus/react-components';
import type { InputProps } from '@cebus/react-components';
import { useQuery, useMutation } from 'react-query';
import { AddRecord, Record } from '../components';
import { fetchBooks, createBook, deleteBook, updateBook } from '../server';
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

const Books: NextPage = () => {
  const [searchValue, setSearchValue] = React.useState('');
  const { data, isLoading } = useQuery(['books', searchValue], fetchBooks);

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

  const TableItems =
    data?.length > 0 &&
    data.map((item: any) => {
      return <DataRow {...item} />;
    });

  const records: Record[] = [
    { name: 'Title', id: 'title', type: 'text' },
    { name: 'Author', id: 'author', type: 'text' },
    { name: 'Genre', id: 'genre', type: 'text' },
    { name: 'Price', id: 'price', type: 'number' },
    { name: 'Stock', id: 'stock', type: 'number' },
  ];

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
        label="Search (Work in progress)"
        disabled
      />
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

export default Books;
