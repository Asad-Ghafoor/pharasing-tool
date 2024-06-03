import React, { useState } from "react";
import {
    InputAdornment,
    Container,
    Typography,
    Box,
    Grid,
    Button,
    CircularProgress
} from "@mui/material";
import { VisibilityOutlined, VisibilityOffOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
//components
import InputField from "../../../components/InputField/InputField";
//formik and validations
import * as yup from "yup";
import { useFormik } from "formik";
//APIs
import { AuthAPI } from "../../../axios";

const SignUp = () => {
    const navigate = useNavigate();

    const [passVisible, setPassVisible] = useState(false);
    const [InProgress, setInProgress] = useState(false);

    // initial values
    const initialValues = { email: "", password: "" };

    // validation schema
    const validationSchema = yup.object().shape({
        email: yup
            .string()
            .email("Invalid email address")
            .required("Email is required"),
        password: yup.string().required("Password is required"),
    });

    // Handle form submission
    const onSubmit = (values) => {
        setInProgress(true);
        AuthAPI.login(JSON.stringify(values))
            .then((res) => {
                setInProgress(false);
                if (res.code == 200) {

                    setInProgress(false);
                } else {
                    setInProgress(false);
                }
            })
            .catch((err) => {
                console.log(err);
                setInProgress(false);
            });
    };
    const formik = useFormik({ initialValues, validationSchema, onSubmit });
    return (
        <Grid container sx={{ height: "100%", }}>
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
                                Welcome Back
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
                                Enter your details to create your account
                            </Typography>
                        </Box>
                        <form
                            style={{ width: "100% !important" }}
                            onSubmit={formik.handleSubmit}
                        >
                            {/* ======= User Name Input ======= */}
                            <Box sx={{ paddingBottom: "1rem" }}>
                                <InputField
                                    label="User Name"
                                    placeholder="your user Name"
                                    name="userName"
                                    value={formik.values.userName}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.userName &&
                                        formik.errors.userName &&
                                        formik.errors.userName
                                    }
                                />
                            </Box>
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
                            {/* ======= Password Input ======= */}
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
                            {/* ======= Link ======= */}
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Typography
                                    component="p"
                                    sx={{
                                        color: 'black',
                                        fontSize: '15px',
                                        ":hover": {
                                            cursor: 'pointer',
                                            color: 'black',
                                        },
                                    }}
                                >
                                    {"already have an account ?"}
                                </Typography>
                                <Typography
                                    onClick={() => navigate("/auth/login")}
                                    sx={{
                                        color: 'primary.main',
                                        fontSize: '15px',
                                        ml: 1,
                                        ":hover": {
                                            cursor: 'pointer',
                                            color: 'primary.main',
                                        },
                                    }}
                                >
                                    Login
                                </Typography>
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
                                    "Sign UP"
                                )}
                            </Button>
                        </form>
                    </Box>
                </Container>
            </Grid>
        </Grid>
    )
}

export default SignUp