import * as React from 'react';
import type { NextPage } from 'next';
import { Table, TableHeader, TableRow, TableCell, TableBody, TableFooter } from '@cebus/react-components';
import { dehydrate } from 'react-query/hydration';
import { useQuery } from 'react-query';
import { fetchBooks } from '../server';
import { queryClient } from '../clients/react-query';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

const Home: InferGetServerSidePropsType<typeof getServerSideProps> = ({}) => {
  const { data } = useQuery('books', fetchBooks);

  return (
    <>
      <Table label="Basic table example">
        <TableHeader>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Genre</TableCell>
            <TableCell>Stock</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((book: any) => (
            <TableRow>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.genre}</TableCell>
              <TableCell>{book.stock}</TableCell>
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

export default Home;
