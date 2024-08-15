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
import { VisibilityOutlined, VisibilityOffOutlined, Opacity } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
// components
import InputField from "../../../components/InputField/InputField";
// formik and validations
import * as yup from "yup";
import { useFormik } from "formik";
// APIs
import { AuthAPI } from "../../../axios";
// country and region selectors
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

const SignUp = () => {
    const navigate = useNavigate();
    
    const [passVisible, setPassVisible] = useState(false);
    const [InProgress, setInProgress] = useState(false);

    // initial values
    const initialValues = { email: "", password: "", userName: "", role: "user", country: "", region: "" };

    // validation schema
    const validationSchema = yup.object().shape({
        email: yup
            .string()
            .email("Invalid email address")
            .required("Email is required"),
        password: yup.string().required("Password is required"),
        userName: yup.string().required("User Name is required"),
        country: yup.string().required("Country is required"),
        region: yup.string().required("Region is required"),
    });

    // Handle form submission
    const onSubmit = (values) => {
        console.log(values);
        
        setInProgress(true);
        AuthAPI.register(JSON.stringify(values))
            .then((res) => {
                setInProgress(false);
                if (res.code === 200) {
                    navigate('auth/login');
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
                                    placeholder="Your user name"
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
                            {/* ======= Country Input ======= */}
                            <Box sx={{ paddingBottom: "1rem" }}>
                                <Typography
                                    sx={{ color: "primary.black", fontSize: "14px", mb: 1 ,fontWeight:500}}
                                >
                                    Country
                                </Typography>
                                <CountryDropdown
                                    value={formik.values.country}
                                    onChange={(val) => {
                                        formik.setFieldValue("country", val);
                                        formik.setFieldValue("region", "");
                                    }}
                                    style={{ width: "100%", padding: "14px", fontSize: "14px", opacity: '0.6', borderRadius: '13px' }}
                                    classes="input-class"
                                />
                                {formik.touched.country && formik.errors.country && (
                                    <Typography color="error">
                                        {formik.errors.country}
                                    </Typography>
                                )}
                            </Box>
                            {/* ======= Region Input ======= */}
                            {formik.values.country && (
                                <Box sx={{ paddingBottom: "1rem" }}>
                                    <Typography
                                        sx={{ color: "primary.black", fontSize: "14px", mb: 1, fontWeight:500 }}
                                    >
                                        Region
                                    </Typography>
                                    <RegionDropdown
                                        country={formik.values.country}
                                        value={formik.values.region}
                                        onChange={(val) => formik.setFieldValue("region", val)}
                                        style={{ width: "100%", padding: "14px", fontSize: "14px", opacity: '0.6', borderRadius: '13px'  }}
                                        classes="input-class"
                                    />
                                    {formik.touched.region && formik.errors.region && (
                                        <Typography color="error">
                                            {formik.errors.region}
                                        </Typography>
                                    )}
                                </Box>
                            )}
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
                                    {"Already have an account?"}
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
                                    "Sign Up"
                                )}
                            </Button>
                        </form>
                    </Box>
                </Container>
            </Grid>
        </Grid>
    );
};

export default SignUp;
