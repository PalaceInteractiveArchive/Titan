import React from 'react';
import Icon from '@material-ui/icons/SupervisedUserCircle';
import DataTable from 'react-data-table-component';
import MatMenu from './ApplicantMenuButton';

const data = [{id: 1, username: 'Cubits', type: 'Guide Application', status: 'Unanswered'}];

const customStyles = {
  headRow: {
    style: {
      border: 'none',
    },
  },
  headCells: {
    style: {
      color: '#202124',
      fontSize: '14px',
    },
  },
  rows: {
    highlightOnHoverStyle: {
      backgroundColor: 'rgb(230, 244, 244)',
      borderBottomColor: '#FFFFFF',
      borderRadius: '25px',
      outline: '1px solid #FFFFFF',
    },
  },
  pagination: {
    style: {
      border: 'none',
    },
  },
};

const columns = [
  {
    cell: () => <Icon style={{ fill: '#43a047' }} />,
    width: '56px', // custom width for icon button
    style: {
      borderBottom: '1px solid #FFFFFF',
      marginBottom: '-1px',
    },
  },
  {
    name: 'Username',
    selector: 'username',
    sortable: true,
    grow: 2,
    style: {
      color: '#202124',
      fontSize: '14px',
      fontWeight: 500,
    },
  },
  {
    name: 'Application Type',
    selector: 'type',
    sortable: true,
    style: {
      color: 'rgba(0,0,0,.54)',
    },
  },
  {
    name: 'Status',
    selector: 'status',
    sortable: true,
    style: {
      color: 'rgba(0,0,0,.54)',
    },
  },
  {
    cell: row => <MatMenu size="small" row={row} />,
    allowOverflow: true,
    button: true,
    width: '56px',
  },
];

export const ApplicantTable = () => (
  <DataTable
    title="Current Applications"
    columns={columns}
    data={data}
    customStyles={customStyles}
    highlightOnHover
    pointerOnHover
  />
);