import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Menu, MenuItem } from "@mui/material";
import { createColumnHelper } from "@tanstack/react-table";
//components
import GlobalTable from "../../../../components/table/GlobalTable";
import BasicDialog from "../../../../components/dialog/BasicDialog";
import AddNewEmployee from "../components/AddNewEmployee";
import EditEmployee from "../components/EditEmployee";
//APIs
import { AdminProperties, seamAPI, CSVAPI } from "../../../../axios";

const employeesManagement = () => {
  const [isAddingEmployee, setIsAddingEmployee] = useState(false);
  const [isEditingEmployee, setIsEditingEmployee] = useState(false);
  const [allEmployees, setAllEmployees] = useState([]);
  const [deviceNames, setDeviceNames] = useState({});
  const [assignDeviceMenuAnchor, setAssignDeviceMenuAnchor] = useState({});
  const [allDevices, setAllDevices] = useState([]);
  //table data states
  const [dataLoading, setDataLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [count, setCount] = useState(0);
  const [selectedPage, setSelectedPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const columnHelper = createColumnHelper();

  //dialogs states
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [showEditEmployee, setShowEditEmployee] = useState(false);
  const [editEmployeeState, setEditEmployeeState] = useState({});
  const formData = new FormData();

  const getEmployees = () => {
    AdminProperties.getAllEmployess(selectedPage, itemsPerPage)
      .then((res) => {
        if (res?.code == 200) {
          const updatedArr = res?.data?.employees.map((obj) => ({
            id: obj?._id,
            name: obj?.name,
            building: obj?.building?.building_Name,
            appartment: obj?.apartment?.apartment_Number,
            email: obj?.email,
            isActive: obj?.isActive,
            expiry_Date: obj?.expiry_Date,
            building_id: obj?.building?._id,
            apartment_id: obj.apartment?._id,
            start_Date: obj?.start_Date,
            deviceName: obj?.deviceName
          }));
          setAllEmployees([...updatedArr]);
          setTotalPages(res?.data?.totalPages);
          setCount(res?.data?.totalCount);
        }
        setDataLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setDataLoading(false);
      });
  };

  const deleteEmployee = (_id) => {
    AdminProperties.deleteEmployee(_id)
      .then((res) => {
        if (res?.code == 200) {
          getEmployees();
        }
        setDataLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setDataLoading(false);
      });
  };

  const handleAssignDevice = (_id, device, device_id) => {
    const data = {
      device_id: device_id,
      deviceName: device
    }
    AdminProperties.editEmployee(_id, JSON.stringify(data))
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

  const handleDeviceSelect = (employeeId, device, device_id) => {
    setAssignDeviceMenuAnchor((prev) => ({ ...prev, [employeeId]: null }));
    setDeviceNames((prev) => ({ ...prev, [employeeId]: device }));
    handleAssignDevice(employeeId, device, device_id);
  };

  const getDevices = () => {

    seamAPI.getAllDevices()
      .then((res) => {
        if (res?.code == 200) {
          setAllDevices(res?.data?.devices);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setDataLoading(true);
    getEmployees();
    getDevices()
  }, [selectedPage]);

  const columns = [
    {
      title: "ALL USERS",
      key: "ALL_USERS",
      dataIndex: "ALL_USERS",
      render: (_, data) => (
        <>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p style={{ fontSize: ".85rem", fontWeight: "bold" }}>
              {data?.firstName}
            </p>
            <p style={{ color: "gray", fontSize: ".7rem", marginTop: "-5px" }}>
              {" "}
              {data?.email}{" "}
            </p>
          </div>
        </>
      ),
    },
    {
      title: "ASSIGN DEVICES",
      key: "ASSIGN_DEVICES",
      dataIndex: "ASSIGN_DEVICES",
      render: (_, data) => (
        <>
          <Button
            variant="variant-grey-button"
            onClick={(e) => setAssignDeviceMenuAnchor((prev) => ({ ...prev, [data._id]: e.currentTarget }))}
            sx={{
              background: "#cbd5e0",
              borderRadius: "4px",
              width: "122px",
              fontSize: "12px",
              fontWeight: 400,
              minHeight: "12px",
            }}
          >
            {data.deviceName == 'false' && deviceNames[data._id] == undefined ? "Assign Device" : (deviceNames[data._id] || data.deviceName)}
          </Button>
          <Menu
            anchorEl={assignDeviceMenuAnchor[data._id]}
            open={Boolean(assignDeviceMenuAnchor[data._id])}
            onClose={() => setAssignDeviceMenuAnchor((prev) => ({ ...prev, [data._id]: null }))}
            PaperProps={{
              style: {
                width: '122px'
              }
            }}
          >
            {allDevices.map((device) => (
              <MenuItem
                key={device.device_id}
                onClick={() => handleDeviceSelect(data._id, device.display_name, device.device_id)}
              >
                {device.display_name}
              </MenuItem>
            ))}
          </Menu>
        </>
      ),
    },
    {
      title: "STATUS",
      dataIndex: "STATUS",
      key: "STATUS",
      render: (_, data) => (
        <>
          <Button
            sx={{
              background: data.STATUS === "active" ? "#3b90b2" : "#cbd5e0",
              borderRadius: "4px",
              minHeight: '12px',
              fontSize: "12px", fontWeight: 400,
              textTransform: "capitalize",
              width: data.STATUS === "active" ? "92px" : "92px"
            }}
          >
            {data.STATUS}
          </Button>
        </>
      ),
    },
    {
      title: "BUILDING",
      key: "BUILDING",
      dataIndex: "BUILDING",
      render: (_, data) => (
        <>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p style={{ fontSize: ".85rem", fontWeight: "bold" }}>
              {data?.building}
            </p>
            <p style={{ color: "gray", fontSize: ".7rem", marginTop: "-5px" }}>
              {" "}
              {"Appartment " + data?.apartment}{" "}
            </p>
          </div>
        </>
      ),
    },
    {
      title: "START DATE",
      dataIndex: "START DATE",
      key: "START DATE",
      render: (_, data) => {
        if (data.start_Date) {
          const date = new Date(data.start_Date);
          const formattedDate = `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
          return <p>{formattedDate}</p>;
        } else {
          return null;
        }
      }
    },
    {
      title: "END DATE",
      dataIndex: "END DATE",
      key: "END DATE",
      render: (_, data) => {
        if (data.end_date) {
          const date = new Date(data.end_date);
          const formattedDate = `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
          return <p>{formattedDate}</p>;
        } else {
          return null;
        }
      }
    },
    {
      title: "",
      dataIndex: "Edit",
      key: "Edit",
      render: (_, data) =>
        data.Edit ? (
          <Button variant="variant-black-button"
            onClick={() => handleEditEmployee(data)}
            sx={{ background: "black", borderRadius: "4px", width: "78px", fontSize: "12px", fontWeight: 400, minHeight: '12px' }}
          >
            {data.Edit}
          </Button>
        ) : null,
    },
  ];

  const handleEditEmployee = (employee) => {
    setEditEmployeeState(employee);
    setShowEditEmployee(true);
  };

  const data = allEmployees.map((data, index) => ({
    ASSIGNDEVICES: "Assign",
    STATUS: data?.isActive,
    end_date: data?.expiry_Date,
    Edit: "Edit",
    _id: data?.id,
    firstName: data?.name,
    email: data?.email,
    apartment: data?.appartment,
    building: data?.building,
    building_id: data?.building_id,
    apartment_id: data?.apartment_id,
    start_Date: data?.start_Date,
    deviceName: data?.deviceName,
    device_id: data.device_id
  }));

  const handleImportCSV = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".csv";

    fileInput.onchange = async (event) => {
      const file = event.target.files[0];

      if (file) {
        const reader = new FileReader();

        reader.onload = async (loadEvent) => {
          const fileContents = loadEvent.target.result;
          const data = csvToArrayOfObjects(fileContents);

          try {
            const response = await CSVAPI.addCSVData(data);

            if (response?.code === 200) {
              getEmployees()
              console.log(response, 'File uploaded successfully');
            }
          } catch (error) {
            console.error("Error uploading CSV data:", error);
          }
        };

        reader.onerror = (errorEvent) => {
          console.error("An error occurred while reading the file:", errorEvent);
        };

        reader.readAsText(file);
      }
    };

    fileInput.click();
  };


  function csvToArrayOfObjects(csv) {
    const lines = csv.split('\n');
    const headers = lines[0].split(',').map(header => header.trim());

    const data = lines.slice(1).map(line => {
      const values = line.split(',').map(value => value.trim());
      const obj = {};
      headers.forEach((header, index) => {
        obj[header] = values[index];
      });
      return obj;
    });

    return data;
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          "& > :first-child": {
            marginRight: { xs: "0px", md: "50px" },
          },
          "& > :not(:first-child)": {
            marginTop: { xs: "25px", md: "0px" },
          },
        }}
      >
        <Typography
          variant="p"
          sx={{
            fontSize: "18px",
            fontWeight: 600,

          }}
        >
          Users
        </Typography>
        <Box display="flex" flexDirection="row" alignItems="center">
          <Button
            variant="contained"
            onClick={handleImportCSV}
            style={{ marginRight: "38px", fontSize: "15px", fontWeight: 400, minHeight: '15px' }}
          >
            Import CSV Files
          </Button>
          <Button variant="contained"
            style={{ fontSize: "15px", fontWeight: 400, minHeight: '15px' }}
            onClick={() => setShowAddEmployee(true)}>
            Add User
          </Button>
        </Box>
      </Box>

      <Box sx={{ marginTop: "0.3" }}>
        <GlobalTable
          isAction={true}
          showEdit={true}
          showDelete={true}
          showEditHandler={(value) => {
            setEditEmployeeState(value.state);
            setShowEditEmployee(value.flag);
          }}
          showDeleteHandler={(value) => {
            deleteEmployee(value.state.id);
          }}
          rows={data}
          columns={columns}
          isPaginate
          totalPages={totalPages}
          loading={dataLoading}
          itemsPerPage={itemsPerPage}
          selectedPage={selectedPage}
          count={count}
          setSelectedPage={setSelectedPage}
          noDataMessage="Explore your users details and statuses here"
        />
      </Box>
      {/* ============= Add new employee Dialog ============ */}
      <BasicDialog
        openDialog={showAddEmployee}
        setOpenDialog={setShowAddEmployee}
        persisted={isAddingEmployee}
        dialogWidth="600"
      >
        <AddNewEmployee
          InProgress={isAddingEmployee}
          setInProgress={(value) => setIsAddingEmployee(value)}
          closeDialog={() => setShowAddEmployee(false)}
          refetch={() => getEmployees()}
        />
      </BasicDialog>
      {/* ============= Edit employee Dialog ============ */}
      <BasicDialog
        title="Edit Detail"
        openDialog={showEditEmployee}
        setOpenDialog={setShowEditEmployee}
        persisted={isEditingEmployee}
        dialogWidth="600px"
      >
        <EditEmployee
          InProgress={isEditingEmployee}
          setInProgress={(value) => setIsEditingEmployee(value)}
          user={editEmployeeState}
          closeDialog={() => setShowEditEmployee(false)}
          refetch={() => getEmployees()}
        />
      </BasicDialog>
    </>
  );
};

export default employeesManagement;
