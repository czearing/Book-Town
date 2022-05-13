import React from 'react';
import { Stack, Input, Button, Header3, Body } from '@cebus/react-components';

export type Record = {
  /**
   *  The name of the record
   */
  name: string;

  /**
   * The id of the record in the database.
   */
  id: string;

  /**
   * The supported type for the record.
   */
  type: 'text' | 'number' | 'date';
};

type AddRecordProps = {
  /**
   * The required records for the item to post in the database.
   */
  records: Record[];

  /**
   * Whether there is an error when posting the record.
   */
  isError: boolean;

  /**
   * The callback for the items to be posted.
   */
  postItem: any;
};

const inputStyles = { maxWidth: '150px', display: 'flex' };

export const AddRecord = (props: AddRecordProps) => {
  const { records, isError, postItem } = props;

  const onSubmit = (ev: any) => {
    ev.preventDefault();

    const data: any = {};
    for (let i = 0; i < ev.target.length; i++) {
      if (ev.target[i].tagName !== 'BUTTON') {
        switch (records[i].type) {
          case 'number':
            data[ev.target[i].id] = parseInt(ev.target[i].value);
            break;
          case 'date':
            data[ev.target[i].id] = ev.target[i].value;
            break;
          default:
            data[ev.target[i].id] = ev.target[i].value;
            break;
        }
      }
    }

    postItem.mutate(data);
  };

  return (
    <>
      <Header3>Add a record</Header3>
      <Body>To add a record fill out the rows below. To edit a cell, update its input field and then press save.</Body>
      <form onSubmit={onSubmit}>
        <Stack verticalAlignment="center">
          {records.map(record => (
            <Input
              id={record.id}
              label={record.type !== 'date' ? record.name : ''}
              placeholder={record.type === 'date' ? record.name : ''}
              size="small"
              style={inputStyles}
              type={record.type}
              required
              danger={isError}
            />
          ))}
          <Button appearance="primary" type="submit">
            Add record
          </Button>
        </Stack>
      </form>
    </>
  );
};
