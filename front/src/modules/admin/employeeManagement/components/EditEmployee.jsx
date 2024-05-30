import React, { useState, useEffect } from "react";
import { Box, Button, CircularProgress, Typography, useTheme, Dialog, DialogContent, DialogTitle, DialogActions } from "@mui/material";
import FormField from "../../../../components/InputField/FormField";
import * as yup from "yup";
import { useFormik } from "formik";
import { AdminProperties, AdminProjectAPI, ApartmentAPI } from "../../../../axios";
import FormSelect from "../../../../components/InputField/FormSelect";
import DatePickerField from "../../../../components/DatePicker/DatePickerField";

const EditEmployee = ({
  user,
  InProgress = false,
  setInProgress = (a) => "",
  closeDialog = () => "",
  refetch = () => "",
}) => {
  // initial values
  const theme = useTheme();
  const [status, setStatus] = useState(user?.STATUS);
  const [buildings, setBuildings] = useState([]);
  const [apartments, setApartments] = useState([]);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };


  const initialValues = {
    name: user?.firstName ?? "",
    email: user?.email ?? "",
    building: user?.building_id ?? "",
    apartment: user?.apartment_id ?? "",
    expiry_Date: user?.end_date ? formatDate(user.end_date) : null,
    start_Date: user?.start_Date ? formatDate(user.start_Date) : null,
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
      isActive: status
    }

    AdminProperties.editEmployee(user?._id, JSON.stringify(data))
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

  const deleteUser = async () => {
    setInProgress(true);
    AdminProperties.deleteEmployee(user?._id,)
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
  }


  const handleStartDateChange = (date) => {
    formik.setFieldValue("start_Date", date.target.valueAsDate);
  };

  const handleExpiryDateChange = (date) => {
    formik.setFieldValue("expiry_Date", date.target.valueAsDate);
  }

  const handleStatusToggle = () => {
    setStatus(prvStatus => prvStatus == "active" ? "inactive" : "active");
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
          setApartments(res.data.AppartmentObject.map(apartment => ({
            value: apartment._id,
            label: apartment.apartment_Number,
          })));
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

  useEffect(() => {
    getAppartments(initialValues.building);
  }, [initialValues.building]);

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  const handleDeleteClick = () => {
    setOpenConfirmDialog(true);
  };

  const handleConfirmDelete = () => {
    setOpenConfirmDialog(false);
    deleteUser();
  };

  const handleCloseDialog = () => {
    setOpenConfirmDialog(false);
  };


  const handleSendLinkClick = () => {
    AdminProperties.sendMail(user?._id,)
      .then((res) => {
        if (res.code === 200) {
          refetch();
          closeDialog();
        } else {
          setInProgress(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box>
      <Typography sx={{ fontSize: "25px", fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "start", mb: 2 }}>
        {user?.firstName}
      </Typography>
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
            options={apartments.map((apartment) => ({
              value: apartment.value,
              label: apartment.label,
            }))}
            error={formik.touched.apartment && formik.errors.apartment && formik.errors.apartment}
          />
          <Box>
            <Box sx={{ display: 'flex', gap: { sm: "1rem", xs: "0rem" } }}>
              <Box sx={{ width: "50%" }}>
                <DatePickerField
                  label="Start Date"
                  value={formik.values.start_Date}
                  onChange={handleStartDateChange}
                // dateFormat="MM/dd/yyyy"
                />
              </Box>
              <Box sx={{ width: "50%" }}>
                <DatePickerField
                  label="Expiry Date"
                  value={formik.values.expiry_Date}
                  onChange={handleExpiryDateChange}
                  dateFormat="MM/dd/yyyy"
                />
              </Box>
            </Box>
          </Box>
          <Box sx={{ mt: 1 }}>
            <Typography variant="body1">Status</Typography>
            <Button
              variant={status == "active" ? "variant-green-button" : "variant-grey-button"}
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
            type="submit"
          >
            {InProgress ? (
              <CircularProgress size={30} sx={{ color: "white" }} />
            ) : (
              "Update User"
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
          Resend Unique Link
        </Button>
        <Button
          disableElevation
          variant="danger-contained"
          sx={{
            borderRadius: "12px",
            padding: "0 8px",
            width: "350px",
            height: "45px",
            mt: 2,
            background: "red",
            fontSize: '12px',
            fontWeight: '400',
            [theme.breakpoints.down('sm')]: {
              width: "100%",
            },
          }}
          type="button"
          onClick={handleDeleteClick}
        >
          Delete User
        </Button>
      </form>
      <Dialog
        open={openConfirmDialog}
        onClose={handleCloseDialog}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this apartment?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} sx={{
            borderRadius: "12px",
            padding: "0 8px",
            width: "150px",
            height: "45px",
            mt: 2,
            fontSize: '12px',
            fontWeight: '400'
          }} variant="contained">
            No
          </Button>
          <Button onClick={handleConfirmDelete} sx={{
            borderRadius: "12px",
            padding: "0 8px",
            width: "150px",
            height: "45px",
            mt: 2,
            fontSize: '12px',
            fontWeight: '400'
          }} variant="danger-contained" >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EditEmployee;
