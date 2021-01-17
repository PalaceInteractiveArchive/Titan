import React from 'react';
import Icon from '@material-ui/icons/SettingsApplications';
import DataTable from 'react-data-table-component';
import MatMenu from './EditMenuButton';
import Axios from 'axios';

export default class EditTable extends React.Component {
  state = {
    data: [],
    columns: [
      {
        cell: () => <Icon style={{ fill: '#43a047' }} />,
        width: '56px', // custom width for icon button
        style: {
          borderBottom: '1px solid #FFFFFF',
          marginBottom: '-1px',
        },
      },
      {
        name: 'Application Name',
        selector: 'name',
        sortable: true,
        grow: 2,
        style: {
          color: '#202124',
          fontSize: '14px',
          fontWeight: 500,
        },
      },
      {
        name: 'Current Status',
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
    ],
    customStyles:{
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
    }
  }

  componentDidMount() {
    Axios.get(`https://internal-api.palace.network/titan/application/getAllTypes`)
    .then((res) => {
      this.setState({ data: res.data})
    })
  }


  render() {
    return(
    <DataTable
    title="All Available Applications"
    columns={this.state.columns}
    data={this.state.data}
    customStyles={this.state.customStyles}
    highlightOnHover
    pointerOnHover
  />)
  }
}

