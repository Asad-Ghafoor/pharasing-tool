import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import GlobalTable from '../../../../components/table/GlobalTable';
import FormField from '../../../../components/InputField/FormField';
import { AdminProperties } from "../../../../axios";

const Table = () => {
    const [dataLoading, setDataLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [count, setCount] = useState(0);
    const [selectedPage, setSelectedPage] = useState(1);
    const [itemsPerPage] = useState(8);
    const [addressFilter, setAddressFilter] = useState('');
    const [stateFilter, setStateFilter] = useState('');
    const [allOffers, setAllOffers] = useState([]);

    const columns = [
        {
            title: "Address",
            key: "address",
            dataIndex: "address",
            render: (_, data) => (
                <p style={{ color: "gray", fontSize: ".7rem" }}>
                    {data.location.address}
                </p>
            ),
        },
        {
            title: "City",
            dataIndex: "city",
            key: "city",
            render: (_, data) => (
                <Typography style={{ color: "gray", fontSize: ".7rem" }}>
                    {data.location.city}
                </Typography>
            ),
        },
        {
            title: "State",
            dataIndex: "state",
            key: "state",
            render: (_, data) => (
                <Typography style={{ color: "gray", fontSize: ".7rem" }}>
                    {data.location.state}
                </Typography>
            ),
        },
        {
            title: "Cash Price",
            key: "cashPrice",
            dataIndex: "cashPrice",
            render: (_, data) => (
                <p style={{ color: "gray", fontSize: ".7rem" }}>
                    {data.cashPrice}
                </p>
            ),
        },
        {
            title: "List Price",
            dataIndex: "listPrice",
            key: "listPrice",
            render: (_, data) => (
                <p style={{ color: "gray", fontSize: ".7rem" }}>
                    {data.listPrice}
                </p>
            ),
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (_, data) => (
                <p style={{ color: "gray", fontSize: ".7rem" }}>
                    {data.status}
                </p>
            ),
        },
    ];

    const getProperties = async (page) => {
        setDataLoading(true);
        try {
            const response = await AdminProperties.getAllOffers(page, itemsPerPage);
            setAllOffers(response.data);
            setDataLoading(false);
        } catch (error) {
            console.error(error);
        } finally {
            setDataLoading(false);
        }
    };

    useEffect(() => {
        getProperties(selectedPage);
    }, [selectedPage]);

    const filteredData = allOffers.filter(data =>
        data.location.address.toLowerCase().includes(addressFilter.toLowerCase()) &&
        data.location.state.toLowerCase().includes(stateFilter.toLowerCase())
    );

    useEffect(() => {
        setCount(filteredData.length);
        setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
    }, [filteredData]);

    return (
        <>
            <Box sx={{
                backgroundColor: '#FAF9FF',
                border: '1px solid #FAF9FF',
                borderRadius: '10px',
                width: '100%',
                padding: '1.5rem',
                boxShadow: '0px 0px 8px 0px rgba(0,0,0,0.2)',
                mt: 2,
                display: 'flex',
                gap: '1rem',
            }}>
                <Box sx={{
                    width: '100%'
                }}>
                    <FormField
                        label="Address Contain"
                        placeholder="Address Contain"
                        name="address"
                        onChange={(e) => setAddressFilter(e.target.value)}
                    />
                </Box>
                <Box sx={{
                    width: '100%'
                }}>
                    <FormField
                        label="State Contain"
                        placeholder="State Contain"
                        name="state"
                        onChange={(e) => setStateFilter(e.target.value)}
                    />
                </Box>
            </Box>
            <Box sx={{
                backgroundColor: '#FAF9FF',
                border: '1px solid #FAF9FF',
                borderRadius: '10px',
                width: '100%',
                padding: '1.5rem',
                boxShadow: '0px 0px 8px 0px rgba(0,0,0,0.2)',
                mt: 2,
                overflow: "auto"
            }}>
                <Typography sx={{ marginBottom: '1rem' }}>
                    Sent Offer Logs
                </Typography>
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
                    rows={filteredData}
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
        </>
    );
};

export default Table;
