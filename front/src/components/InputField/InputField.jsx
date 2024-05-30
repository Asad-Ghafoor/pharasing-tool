import React from "react";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { FormHelperText, alpha } from "@mui/material";


const InputContainer = styled("div")(({ err }) => ({
  borderRadius: "15px",
  backgroundColor: err ? "#d9255016" : "transparent",
  border: `1px solid ${err ? "#d9255016" : "#ACB2B9"}`,
  display: "flex",
  alignItems: "center",
  ":has(.Mui-focused)": {
    outline: `1px solid ${err ? "#d9255030" : "#ACB2B9"}`,
    borderRadius: "15px"
  }
}));

const BootstrapInput = styled(InputBase)(({ adornment, color }) => ({
  width: "100%",
  "& .MuiInputBase-input": {
    padding: adornment ? "14px 2px" : "14px",
    borderRadius: "15px",
    width: "100%",
    fontSize: "14px",
    color: "#313131"
  },


}));

const StartAdornment = styled("div")({
  paddingLeft: "8px",
});

const EndAdornment = styled("div")({
  paddingRight: "8px",
});

function InputField({
  error,
  label,
  required,
  startAdornment,
  endAdornment,
  ...props
}) {
  return (
    <>
      {label && (
        <InputLabel
          sx={{
            color: "#252526",
            fontSize: "14px",
            fontWeight: 500,
            marginBottom: "0.2rem"
          }}
        >
          {label}
          {required && <span className="required">*</span>}
        </InputLabel>
      )}
      <FormControl variant="standard" sx={{ width: "100%" }}>
        <InputContainer err={error}>
          {startAdornment && <StartAdornment>{startAdornment}</StartAdornment>}
          <BootstrapInput adornment={startAdornment} {...props} />
          {endAdornment && <EndAdornment>{endAdornment}</EndAdornment>}
        </InputContainer>
        {error && (
          <FormHelperText
            sx={{
              color: "#d92550",
              pl: "5px",
              fontSize: "11px"
            }}
          >
            {error}
          </FormHelperText>
        )}
      </FormControl>
    </>
  );
}

export default InputField;