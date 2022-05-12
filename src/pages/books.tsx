import * as React from 'react';
import {
  Header1,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  Body,
  Input,
  Header3,
  Divider,
  SearchIcon,
} from '@cebus/react-components';
import type { InputProps } from '@cebus/react-components';
import { useQuery, useMutation } from 'react-query';
import { AddRecord, DataRow } from '../components';
import type { Record } from '../components';
import { fetchBooks, createBook, deleteBook, updateBook } from '../server';
import { queryClient } from '../clients/react-query';
import type { NextPage } from 'next';

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

  const records: Record[] = [
    { name: 'Title', id: 'title', type: 'text' },
    { name: 'Author', id: 'author', type: 'text' },
    { name: 'Genre', id: 'genre', type: 'text' },
    { name: 'Price', id: 'price', type: 'number' },
    { name: 'Stock', id: 'stock', type: 'number' },
  ];

  const TableItems =
    data?.length > 0 &&
    data.map((item: any) => {
      return <DataRow records={records} data={item} onUpdate={onUpdate} onDelete={onDelete} />;
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
