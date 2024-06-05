import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
//assets
import { AuthLoginBG } from "../../../assets/image";
//components
import InputField from "../../../components/InputField/InputField";
//formik and validations
import * as yup from "yup";
import { useFormik } from "formik";
//APIs
import { AuthAPI } from "../../../axios";

const verifyCode = () => {
  const navigate = useNavigate();

  // State to manage form data
  const [inProgress, setInProgress] = useState(false);

  // initial values
  const initialValues = { verification_code: "" };

  // validation schema
  const validationSchema = yup.object().shape({
    verification_code: yup
      .number()
      .required("Verification Code is required"),
  });

  // Handle form submission
  const onSubmit = (values) => {
    setInProgress(true);
    AuthAPI.verification_code(
      JSON.stringify({
        verification_code: values.verification_code,
      })
    )
      .then((res) => {
        console.log(res);
        if (res.code == 200) {
          setInProgress(false);
          console.log(res?.data?.userObject?.id);
          Cookies.set("userId", res?.data?.userObject?.id);
          navigate("/auth/set-password");
        } else {
          setInProgress(false);
        }
      })
      .catch((err) => {
        setInProgress(false);
        console.log(err);
      });
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  return (
    <Grid container sx={{ height: "100%" }}>
      <Grid
        item
        md={12}
        sm={12}
        xs={12}
        sx={{ height: "100vh" }}
      >
        <Container
          maxWidth="sm"
          sx={{
            minHeight: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexFlow: "column",
              width: { md: "60%", xs: "100%" },
              marginX: "auto",
              justifyContent: "center",
            }}
          >
            {/* ======= Form Header ======= */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                gap: "0.8rem",
                paddingBottom: "1rem",
              }}
            >
              <Typography
                component="h3"
                variant="h3"
                sx={{
                  color: "#3b90b2",
                  fontSize: "32px",
                  fontWeight: 600,
                }}
              >
                Verify Code
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                gap: "0.8rem",
                paddingBottom: "3rem",
              }}
            >
              <Typography
                sx={{
                  color: "primary.black",
                  fontSize: "14px",
                }}
              >
                Verify Code To Set New Password
              </Typography>
            </Box>
            <form
              style={{ width: "100% !important" }}
              onSubmit={formik.handleSubmit}
            >
              {/* ======= Email Input ======= */}
              <Box sx={{ paddingBottom: "1rem" }}>
                <InputField
                  label="Enter Code"
                  placeholder="Security Code"
                  name="verification_code"
                  value={formik.values.verification_code}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.verification_code &&
                    formik.errors.verification_code &&
                    formik.errors.verification_code
                  }
                />
              </Box>
              {/* ======= Submit Button ======= */}
              <Button
                variant="contained"
                disableElevation={true}
                fullWidth={true}
                disabled={inProgress}
                type="submit"
              >
                {inProgress ? (
                  <CircularProgress size={30} sx={{ color: "white" }} />
                ) : (
                  "RESET PASSWORD"
                )}
              </Button>
            </form>
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
};

export default verifyCode;
