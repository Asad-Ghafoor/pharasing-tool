import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Box, Typography, IconButton } from "@mui/material";
import { CloseRounded } from "@mui/icons-material";

export default function BasicDialog({
  title,
  headerContent,
  headerContentALign = "center",
  note = "",
  openDialog,
  setOpenDialog,
  buttons,
  children,
  alignText = "left",
  dialogWidth = "688px",
  hideClose = false,
  persisted = false,
}) {
  const handleClose = () => {
    if (persisted) {
      return null;
    }
    setOpenDialog(false);
  };

  return (
    <Box>
      <Dialog
        fullWidth
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="basic-dialog-title"
        aria-describedby="basic-dialog-description"
        PaperProps={{ sx: { borderRadius: "10px", maxWidth: dialogWidth, position: "relative" } }}
      >
        <DialogContent sx={{display: "flex",overflow : "auto", justifyContent: "center"}}>{children}</DialogContent>
        <DialogActions sx={{ px: 3 }}>{buttons}</DialogActions>
      </Dialog>
    </Box>
  );
}
