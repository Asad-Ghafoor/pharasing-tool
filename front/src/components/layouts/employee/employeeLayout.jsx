import React, { useState } from 'react';
import { Grid } from '@mui/material';
import Home from '../../../modules/employee/home/Home'; // Import Home component
import Intercom from '../../../modules/employee/intercom/intercom'; // Import Intercom component

const EmployeeLayout = ({ children }) => {

    return (
        <Grid container justifyContent="center">
            <Grid item xs={12} sm={10} md={8} lg={4}>
                {children}
            </Grid>
        </Grid>
    );
}

export default EmployeeLayout;
