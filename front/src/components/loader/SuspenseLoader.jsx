import { Box } from "@mui/material";
import React from "react";
import { Logo } from "../../assets/image";

function SuspenseLoader() {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        component={"img"}
        sx={{ height: "40px", width: "auto" }}
        src={Logo}
        alt={"Logo"}
      />
    </Box>
  );
}

export default SuspenseLoader;
