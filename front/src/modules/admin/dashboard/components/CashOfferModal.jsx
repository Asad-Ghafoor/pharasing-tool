import React, { useState } from "react";
import {
    Box,
    Button,
    CircularProgress,
    Typography,
    useTheme,
    Dialog,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import FormField from "../../../../components/InputField/FormField";
import * as yup from "yup";
import { useFormik } from "formik";
import { AdminProperties } from "../../../../axios";

const CashOfferModal = ({
    data,
    InProgress = false,
    setInProgress = (a) => "",
    closeDialog = () => "",
    refetch = () => "",
}) => {
    const theme = useTheme();

    const initialValues = {
        cash: "",
    };

    const validationSchema = yup.object().shape({
        cash: yup
            .number()
            .required("Cash is required")
            .min(0, "Cash must be between 0 and 100")
            .max(100, "Cash must be between 0 and 100"),
    });

    const onSubmit = (values) => {
        setInProgress(true);
        const data2 = { ...values, id: data.id, cash: `${values.cash}%` };
        console.log(data2, '255');
        AdminProperties.sendOffer(JSON.stringify(data2))
            .then((res) => {
                if (res.code === 200) {
                    refetch();
                    setInProgress(false);
                    closeDialog();
                } else {
                    setInProgress(false);
                }
            })
            .catch((err) => {
                console.log(err);
                setInProgress(false);
            });
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
        validateOnChange: false,
        validateOnBlur: true,
    });

    const handleCashChange = (e) => {
        let value = e.target.value.replace(/[^0-9]/g, "");
        if (value !== "" && parseInt(value) > 100) {
            value = "100";
        }
        formik.setFieldValue("cash", value);
    };

    return (
        <Dialog open={true} onClose={closeDialog}>
            <DialogTitle>Cash Offer</DialogTitle>
            <DialogContent>
                <Box>
                    <Box sx={{ alignItems: "center", justifyContent: "center", display: "flex", mb: 2 }}>
                        <img src={data?.picture} alt="Property" style={{ width: "50%", height: "50%", marginTop: "10px" }} />
                    </Box>
                    <Typography sx={{ fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "start" }}>
                        <span style={{ fontSize: "16px", fontWeight: "bold", marginLeft: 2 }}>property id &nbsp; : &nbsp; &nbsp; </span>  {data?.id}
                    </Typography>
                    <Box>
                        <Typography variant="body1">
                            <span style={{ fontSize: "16px", fontWeight: "bold", marginLeft: 2 }}>Address &nbsp; : &nbsp; &nbsp; </span>  {data?.address}, {data?.city}, {data?.state}, {data?.zip_code}
                        </Typography>
                        <Typography variant="body1">
                            <span style={{ fontSize: "16px", fontWeight: "bold", marginLeft: 2 }}>Beds &nbsp; : &nbsp; &nbsp; </span>  {data?.beds}
                        </Typography>
                        <Typography variant="body1">
                            <span style={{ fontSize: "16px", fontWeight: "bold", marginLeft: 2 }}>Baths &nbsp; : &nbsp; &nbsp; </span>  {data?.bath}
                        </Typography>
                        <Typography variant="body1">
                            <span style={{ fontSize: "16px", fontWeight: "bold", marginLeft: 2 }}>Sqft &nbsp; : &nbsp; &nbsp; </span>  {data?.sqft}
                        </Typography>
                        <Typography variant="body1">
                            <span style={{ fontSize: "16px", fontWeight: "bold", marginLeft: 2 }}>Year Built &nbsp; : &nbsp; &nbsp; </span> {data?.year_built}
                        </Typography>
                        <Typography variant="body1">
                            <span style={{ fontSize: "16px", fontWeight: "bold", marginLeft: 2 }}>Price &nbsp; : &nbsp; &nbsp; </span> {data?.price}
                        </Typography>
                    </Box>
                </Box>
                <form
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: "20px",
                    }}
                    onSubmit={formik.handleSubmit}
                >
                    <FormField
                        label="Cash Offer In Percentage"
                        placeholder="Cash Offer in Percentage"
                        name="cash"
                        value={formik.values.cash}
                        onChange={handleCashChange}
                        error={formik.touched.cash && formik.errors.cash}
                        InputProps={{
                            endAdornment: <span>%</span>,
                        }}
                    />

                    <Button
                        variant="contained"
                        disableElevation
                        disabled={InProgress}
                        sx={{
                            borderRadius: "12px",
                            padding: "0 8px",
                            width: "350px",
                            height: "45px",
                            mt: 4,
                            fontSize: "12px",
                            fontWeight: "400",
                            [theme.breakpoints.down("sm")]: {
                                width: "100%",
                            },
                        }}
                        type="submit"
                    >
                        {InProgress ? (
                            <CircularProgress size={30} sx={{ color: "white" }} />
                        ) : (
                            "Submit"
                        )}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CashOfferModal;
