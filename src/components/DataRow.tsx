import React from 'react';
import { TableRow, TableCell, Button, tokens } from '@cebus/react-components';
import type { Record } from './index';

const inputStyles = {
  height: '34px',
  width: '100%',
  margin: '-15px',
  border: '0px',
  padding: '14px',
  color: tokens.textColor,
  backgroundColor: tokens.canvasColor,
  flexGrow: '1',
};

type DataRowProps = {
  /**
   * The required records for the item to post in the database.
   */
  records: Record[];

  /**
   * The data for the row in the table.
   */
  data: any;

  onUpdate: any;
  onDelete: any;
};

export const DataRow = (props: DataRowProps) => {
  const { records, data, onUpdate, onDelete } = props;
  const [rowData, setRowData] = React.useState(data);

  const onRowDataChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const value = ev.target.value;

    setRowData({
      ...rowData,
      [ev.target.name]: value,
    });
  };

  const onUpdateClick = (ev: any) => {
    ev.preventDefault();

    const updatedData: any = {};
    for (const key in rowData) {
      if (key !== 'id') {
        switch (records.find(x => x.id === key)?.type) {
          case 'number':
            updatedData[key] = parseInt(rowData[key]);
            break;
          default:
            updatedData[key] = rowData[key];
            break;
        }
      }
    }

    onUpdate({
      where: { id: data.id },
      data: updatedData,
    });
  };

  return (
    <TableRow key={data.id}>
      <TableCell>{data.id}</TableCell>
      {Object.keys(data).map(
        key =>
          key !== 'id' && (
            <TableCell>
              <input
                value={rowData[key]}
                type={records.find(x => x.id === key)?.type}
                name={key}
                onChange={onRowDataChange}
                style={inputStyles}
              />
            </TableCell>
          ),
      )}
      <TableCell>
        <Button appearance="transparent" color="brand" shape="circle" type="submit" onClick={onUpdateClick}>
          Save
        </Button>
      </TableCell>
      <TableCell>
        <Button appearance="subtle" color="danger" shape="circle" onClick={() => onDelete(data.id)}>
          X
        </Button>
      </TableCell>
    </TableRow>
  );
};
