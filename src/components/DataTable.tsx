import * as React from 'react';
import { Table, TableHeader, TableRow, TableCell, TableBody, Body, Header3 } from '@cebus/react-components';
import { DataRow } from './index';
import type { Record } from './index';

type DataTableProps = {
  /**
   * The required records for the item to post in the database.
   */
  records: Record[];

  /**
   * The data for the row in the table.
   */
  data: any;

  /**
   * Whether the content is loading
   */
  isLoading: boolean;

  updateItem: any;
  deleteItem: any;
};

export const DataTable = (props: DataTableProps) => {
  const { data, records, isLoading, updateItem, deleteItem } = props;

  const onUpdate = (itemToUpdate: number) => {
    updateItem.mutate(itemToUpdate);
  };

  const onDelete = (itemToRemove: number) => {
    deleteItem.mutate({ id: itemToRemove });
  };

  const TableItems =
    data?.length > 0 &&
    data.map((item: any) => {
      return <DataRow records={records} data={item} onUpdate={onUpdate} onDelete={onDelete} />;
    });

  return (
    <>
      <Header3>Table</Header3>
      <Body>To edit a cell, update its input field and then press save.</Body>
      <Table label="Basic table example">
        <TableHeader>
          <TableRow>
            <TableCell>Id</TableCell>
            {records.map((record: any) => (
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
