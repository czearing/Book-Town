import * as React from 'react';
import type { NextPage } from 'next';
import { Table, TableHeader, TableRow, TableCell, TableBody, TableFooter } from '@cebus/react-components';

const Home: NextPage = () => {
  return (
    <>
      <Table label="Basic table example">
        <TableHeader>
          <TableRow>
            <TableCell>Product Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Quantity</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>T shirt</TableCell>
            <TableCell>$20.00</TableCell>
            <TableCell>3</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Jeans</TableCell>
            <TableCell>$30.00</TableCell>
            <TableCell>2</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell>$120.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
};

export default Home;
