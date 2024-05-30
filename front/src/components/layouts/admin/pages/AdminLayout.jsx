import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  Toolbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
//components
import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";
//hooks
import useWindowResize from "../../../../hooks/useWindowResize";

export const drawerWidth = 80;

function AdminLayout({ children, navLinks, user }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const windowWidth = useWindowResize();

  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (windowWidth <= 80) setOpen(false);
    else setOpen(true);
  }, [windowWidth]);

  return (
    <Box sx={{ display: "flex", width: "100%", height: '100vh' }}>
      <CssBaseline />
      <AdminHeader
        open={open}
        navLinks={navLinks}
        user={user}
        toggleDrawer={toggleDrawer}
      />
      <AdminSidebar
        navLinks={navLinks}
        open={open}
        toggleDrawer={toggleDrawer}
      />
      <Box
        component="main"
        sx={{
          backgroundColor: "#f5f5f8",
          flexGrow: 1,
          height: "100vh",
          overflow: "auto !important",
          width: '100%',
        }}
      >
        <Toolbar />
        <Container maxWidth="xxl" sx={{ mt: 4, mb: 4 }}>
          {children}
        </Container>
      </Box>
    </Box>
  );
}

export default AdminLayout;
