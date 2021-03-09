import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Axios from "axios";
import Cookies from "universal-cookie"
import SelectModal from "./AppSelectModal";
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import MoreVertIcon from '@material-ui/icons/MoreVert';
// import DeleteIcon from '@material-ui/icons/Delete';
// import Divider from '@material-ui/core/Divider';
// import Typography from '@material-ui/core/Typography';

// eslint-disable-next-line react/prop-types
const cookies = new Cookies();

const MatMenu = ({ row, onDeleteRow, size }) => {
  const selectRef = React.createRef();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const updateStatus = (status) => {
    Axios.post(`${process.env.REACT_APP_API_URL}/titan/application/updateStatus/${row.appId}/${status}`, {
        accessToken: cookies.get('accessToken'),
        user: cookies.get('user')
      })
      .then(res => {
        if (res.status === 200) {
          window.location.reload();
        }
      })
  }

  const handleSelectOpen = () => {
    selectRef.current.toggleModal("selectModal");
    setAnchorEl(null);
  }

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
        size={size}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="menu"
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >

        <MenuItem style={{fontFamily: 'Open Sans, sans-serif'}} onClick={() => { updateStatus("open") }}>
          Open Responses
        </MenuItem>
        <MenuItem style={{fontFamily: 'Open Sans, sans-serif'}} onClick={() => { handleSelectOpen() }}>
          Open to specified
        </MenuItem>
        <MenuItem style={{fontFamily: 'Open Sans, sans-serif'}} onClick={() => { updateStatus("closed") }}>
          Close Responses
        </MenuItem>
      </Menu>
      <SelectModal ref={selectRef} appId={row.appId}/>
    </div>
  );
};

export default MatMenu;