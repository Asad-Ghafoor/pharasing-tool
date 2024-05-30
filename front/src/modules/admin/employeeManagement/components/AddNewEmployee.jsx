import React, { useState, useEffect } from "react";
import { Box, Button, CircularProgress, Typography, useTheme } from "@mui/material";
import FormField from "../../../../components/InputField/FormField";
import * as yup from "yup";
import { useFormik } from "formik";
import { AdminProperties, AdminProjectAPI, ApartmentAPI } from "../../../../axios";
import FormSelect from "../../../../components/InputField/FormSelect";
import DatePickerField from "../../../../components/DatePicker/DatePickerField";

const AddNewEmployee = ({
  closeDialog = () => "",
  refetch = () => "",
}) => {
  const theme = useTheme();
  const [status, setStatus] = useState("active");
  const [buildings, setBuildings] = useState([]);
  const [apartments, setApartments] = useState([]);
  const [InProgress, setInProgress] = useState(false);
  const initialValues = {
    name: "",
    email: "",
    building: "",
    apartment: "",
    expiry_Date: Date.now(),
    start_Date: Date.now(),
    role: "employee",
    sendEmail: false,
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    building: yup.string().required("Building Name is required"),
    apartment: yup.string().required("Apartment Number is required"),
    expiry_Date: yup.date().required("Expiry Date is required"),
    start_Date: yup.date().required("Start Date is required"),
    email: yup.string().email("Invalid email address").required("Email is required"),
  });

  const onSubmit = (values) => {
    setInProgress(true);
    const data = {
      ...values,
      isActive: status,
    };

    AdminProperties.addEmployee(JSON.stringify(data))
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

  const handleStartDateChange = (date) => {
    formik.setFieldValue("start_Date", date.target.valueAsDate);
  };

  const handleExpiryDateChange = (date) => {
    formik.setFieldValue("expiry_Date", date.target.valueAsDate);
  };

  const handleStatusToggle = () => {
    setStatus((prevStatus) => (prevStatus === "active" ? "inactive" : "active"));
  };

  const getAllBuildings = async () => {
    AdminProjectAPI.getAllProjects()
      .then((res) => {
        if (res.code === 200) {
          setBuildings(res.data.buildingObject);
        } else {
        }
      })
      .catch((err) => {
        console.log(err)
      });
  };

  const getAppartments = async (buildingId) => {
    ApartmentAPI.getSpecificAppartment(buildingId)
      .then((res) => {
        if (res.code === 200) {
          setApartments(
            res.data.AppartmentObject.map((apartment) => ({
              value: apartment._id,
              label: apartment.apartment_Number,
            }))
          );
        } else {
        }
      })
      .catch((err) => {
        console.log(err)
      });
  };

  useEffect(() => {
    getAllBuildings();
  }, []);

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  useEffect(() => {
    if (formik.values.building) {
      getAppartments(formik.values.building);
    }
  }, [formik.values.building]);



  const handleAddUserClick = () => {
    formik.setFieldValue("sendEmail", false);
    formik.handleSubmit();
  };

  const handleSendLinkClick = () => {
    formik.setFieldValue("sendEmail", true);
    formik.handleSubmit();
  };

  return (
    <Box>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
        onSubmit={formik.handleSubmit}
      >
        <Box>
          <FormField
            label="Name"
            placeholder="Enter user name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && formik.errors.name && formik.errors.name}
          />
          <FormField
            label="Email"
            placeholder="Enter email"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && formik.errors.email && formik.errors.email}
          />
          <FormSelect
            label="Building"
            placeholder="Select building"
            name="building"
            value={formik.values.building}
            onChange={(e) => {
              formik.handleChange(e);
              getAppartments(e.target.value);
            }}
            options={buildings.map((building) => ({
              value: building._id,
              label: building.building_Name,
            }))}
            error={formik.touched.building && formik.errors.building && formik.errors.building}
          />
          <FormSelect
            label="Apartment"
            placeholder="Select apartment"
            name="apartment"
            value={formik.values.apartment}
            onChange={formik.handleChange}
            options={apartments}
            error={formik.touched.apartment && formik.errors.apartment && formik.errors.apartment}
          />
          <Box>
            <Box sx={{ display: 'flex', gap: { sm: "1rem", xs: "0rem" } }}>
              <Box sx={{ width: "50%" }}>
                <DatePickerField
                  label="Start Date"
                  selected={formik.values.start_Date}
                  onChange={handleStartDateChange}
                  dateFormat="MM/dd/yyyy"
                />
              </Box>
              <Box sx={{ width: "50%" }}>
                <DatePickerField
                  label="Expiry Date"
                  selected={formik.values.expiry_Date}
                  onChange={handleExpiryDateChange}
                  dateFormat="MM/dd/yyyy"
                />
              </Box>
            </Box>
          </Box>
          <Box sx={{ mt: 1 }}>
            <Typography variant="body1">Status</Typography>
            <Button
              variant={status === "active" ? "variant-green-button" : "variant-grey-button"}
              sx={{
                width: "90px",
                borderRadius: "15px",
                background: status === "active" ? "green" : "#cbd5e0",
                height: "20px",
                fontWeight: '400',
                fontSize: "12px",
                minHeight: "35px",
                [theme.breakpoints.down('sm')]: {
                  width: "35px",
                },
              }}
              type="button"
              onClick={handleStatusToggle}
            >
              {status === "active" ? "Active" : "Inactive"}
            </Button>
          </Box>
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
              fontSize: '12px',
              fontWeight: '400',
              [theme.breakpoints.down('sm')]: {
                width: "100%",
              },
            }}
            type="button"
            onClick={handleAddUserClick}
          >
            {InProgress ? (
              <CircularProgress size={30} sx={{ color: "white" }} />
            ) : (
              "Add User"
            )}
          </Button>
        </Box>
        <Button
          variant="variant-black-button"
          disableElevation
          sx={{
            borderRadius: "12px",
            padding: "0 8px",
            width: "350px",
            height: "45px",
            mt: 2,
            background: "black",
            fontSize: '12px',
            fontWeight: '400',
            [theme.breakpoints.down('sm')]: {
              width: "100%",
            },
          }}
          type="button"
          onClick={handleSendLinkClick}
        >
          Send Unique Link
        </Button>
      </form>
    </Box>
  );
};

export default AddNewEmployee;
