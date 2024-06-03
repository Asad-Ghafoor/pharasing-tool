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
import { HistryDrawerWidth } from "../pages/AdminLayout";
import { Logo } from "../../../../assets/image/index";

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    boxShadow: "0px 0px 8px 0px black",
    width: HistryDrawerWidth,
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

function HistorySideBar({ open, navLinks }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [openChild, setOpenChild] = React.useState(false);

  const handleNavigate = (path) => {
    if (path) navigate(`/admin${path}`);
  };

  const getTabActive = (tab) => {
    if (pathname.includes(`/admin${tab}`)) {
      return true;
    }
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
          {/* <Typography
            component={"h2"}
            variant="h2"
            sx={{
              fontSize: "14px",
              fontWeight: "700",
              color: "white",
            }}
          >
            Realtor Dashboard
          </Typography> */}
        </Box>
       
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
                    backgroundColor: getTabActive(tab.link) && "#fff",
                    borderRadius: "10px",
                    "&:hover": {
                      backgroundColor: "#fff",
                    },
                    "&:hover .sidebarIcon": {
                      color: "black",
                    },
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
                    {typeof tab.icon === "string" ? (
                      <Box
                        component={"img"}
                        src={tab.icon}
                        sx={{
                          width: "24px",
                          height: "24px",
                          filter:
                            getTabActive(tab.link) && "invert(1) brightness(1)",
                        }}
                        alt={"icon"}
                      />
                    ) : (
                      <tab.icon
                        className="sidebarIcon"
                        sx={{
                          color: getTabActive(tab.link) ? "black" : "white",
                        }}
                      />
                    )}
                  </ListItemIcon>
                  <ListItemText>
                    <Box
                      component="span"
                      className="list-item-label"
                      sx={{
                        color: getTabActive(tab.link) ? "#252526" : "#fff",
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
        </Box>
      </List>
    </Drawer>
  );
}

export default HistorySideBar;
