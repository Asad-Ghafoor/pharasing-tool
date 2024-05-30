import React from "react";
import { Box, Typography, Grid } from "@mui/material";;

const Card = ({ allOffers, avgOffers, totalNumbers }) => {
    let totalOffers = allOffers?.length;
    let avgOffer = avgOffers;
    let totalNumber = totalNumbers;

    const statsCardData = [
        {
            title: "Total Offer Sent",
            value:
                totalOffers < 10
                    ? totalOffers > 0
                        ? "0" + totalOffers
                        : "00"
                    : totalOffers,
            isPlus: false,
        },
        {
            title: "Average Amount of Last 15 Days",
            value:
                avgOffer < 10
                    ? avgOffer > 0
                        ? "0" + avgOffer
                        : "00"
                    : avgOffer,
            isPlus: false,
        },
        {
            title: "Total Number",
            value:
                totalNumber < 10
                    ? totalNumber > 0
                        ? "0" + totalNumber
                        : "00"
                    : totalNumber,
            isPlus: false,
        },
    ];

    return (
        <>
            <Grid
                container
                maxWidth="100%"
                spacing={1}
                sx={{ justifyContent: { sm: "start", xs: "center" } }}
            >
                <Box sx={{ width: "100%", paddingBottom: "1rem" }}>
                    <Typography
                        variant="p"
                        sx={{
                            fontSize: "18px",
                            fontWeight: 600,
                        }}
                    >
                        Sent Offer Logs
                    </Typography>
                </Box>
                {statsCardData?.map((value, index) => (
                    <Grid key={index} item xl={4} lg={4} md={4} sm={4} xs={8}>
                        <Box
                            sx={{
                                backgroundColor: "#FAF9FF",
                                borderRadius: "10px",
                                width: "100%",
                                maxHeight: "115px",
                                display: "flex",
                                flexFlow: "column",
                                padding: "1rem",
                                boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.2)"
                            }}
                        >
                            <Typography sx={{ fontSize: "14px", color: "#252526" }}>
                                {value.title}
                            </Typography>
                            <Typography
                                sx={{ fontWeight: 600, fontSize: "16px", color: "#252526" }}
                            >
                                {value.value}
                                {value.isPlus && "+"}
                            </Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>

        </>
    )
}

export default Card