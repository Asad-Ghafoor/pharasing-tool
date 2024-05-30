import * as React from "react";
import {
  Typography,
  MenuItem,
  FormControl,
  Select as MuiSelect,
  FormHelperText,
  InputLabel
} from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";

export default function FormSelect({
  options,
  label,
  required,
  defaultValue = "sort",
  error,
  placeholder,
  withoutBorder = false,
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
            marginBottom: "0.3rem",
            marginTop : "0.5rem"
          }}
        >
          {label}
          {required && <span className="required">*</span>}
        </InputLabel>
      )}
      <FormControl sx={{ width: "100%", position: "relative" }}>
        <MuiSelect
          defaultValue={defaultValue}
          className="grey-select-field"
          sx={{
            backgroundColor: error ? "#d9255016" : "",
            borderRadius: "10px",
            border: "1px solid gray",
            outline: "none",
            display: "flex",
            alignItems: "center",
            color: "#313131",
            fontWeight: "normal",
            maxHeight: "48.13px",
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "transparent",
              outline: "none",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: `1px solid ${error ? "#d9255030" : "#F2f2f2"} !important`,
              outline: "none"
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "transparent",
              outline: "none",
            },
            ".MuiSvgIcon-root ": {
              color: "#8f8fa7",
              position: "absolute",
              right: "6px",
              pointerEvents: "none",
            },
            ".css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input": {
              padding: "14px !important"
            }
          }}
          IconComponent={() => <KeyboardArrowDown sx={{ color: "#8f8fa7 !important" }} />}
          {...props}
        >
          {placeholder && (
            <MenuItem value="sort">
              <Typography
                sx={{ color: "#8f8fa7", fontSize: "14px !important" }}
              >
                {placeholder}
              </Typography>
            </MenuItem>
          )}
          {options?.map((option, index) => (
            <MenuItem key={index} value={option.value}>
              <Typography
                sx={{ color: "#313131", fontSize: "14px !important" }}
              >
                {option.label}
              </Typography>
            </MenuItem>
          ))}
        </MuiSelect>
        {error && (
          <FormHelperText sx={{
            color: "#d92550",
            fontSize: "11px",
            ml: "5px"
          }}>{error}</FormHelperText>
        )}
      </FormControl>
    </>
  );
}