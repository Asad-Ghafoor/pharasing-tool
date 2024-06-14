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
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// components
import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";
// hooks
import useWindowResize from "../../../../hooks/useWindowResize";
import axios from "axios";

export const drawerWidth = 220;
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
  const [selectedFile, setSelectedFile] = useState(null);

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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    } else {
      console.error('Please select a PDF file');
    }
  };

  const handleUploadClick = async () => {
    if (!selectedFile) {
      console.error('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post("http://127.0.0.1:5000/upload_pdf", formData);
      if (response.status === 200) {
        console.log('File uploaded successfully');
      }
    } catch (error) {
      console.error('File upload failed', error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && selectedFile) {
      handleUploadClick();
    }
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
            <>
              <TextField
                variant="outlined"
                placeholder={!selectedFile ? "Upload PDF file" : ""}
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
                      {selectedFile && (
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            borderRadius: '10px',
                            padding: '15px'
                          }}
                        >
                          <PictureAsPdfIcon sx={{ marginRight: '10px', color: '#FF0000' }} />
                          {selectedFile.name}
                        </Box>
                      )}
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
                  height: "auto",
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '50px',
                  },
                }}
                onKeyPress={handleKeyPress}
              />
            </>
          )}
        </Container>
      </Box>
    </Box>
  );
}

export default AdminLayout;
