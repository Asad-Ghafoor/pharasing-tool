import { createTheme } from "@mui/material/styles";

const webTheme = createTheme({
  palette: {
    primary: {
      main: "#3b90b2", // added
      grey: "#ACB2B9", // added
      black: "#313131", //added
      lightBlack: "#4D4D4F",   //added
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          background: "#3b90b2",
          color: "#fff",
          fontWeight: 600,
          borderRadius: "12px",
          minHeight: "48px",
          "&:hover": {
            background: "#3b90b2",
          },
          fontFamily: "Poppins",
          mixBlendMode: "normal",
          fontSize: "16px",
          boxShadow: "none",
          textTransform: "none",
          ...(ownerState.variant === "contained" && {
            background: "#3b90b2",
            color: "#fff",
            fontWeight: 600,
            fontSize: "14px",
            borderRadius: "12px",
            minHeight: "48px",
            "&:hover": {
              background: "#3b90b2",
            },
          }),
          ...(ownerState.variant === "outlined-blue-black" && {
            background: "transparent",
            color: "#313131",
            fontWeight: 600,
            fontSize: "14px",
            borderRadius: "4px",
            border: "1px solid #3b90b2",
            minHeight: "42px",
            "&:hover": {
              background: "#3b90b2",
            }
          }),
          ...(ownerState.variant === "outline-navigation" && {
            background: "transparent",
            color: "#252526",
            fontSize: "14px",
            fontWeight: 400,
            borderRadius: "3px",
            border: "1px solid #252526",
            minHeight: "40px",
          }),
          ...(ownerState.variant === "danger-contained" && {
            background: "red",
            color: "white",
            fontWeight: 600,
            fontSize: "14px",
            borderRadius: "50px",
            minHeight: "48px",
            "&:hover": {
              background: "red",
            },
          }),
          ...(ownerState.variant === "muted-contained" && {
            background: "#ACB2B9",
            color: "#646464",
            fontWeight: 600,
            fontSize: "14px",
            borderRadius: "50px",
            minHeight: "48px",
            "&:hover": {
              background: "#ACB5BF",
            },
          }),
          ...(ownerState.variant === "transparent-menu-btn" && {
            background: "transparent",
            color: "#252526",
            borderRadius: 0,
            minHeight: "48px",
            "&:hover": {
              background: "transparent",
            },
          }),
          ...(ownerState.variant === "variant-black-button" && {
            background: "black",
            color: "white",
            borderRadius: 0,
            minHeight: "48px",
            "&:hover": {
              background: "black",
            },
          }),
          ...(ownerState.variant === "variant-grey-button" && {
            background: "#cbd5e0",
            color: "white",
            borderRadius: 0,
            minHeight: "2rem",
            "&:hover": {
              background: "#cbd5e0",
            },
          }),
          ...(ownerState.variant === "variant-green-button" && {
            background: "#008000",
            color: "white",
            borderRadius: 0,
            minHeight: "48px",
            "&:hover": {
              background: "#008000",
            },
          }),
          ...(ownerState.variant === "variant-state" && {
            background: "#cbd5e0",
            color: "white",
            borderRadius: 0,
            minHeight: "48px",
            "&:hover": {
              background: "#cbd5e0",
            },
          }),
          ...(ownerState.variant === "upload-btn" && {
            borderRadius: "3px",
            fontSize: "11px",
            fontWeight: 400,
            minHeight: "24px"
          }),
        }),
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "#252526",
          "&.Mui-checked": {
            color: "#3b90b2",
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          "&.Mui-checked": {
            color: "#3b90b2",
          },
        },
      },
    },
  },
});

export default webTheme;
