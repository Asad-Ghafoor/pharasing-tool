import React from "react";
import { styled } from "@mui/material/styles";
import {
  AppBar as MuiAppBar,
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  Toolbar,
  IconButton,
  Button
} from "@mui/material";
import {
  Menu as MenuIcon
} from "@mui/icons-material";
import FileIcon from '@mui/icons-material/InsertDriveFile';

// For the Tab icon
import TabIcon from '@mui/icons-material/Tab';
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { drawerWidth } from "../pages/AdminLayout";
//component
import AvatarMenu from "../../../menu/AvatarMenu";
//css
import "../styles/style.css";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  boxShadow: "none",
  borderLeft: "1px solid #e4e4e8",
  backgroundColor: "#3b1d6f",
  boxShadow: "0px 0px 8px 0px black",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: 0, // Reset margin for small screens
    [theme.breakpoints.up("lg")]: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  }),
  ...(!open && {
    width: `100%`,
  }),
}));

function AdminHeader({
  open: sidebarOpen,
  navLinks,
  // user,
}) {
  const { user } = useSelector(({ auth }) => auth);

  // Mobile menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    if (path) navigate(`/admin${path}`);
    handleCloseMenu();
  };

  const getTabActive = (tab) => {
    if (pathname.includes(`/admin${tab}`)) {
      return true;
    }
  };

  return (
    <AppBar position="absolute" open={sidebarOpen}>
      <Toolbar
        sx={{
          pr: { lg: "24px", xs: "5px" },
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate('/notifications')}
            sx={{
              marginRight: "10px",
              fontSize: "12px",
              height: "40px",
              width: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: "6px",
            }}
          >
            <FileIcon /> On Markeet Cash Configuration
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate('/notifications')}
            sx={{
              marginRight: "10px",
              fontSize: "12px",
              height: "40px",
              width: "250px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: "6px",
            }}
          >
            <FileIcon /> On Markeet Cash Listings
          </Button> */}
          {/* =========== start display for xs screen =============== */}
          <IconButton
            id="basic-button"
            aria-controls={openMenu ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openMenu ? "true" : undefined}
            onClick={handleClick}
            sx={{
              marginRight: "10px",
              display: { lg: "none", xs: "flex" },
            }}
          >
            <MenuIcon sx={{ color: "white" }} />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleCloseMenu}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <List component="nav" sx={{}}>
              {navLinks.map((tab, i) => (
                <React.Fragment key={i}>
                  {tab.link && (
                    <ListItemButton
                      id={tab.id ? tab.id : ""}
                      className="appbar-menu-parent"
                      sx={{
                        mx: 2,
                        backgroundColor: getTabActive(tab.link) && "#836FFC",
                        "&:hover": {
                          backgroundColor: "#836FFC77",
                        },
                        "&:hover .sidebarIcon": {
                          color: "black",
                        },
                      }}
                      key={i}
                      onClick={() => {
                        handleNavigate(tab.link);
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          marginLeft: "0.3rem",
                          marginRight: "0.5rem",
                          minWidth: "max-content",
                          color: "black"
                        }}
                      >
                        {typeof tab.icon === "string" ? (
                          <Box
                            component={"img"}
                            src={tab.icon}
                            sx={{
                              width: "24px",
                              height: "24px",
                              color: "black",
                              filter:
                                getTabActive(tab.link) ? "black" : "white",
                            }}
                            alt={"icon"}
                          />
                        ) : (
                          <tab.icon
                            className="sidebarIcon"
                            sx={{
                              color: getTabActive(tab.link) ? "white" : "black",
                            }}
                          />
                        )}
                      </ListItemIcon>
                      <ListItemText>
                        <Box
                          component="span"
                          className="list-item-label"
                          sx={{
                            color: getTabActive(tab.link) && "white",
                            fontWeight: getTabActive(tab.link) && 600,
                          }}
                        >
                          {tab.title}
                        </Box>
                      </ListItemText>
                    </ListItemButton>
                  )}
                </React.Fragment>
              ))}
            </List>
          </Menu>
        </Box>
        {/* =========== end display for xs screen =============== */}
        <AvatarMenu
          name={`${user?.userObject?.firstName} ${user?.userObject?.lastName}`}
          role={user?.role?.name}
        />
      </Toolbar>
    </AppBar>
  );
}

export default AdminHeader;
