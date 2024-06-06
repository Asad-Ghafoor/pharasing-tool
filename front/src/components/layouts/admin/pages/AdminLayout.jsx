// File: src/components/layouts/admin/pages/AdminLayout.js

import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Container,
  CssBaseline,
  Toolbar,
  TextField,
  InputAdornment,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AttachmentIcon from "@mui/icons-material/Attachment";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// components
import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";
// hooks
import useWindowResize from "../../../../hooks/useWindowResize";

export const drawerWidth = 190;
export const HistryDrawerWidth = 190;

function AdminLayout({ children, navLinks, user }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { upload } = useSelector(({ auth }) => auth);
  const fileInputRef = useRef(null);
  const windowWidth = useWindowResize();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (windowWidth <= 80) setOpen(false);
    else setOpen(true);
  }, [windowWidth]);

  const handleClick = () => {
    fileInputRef.current.click();
  };
  
  console.log(upload, 'asdfgg');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      console.log('Selected file:', file);
      // Handle the selected PDF file
    } else {
      console.error('Please select a PDF file');
    }
  };

  const handleUploadClick = () => {
    // Implement your API call here
    console.log('API hit triggered');
    // Example API call using fetch
    fetch('/api/upload', {
      method: 'POST',
      // Add your request body and headers here
    })
      .then(response => response.json())
      .then(data => {
        console.log('API response:', data);
      })
      .catch(error => {
        console.error('API error:', error);
      });
  };

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
          overflow: "hidden",
        }}
      >
        <Toolbar />
        <Container maxWidth="xxl" sx={{ height: 'calc(100vh - 6px)', overflowY: 'auto' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '78vh',
              flexDirection: isSmallScreen ? 'column' : 'row',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                height: isSmallScreen ? '50vh' : '70vh',
                width: isSmallScreen ? '80vw' : '100vw',
                borderRadius: '15px',
                mb: 2,
                overflowY: 'auto',
                '&::-webkit-scrollbar': {
                  display: 'none',
                },
              }}
            >
              {children}
            </Box>
          </Box>

          {upload && (
            <TextField
              variant="outlined"
              placeholder="Upload PDF file"
              fullWidth
              InputProps={{
                readOnly: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton
                      onClick={handleClick}
                      sx={{
                        '& .MuiSvgIcon-root': {
                          transform: 'rotate(90deg)',
                        },
                      }}
                    >
                      <AttachmentIcon />
                    </IconButton>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="application/pdf"
                      style={{ display: 'none' }}
                      onChange={handleFileChange}
                    />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleUploadClick}
                      sx={{
                        background: "#D7D7D7",
                        '&:hover': {
                          background: "#D7D7D7",
                        },
                      }}
                    >
                      <ArrowUpwardIcon />
                    </IconButton>
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: '50px',
                  backgroundColor: '#f5f5f5',
                },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '50px',
                },
              }}
            />
          )}
        </Container>
      </Box>
    </Box>
  );
}

export default AdminLayout;
