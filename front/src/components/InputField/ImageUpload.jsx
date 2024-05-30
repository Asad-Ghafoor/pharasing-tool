import React, { useState, useRef } from 'react';
import {
  Box,
  Button,
  CircularProgress
} from "@mui/material";
import {
  UploadFileRounded as UploadFileRoundedIcon
} from '@mui/icons-material';
import imageCompression from 'browser-image-compression';

const ImageUpload = ({ state, setState }) => {

  const fileRef = useRef();
  const [InProgress, setInProgress] = useState(false);

  const compressImage = async (file) => {
    const options = {
      maxSizeMB: 0.5, // (Optional) Maximum file size in MB
      maxWidthOrHeight: 300, // (Optional) Maximum width or height in pixels
      useWebWorker: true // (Optional) Offload to web worker
    };

    try {
      const compressedFile = await imageCompression(file, options);
      return compressedFile;
    } catch (error) {
      console.error(error);
      return file; // Return original file if compression fails
    }
  };

  const handleFileChange = (e) => {
    setInProgress(true);
    let file = e.target.files[0];
    if (file) {
      compressImage(file)
        .then(res => {
          const reader = new FileReader();
          reader.onload = (e) => {
            setState({
              data: res,
              base64: e.target.result
            });
            setInProgress(false);
          };
          reader.readAsDataURL(res);
        })
        .catch(err => {
          console.log(err)
          setInProgress(false);
        })
    }
    else {
      setInProgress(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexFlow: "column",
        alignItems: "center",
        gap: "0.3rem",
        justifyContent: "center",
        width: "100%",
        maxWidth: "140px",
        height: "140px",
        maxHeight: "140px",
        border: !state?.base64 && "1px dashed #8f8fa7",
        my: 2,
        borderRadius: "34px",
        position: "relative",
        cursor: "pointer"
      }}
    >
      {InProgress ?
        <CircularProgress size={30} sx={{ color: "#836FFC" }} /> :
        state?.base64 ?
          <img
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "34px"
            }}
            src={state?.base64}
            alt="image"
          /> :
          <>
            <UploadFileRoundedIcon sx={{ color: "#8f8fa7" }} />
            <Box
              sx={{
                background: "#836FFC",
                color: "#fff",
                borderRadius: "3px",
                fontSize: "11px",
                fontWeight: 400,
                minHeight: "24px",
                display: "flex",
                alignItems: "center",
                px: 1
              }}
            >
              Upload Logo
            </Box>
          </>
      }
      <Box
        ref={fileRef}
        onChange={handleFileChange}
        component="input"
        sx={{
          border: "1px solid red",
          width: "100%",
          height: "100%",
          position: "absolute",
          borderRadius: "16px",
          opacity: 0,
          cursor: "pointer"
        }}
        disabled={InProgress}
        type="file"
        accept=".png, .jpg, .jpeg"
      />
    </Box>
  )
}

export default ImageUpload