import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";
import { ArrowBackIosNewRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
//assets
import { AuthLoginBG } from "../../../assets/image";
//components
import InputField from "../../../components/InputField/InputField";
//formik and validations
import * as yup from "yup";
import { useFormik } from "formik";
//APIs
import { AuthAPI } from "../../../axios";

const ForgetPassword = () => {
  const navigate = useNavigate();

  // State to manage form data
  const [inProgress, setInProgress] = useState(false);

  // initial values
  const initialValues = { email: "" };

  // validation schema
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  // Handle form submission
  const onSubmit = (values) => {
    setInProgress(true);
    AuthAPI.forgotPassword(
      JSON.stringify({
        email: values.email,
      })
    )
      .then((res) => {
        console.log(res);
        if (res.code == 200) {
          setInProgress(false);
          navigate("/auth/verify-code");
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
                Forget Password
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
                Enter your email to Reset Password
              </Typography>
            </Box>
            <form
              style={{ width: "100% !important" }}
              onSubmit={formik.handleSubmit}
            >
              {/* ======= Email Input ======= */}
              <Box sx={{ paddingBottom: "1rem" }}>
                <InputField
                  label="Email"
                  placeholder="Your email address"
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.email &&
                    formik.errors.email &&
                    formik.errors.email
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
                  "SEND CODE"
                )}
              </Button>
            </form>
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
};

export default ForgetPassword;
