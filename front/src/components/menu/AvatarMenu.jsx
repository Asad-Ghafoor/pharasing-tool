import * as React from 'react';
import { styled } from '@mui/material/styles';
import {
  Avatar,
  Button,
  Menu,
  Box,
  MenuItem,
  Typography
} from '@mui/material';
import { useNavigate } from "react-router-dom";
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  LogoutRounded as LogoutRoundedIcon
} from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
//actions
import { setUser, setUpload } from "../../features/authSlice"

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    minWidth: 150,
    color: "#252526",
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: "14px",
        color: "#252526",
        marginRight: "0.3rem",
      },
      '&:hover': {
        backgroundColor: "transparent"
      },
      '&:active': {
        backgroundColor: "#9F9F9F55"
      }
    },
  },
}));

export default function AdminMenu({
  name = "Admin",
  role = "Admin"
}) {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const { user } = useSelector(({ auth }) => auth);

  const userName = user?.userObject?.userName || "";
  const userInitial = userName.charAt(0).toUpperCase();
  const avatarSrc = `https://placehold.co/300?text=${userInitial}`;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    localStorage.clear();
    dispatch(setUser(null));
    setAnchorEl(null);
  };

  const handleProfile = () => {
    dispatch(setUpload(false));
    navigate("/user/profile")
    setAnchorEl(null)
  };
  const handlePrompt = () => {
    dispatch(setUpload(false));
    navigate("/user/prompt")
    setAnchorEl(null)
  };

  return (
    <div>
      <Button
        id="custom-menu-button"
        aria-controls={open ? 'custom-menu-body' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        disableRipple={true}
        disableTouchRipple={true}
        disableFocusRipple={true}
        variant="transparent-menu-btn"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        <Box sx={{ display: "flex", gap: "0.7rem", alignItems: "center" }}>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
            <Typography sx={{ fontSize: "13px", color: "#fff" }}>
              {userName}
            </Typography>
          </Box>
          <Box>
            <Avatar
              src={avatarSrc}
              alt="Avatar"
              sx={{
                borderRadius: "50%",
                color: "#252526"
              }}
            />
          </Box>
        </Box>
      </Button>
      <StyledMenu
        id="custom-menu-body"
        MenuListProps={{
          'aria-labelledby': 'custom-menu-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handlePrompt} sx={{ background: "#3b90b2", borderRadius: "10px", m: 2 }} disableRipple>
          <EditIcon />
          Edit Prompt
        </MenuItem>
        <MenuItem onClick={handleProfile} sx={{ background: "#3b90b2", borderRadius: "10px", m: 2 }} disableRipple>
          <EditIcon />
          Edit Profile
        </MenuItem>
        <MenuItem onClick={handleSignOut} disableRipple sx={{ background: "#3b90b2", borderRadius: "10px", m: 2 }}>
          <LogoutRoundedIcon />
          Sign out
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
