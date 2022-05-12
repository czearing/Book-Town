import * as React from 'react';
import { Header1, Body, Input, Header3, Divider, SearchIcon } from '@cebus/react-components';
import type { InputProps } from '@cebus/react-components';
import { useQuery, useMutation } from 'react-query';
import { AddRecord, DataTable } from '../components';
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

  const onSearchValueChange: InputProps['onChange'] = (ev, incomingValue) => setSearchValue(incomingValue.value);

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
      <DataTable records={records} data={data} isLoading={isLoading} updateItem={updateItem} deleteItem={deleteItem} />
    </>
  );
};

export default Books;
