import React from "react";
import { styled } from "@mui/material/styles";
import {
  FormHelperText,
  InputBase,
  InputLabel,
  FormControl
} from "@mui/material";


const InputContainer = styled("div")(({ err }) => ({
  borderRadius: "10px",
  width: "100%",
  border: "1px solid gray",
  backgroundColor: err ? "#d9255016" : "",
  display: "flex",
  alignItems: "center",
  ":has(.Mui-focused)": {
    outline: `1px solid ${err ? "#d9255030" : "#F2f2f2"}`,
    borderRadius: "10px",
  }
}));

const BootstrapInput = styled(InputBase)(({ adornment }) => ({
  width: "100%",
  "& .MuiInputBase-input": {
    padding: adornment ? "14px 2px" : "14px",
    borderRadius: "10px",
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

function DatePickerField({
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
            marginBottom: "0.2rem",
            marginTop: ".6rem"
          }}
        >
          {label}
          {required && <span className="required">*</span>}
        </InputLabel>
      )}
      <FormControl variant="standard" sx={{ width: "100%" }}>
        <InputContainer err={error}>
          {startAdornment && <StartAdornment>{startAdornment}</StartAdornment>}
          <BootstrapInput 
          
          type="date" adornment={startAdornment} {...props} />
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

export default DatePickerField;
