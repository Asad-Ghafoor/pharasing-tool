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
import InputField from "../../../../components/InputField/InputField";
//formik and validations
import * as yup from "yup";
import { useFormik } from "formik";
//APIs
import { AuthAPI } from "../../../../axios";
import { useDispatch } from "react-redux";
// import { setLoading, setUser } from "../../../features/authSlice";

const Profile = () => {
    const navigate = useNavigate();
    // const dispatch = useDispatch();

    const [passVisible, setPassVisible] = useState(false);
    const [InProgress, setInProgress] = useState(false);

    const initialValues = { email: "", password: "", userName: "" };

    // validation schema
    const validationSchema = yup.object().shape({
        email: yup
            .string()
            .email("Invalid email address")
            .required("Email is required"),
        password: yup.string().required("Password is required"),
        userName: yup.string().required("User Name is required"),
    });

    // Handle form submission
    const onSubmit = (values) => {
        setInProgress(true);
        AuthAPI.login(JSON.stringify(values))
            .then((res) => {
                setInProgress(false);
                if (res.code === 200) {
                    // Handle success
                } else {
                    // Handle failure
                }
            })
            .catch((err) => {
                console.log(err);
                setInProgress(false);
            });
    };
    const formik = useFormik({ initialValues, validationSchema, onSubmit });
    return (
        <Container>
            <Box
                sx={{
                    boxShadow: 2,
                    padding: "2rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    borderRadius: "10px",
                    mt: "20vh",
                    mx: "auto",
                    width: "80%",
                }}
            >
                <form style={{ width: "100%" }} onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        {/* User Name Input */}
                        <Grid item xs={12} md={6}>
                            <InputField
                                label="User Name"
                                placeholder="Your user Name"
                                name="userName"
                                value={formik.values.userName}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.userName &&
                                    formik.errors.userName &&
                                    formik.errors.userName
                                }
                            />
                        </Grid>
                        {/* Email Input */}
                        <Grid item xs={12} md={6}>
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
                        </Grid>
                        {/* Password Input */}
                        <Grid item xs={12}>
                            <Box sx={{ position: "relative" }}>
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
                        </Grid>
                        {/* Submit Button */}
                        <Grid item xs={12}>
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
                                    "Edit Profile"
                                )}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Container>
    );
};

export default Profile;
