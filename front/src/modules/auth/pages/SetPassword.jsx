import React, { useState } from "react";
import {
  InputAdornment,
  Container,
  Typography,
  Box,
  Grid,
  Button,
  CircularProgress,
  FormControlLabel,
  Checkbox,
  Switch,
} from "@mui/material";
import { VisibilityOutlined, VisibilityOffOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
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
//redux actions
import { setLoading, setUser } from "../../../features/authSlice";

const SetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [passVisible, setPassVisible] = useState(false);
  const [passCVisible, setPassCVisible] = useState(false);
  const [InProgress, setInProgress] = useState(false);

  // initial values
  const initialValues = { cPassword: "", password: "" };

  // validation schema
  const validationSchema = yup.object().shape({
    cPassword: yup
      .string()
      .required("Confirm is required"),
    password: yup.string().required("Password is required"),
  });

  // Handle form submission
  const onSubmit = (values) => {
    setInProgress(true);
    dispatch(setLoading(true));
    const _id = Cookies.get("userId")
    AuthAPI.resetPassword(JSON.stringify({...values, _id}))
      .then((res) => {
        setInProgress(false);
        navigate('/auth/login')
      })
      .catch((err) => {
        console.log(err);
        setInProgress(false);
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
        sx={{ height: "100%"}}
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
                  color: "#4fd1c5",
                  fontSize: "32px",
                  fontWeight: 600,
                }}
              >
                Set New Password
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
                Enter your email to reset the password
              </Typography>
            </Box>
            <form
              style={{ width: "100% !important" }}
              onSubmit={formik.handleSubmit}
            >
              {/* ======= Passwprd Input ======= */}
              <Box sx={{ paddingBottom: "1rem" }}>
                <InputField
                  label="Password"
                  name="password"
                  placeholder="Your password"
                  type={passVisible ? "text" : "password"}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password &&
                    formik.errors.password &&
                    formik.errors.password
                  }
                  endAdornment={
                    <InputAdornment
                      position="end"
                      sx={{ paddingRight: "0.5rem" }}
                    >
                      {passVisible ? (
                        <VisibilityOffOutlined
                          onClick={() => setPassVisible(false)}
                          sx={{ color: "primary.grey", cursor: "pointer" }}
                        />
                      ) : (
                        <VisibilityOutlined
                          onClick={() => setPassVisible(true)}
                          sx={{ color: "primary.grey", cursor: "pointer" }}
                        />
                      )}
                    </InputAdornment>
                  }
                />
              </Box>
              {/* ======= Confirm Password Input ======= */}
              <Box sx={{ paddingBottom: "1rem" }}>
                <InputField
                  label="Confirm Password"
                  name="cPassword"
                  placeholder="Your password"
                  type={passCVisible ? "text" : "Password"}
                  value={formik.values.cPassword}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.cPassword &&
                    formik.errors.cPassword &&
                    formik.errors.cPassword
                  }
                  endAdornment={
                    <InputAdornment
                      position="end"
                      sx={{ paddingRight: "0.5rem" }}
                    >
                      {passCVisible ? (
                        <VisibilityOffOutlined
                          onClick={() => setPassCVisible(false)}
                          sx={{ color: "primary.grey", cursor: "pointer" }}
                        />
                      ) : (
                        <VisibilityOutlined
                          onClick={() => setPassCVisible(true)}
                          sx={{ color: "primary.grey", cursor: "pointer" }}
                        />
                      )}
                    </InputAdornment>
                  }
                />
              </Box>
              {/* ======= Submit Button ======= */}
              <Button
                variant="contained"
                disableElevation={true}
                fullWidth={true}
                disabled={InProgress}
                type="submit"
              >
                {InProgress ? (
                  <CircularProgress size={30} sx={{ color: "white" }} />
                ) : (
                  "UPDATE PASSWORD"
                )}
              </Button>
            </form>
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
};

export default SetPassword;
