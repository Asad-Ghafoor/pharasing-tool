import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

const Layout = () => {
  return (
    <Box
      sx={{
        maxHeight: "100vh",
        width: "100%",
        height:'100vh',
        overflow: "hidden",
        padding: 0,
      }}
    >
      <Outlet />
    </Box >
  );
};

export default Layout;