import * as React from "react";
import { styled } from "@mui/material/styles";
import { Avatar, Button, Menu, Box, MenuItem, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  LogoutRounded as LogoutRoundedIcon,
} from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/authSlice";
// import SearchBar from "../Search/SearchBar";

const Container = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    minWidth: 150,
    color: "#252526",
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: "14px",
        color: "#252526",
        marginRight: "0.3rem",
      },
      "&:hover": {
        backgroundColor: "transparent",
      },
      "&:active": {
        backgroundColor: "#9F9F9F55",
      },
    },
  },
}));

export default function AdminMenu() {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

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

  return (
    <Container>
      {/* <SearchBar /> */}
      <Box>
        <Button
          id="custom-menu-button"
          aria-controls={open ? "custom-menu-body" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          disableRipple={true}
          disableTouchRipple={true}
          disableFocusRipple={true}
          variant="transparent-menu-btn"
          disableElevation
          onClick={handleClick}
        >
          <Box sx={{ display: "flex", gap: "0.7rem", alignItems: "center" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
              <PersonIcon
                alt="Avatar"
                sx={{
                  color: "#252526",
                }}
                style={{ color: "white" }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
              <Typography
                sx={{ color: "White", fontSize: "15px", fontWeight: 700 }}
                variant="h2"
                component="h2"
              >
                Logout
              </Typography>
            </Box>
          </Box>
        </Button>
        <StyledMenu
          id="custom-menu-body"
          MenuListProps={{
            "aria-labelledby": "custom-menu-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleSignOut} disableRipple>
            <LogoutRoundedIcon />
            Sign out
          </MenuItem>
        </StyledMenu>
      </Box>
    </Container>
  );
}
