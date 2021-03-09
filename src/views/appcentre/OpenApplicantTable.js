import React from 'react';
import Icon from '@material-ui/icons/SupervisedUserCircle';
import DataTable from 'react-data-table-component';
import MatMenu from './ApplicantMenuButton';
import Axios from 'axios';
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default class ApplicantTable extends React.Component {
  state = {
    loaded: false,
    data: [],
    types: [],
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
        name: 'Application Type',
        selector: 'appId',
        sortable: true,
        grow: 2,
        style: {
          color: '#202124',
          fontSize: '14px',
          fontWeight: 500,
        },
      },
      {
        name: 'Applicant',
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
        name: 'Current Status',
        selector: 'outcome',
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
    Axios.post(`${process.env.REACT_APP_API_URL}/titan/application/getAllPendingApplicants`, {
        accessToken: cookies.get('accessToken'),
        user: cookies.get('user'),
    })
    .then((res) => {
      this.setState({ data: res.data})
    })
    Axios.post(`${process.env.REACT_APP_API_URL}/titan/application/getAllTypes`, {
      accessToken: cookies.get('accessToken'),
      user: cookies.get('user'),
    })
    .then((res) => {
      let data = this.state.data;
      data.forEach(element => {
        let selected = res.data.find(o => o.appId === parseInt(element.appId));
        element.appId = selected.name;
        Axios.get(`https://api.ashcon.app/mojang/v2/user/${element.uuid}`)
        .then((res) => {
            element.username = res.data.username;
            element.outcome = element.outcome[0].toUpperCase() + element.outcome.substring(1);
            this.setState({ data: data });
            this.setState({ loaded: true})
        })
      });
    })
  }

  customStyles = {
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
  
  render() {
    if (!this.state.loaded) {
      return(<h2>Just Loading this for you. One moment!</h2>)
    } else {
      console.log(this.state.data)
      return(
      <DataTable
      title="All Open Applications"
      columns={this.state.columns}
      data={this.state.data}
      customStyles={this.state.customStyles}
      highlightOnHover
      pointerOnHover
    />)
    }
  }
}

