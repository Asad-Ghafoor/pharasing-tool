import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { Box, FormControl, MenuItem, InputLabel, Typography } from '@mui/material';
import Select from '@mui/material/Select';
import 'chartjs-adapter-date-fns';
import { AdminProperties } from '../../../../axios';
import Card from './Card';

Chart.register(...registerables);

const countOffers = (data, interval) => {
    const counts = {};
    data.forEach(item => {
        const date = new Date(item.timestamp);
        let key;
        if (interval === 'day') {
            key = date.toISOString().split('T')[0];
        } else if (interval === 'week') {
            const startOfWeek = new Date(date.setDate(date.getDate() - date.getDay()));
            key = startOfWeek.toISOString().split('T')[0];
        } else if (interval === 'month') {
            key = `${date.getFullYear()}-${date.getMonth() + 1}`;
        }
        counts[key] = (counts[key] || 0) + 1;
    });
    return counts;
};

const prepareChartData = (counts) => {
    const labels = Object.keys(counts).sort();
    const data = labels.map(label => counts[label]);
    return {
        labels,
        datasets: [{
            label: 'Number of Offers',
            data,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
        }]
    };
};

const OfferChart = () => {
    const [interval, setInterval] = useState('day');
    const [allOffers, setAllOffers] = useState([]);
    const [totalNumbers, setTotalNumbers] = useState([]);
    const [avgOffers, setAvgOffers] = useState();
    const counts = countOffers(allOffers, interval);
    const chartData = prepareChartData(counts);
    const [age, setAge] = useState('day');
    const handleChange = (event) => {
        setAge(event.target.value);
        setInterval(event.target.value);
    };

    const getTotalOffersLast15Days = (offers) => {
        const now = new Date();
        const fifteenDaysAgo = new Date(now);
        fifteenDaysAgo.setDate(now.getDate() - 15);

        const total = offers.filter(offer => new Date(offer.timestamp) >= fifteenDaysAgo).length;
        setAvgOffers(total);
    };

    const getProperties = async () => {
        try {
            const response = await AdminProperties.getAllOffers();
            setAllOffers(response.data);
            getTotalOffersLast15Days(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getProperties();
    }, []);

    return (
        <div>
            <Card allOffers={allOffers} avgOffers={avgOffers} totalNumbers={totalNumbers} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, mt: 4 }}>
                <Typography sx={{ fontSize: "14px", color: "#252526" }}>
                    Offers By Date
                </Typography>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label"></InputLabel>
                        <Select
                            sx={{ fontSize: "14px", color: "#252526" }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            label="Filter"
                            onChange={handleChange}
                        >
                            <MenuItem value="day">Day</MenuItem>
                            <MenuItem value="week">Week</MenuItem>
                            <MenuItem value="month">Month</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Box>
            <Bar data={chartData} />
        </div>
    );
};

export default OfferChart;
