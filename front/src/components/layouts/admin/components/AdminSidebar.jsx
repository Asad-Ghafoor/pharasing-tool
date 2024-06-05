import * as React from "react";
import {
  Drawer as MuiDrawer,
  Toolbar,
  Box,
  styled,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/style.css";
import { drawerWidth } from "../pages/AdminLayout";
import { Logo } from "../../../../assets/image/index";
import Divider from "@mui/material/Divider";
import { useDispatch } from 'react-redux';
import { setUpload } from "../../../../features/authSlice";
import { Checkbox } from "@mui/material";

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    boxShadow: "0px 0px 8px 0px black",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    borderRight: "2px solid #3b90b2",
    backgroundColor: "#3b90b2",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(),
      },
    }),
  },
}));

function AdminSidebar({ open, navLinks }) {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { pathname } = useLocation();

  const [openChild, setOpenChild] = React.useState(false);

  const handleNavigate = (path) => {
    dispatch(setUpload(true));
    if (path) navigate(`/user${path}`);
  };

  const getTabActive = (tab) => {
    if (pathname.includes(`/user${tab}`)) {
      return true;
    }
    return false;
  };

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{ display: { lg: "flex", xs: "none" } }}
    >
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "start",
          paddingLeft: "1.5rem",
          paddingTop: "1.5rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <Box
            component={"img"}
            src={Logo}
            alt="logo"
            sx={{
              width: "auto",
              height: "30px",
              ":hover": { cursor: "pointer" },
              marginRight: "10px",
            }}
            onClick={() => navigate("/")}
          />
        </Box>
        <Divider
          sx={{ width: "100%", backgroundColor: "white", mt: 1, mb: 1 }}
          variant="middle"
        />
      </Toolbar>
      <List
        component="nav"
        sx={{
          marginTop: "1rem",
          display: "flex",
          flexFlow: "column",
          justifyContent: "start",
          height: "100%",
        }}
      >
        <Box>
          {navLinks.map((tab, i) => (
            <React.Fragment key={i}>
              {tab.link && (
                <ListItemButton
                  id={tab.id ?? ""}
                  className="sidebar-parent-btn"
                  sx={{
                    mx: open ?? 2,
                    mb: 1,
                    borderRadius: "10px"
                  }}
                  key={i}
                  onClick={() => {
                    setOpenChild(false);
                    handleNavigate(tab.link);
                  }}
                >
                  <ListItemIcon
                    sx={{
                      marginLeft: "0.3rem",
                      marginRight: "0.5rem",
                      minWidth: "max-content",
                    }}
                  >
                    <Checkbox
                      sx={{
                        width: "24px",
                        height: "24px",
                        color: "black",
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText>
                    <Box
                      component="span"
                      sx={{
                        color: "#fff",
                        fontWeight: 600,
                      }}
                    >
                      {tab.title}
                    </Box>
                  </ListItemText>
                </ListItemButton>
              )}
            </React.Fragment>
          ))}
        </Box>
      </List>
    </Drawer>
  );
}

export default AdminSidebar;
