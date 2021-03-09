import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useHistory } from 'react-router-dom';
import MoreVertIcon from '@material-ui/icons/MoreVert';
// import DeleteIcon from '@material-ui/icons/Delete';
// import Divider from '@material-ui/core/Divider';
// import Typography from '@material-ui/core/Typography';

// eslint-disable-next-line react/prop-types
const MatMenu = ({ row, onDeleteRow, size }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const history = useHistory();

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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

        <MenuItem style={{fontFamily: 'Open Sans, sans-serif'}} onClick={() => { history.push("/dash/appView/" + row.id) }}>
          View Application
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MatMenu;