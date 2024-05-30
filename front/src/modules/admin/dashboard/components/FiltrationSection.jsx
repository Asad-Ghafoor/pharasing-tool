import React from "react";
import { Box, Typography, Button, FormControlLabel, Grid } from "@mui/material";
import FormField from "../../../../components/InputField/FormField";
import FormSelect from "../../../../components/InputField/FormSelect";
import { Checkbox } from "@mui/material";

const FiltrationSection = (props) => {
    const { formValues, handleInputChange, states, types, cities, tags, logFormData } = props;
    return (
        <>
            <Grid container spacing={2} mt={2}>
                <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                    <Box
                        sx={{
                            backgroundColor: '#FAF9FF',
                            border: '1px solid #FAF9FF',
                            borderRadius: '10px',
                            width: '100%',
                            maxHeight: '20rem',
                            display: 'flex',
                            flexFlow: 'column',
                            padding: '1.5rem',
                            boxShadow: '0px 0px 8px 0px rgba(0,0,0,0.2)',
                        }}
                    >
                        <FormSelect placeholder="Choose State" label="State" name="state" value={formValues.state} onChange={handleInputChange} options={states?.map(val => ({ "label": val, value: val }))}>
                        </FormSelect>
                        <FormSelect
                            label="Type"
                            placeholder="Choose Type"
                            name="type"
                            value={formValues.type}
                            onChange={handleInputChange}
                            options={Array.isArray(types) ? types.map(val => ({ label: val, value: val })) : []}
                        />

                    </Box>
                </Grid>
                <Grid item xl={6} lg={6} md={4} sm={12} xs={12}>
                    <Box
                        sx={{
                            backgroundColor: '#FAF9FF',
                            border: '1px solid #FAF9FF',
                            borderRadius: '10px',
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            padding: '1.5rem',
                            boxShadow: '0px 0px 8px 0px rgba(0,0,0,0.2)',
                        }}
                    >
                        <Box
                            sx={{
                                borderRadius: '10px',
                                width: '48%',
                                maxHeight: '20rem',
                                display: 'flex',
                                flexFlow: 'column'
                            }}
                        >
                            <FormSelect label="City" placeholder="City Name" name="city" value={formValues.city}
                                onChange={handleInputChange} options={Array.isArray(cities) ? cities.map(val => ({ label: val, value: val })) : []} />
                            <FormField label="Price / As is Ratio" placeholder="Price " name="price" value={formValues.price}
                                onChange={handleInputChange} />
                        </Box>
                        <Box
                            sx={{
                                borderRadius: '10px',
                                width: '48%',
                                maxHeight: '20rem',
                                display: 'flex',
                                flexFlow: 'column',
                            }}
                        >
                            <FormSelect label="Tags" placeholder="Choose" name="tags" value={formValues.tags}
                                onChange={handleInputChange} options={Array.isArray(tags) ? tags.map(val => ({ label: val, value: val })) : []} />
                            <FormControlLabel
                                control={<Checkbox name="priceLessThanValue" checked={formValues.priceLessThanValue}
                                    onChange={handleInputChange} />}
                                label="Price is Less Than As Value"
                            />
                            <FormControlLabel
                                control={<Checkbox name="potentialFlips" checked={formValues.potentialFlips}
                                    onChange={handleInputChange} />}
                                label="Potential Flips"
                            />
                        </Box>
                    </Box>
                </Grid>

                <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                    <Box
                        sx={{
                            backgroundColor: '#FAF9FF',
                            border: '1px solid #FAF9FF',
                            borderRadius: '10px',
                            width: '100%',
                            maxHeight: '20rem',
                            display: 'flex',
                            flexFlow: 'column',
                            padding: '1.5rem',
                            boxShadow: '0px 0px 8px 0px rgba(0,0,0,0.2)',
                        }}
                    >
                        <FormField label="Beds Greater" placeholder="Beds Greater" name="beds" value={formValues.beds}
                            onChange={handleInputChange} type="number" />
                        <FormField label="Min Population" placeholder="Min Population" name="population" value={formValues.population}
                            onChange={handleInputChange} type="number" />
                    </Box>
                </Grid>
                <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                    <Box
                        sx={{
                            backgroundColor: '#FAF9FF',
                            border: '1px solid #FAF9FF',
                            borderRadius: '10px',
                            width: '100%',
                            maxHeight: '20rem',
                            display: 'flex',
                            flexFlow: 'column',
                            padding: '1.5rem',
                            boxShadow: '0px 0px 8px 0px rgba(0,0,0,0.2)',
                        }}
                    >
                        <FormField label="Year Built Before" placeholder="Year Built Before" name="yearBefore" value={formValues.yearBefore}
                            onChange={handleInputChange} type="number" />
                        <FormField label="Year Built After" placeholder="Year Built After" name="yearAfter" value={formValues.yearAfter}
                            onChange={handleInputChange} type="number" />
                    </Box>
                </Grid>
                <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                    <Box
                        sx={{
                            backgroundColor: '#FAF9FF',
                            border: '1px solid #FAF9FF',
                            borderRadius: '10px',
                            width: '100%',
                            maxHeight: '20rem',
                            display: 'flex',
                            flexFlow: 'column',
                            padding: '1.5rem',
                            boxShadow: '0px 0px 8px 0px rgba(0,0,0,0.2)',
                        }}
                    >
                        <FormField label="Price Greater Than" placeholder="Price Greater Than" name="greaterPrice" value={formValues.greaterPrice}
                            onChange={handleInputChange} type="number" />
                        <FormField label="Price Less Than" placeholder="Price Less Than" name="lessPrice" value={formValues.lessPrice}
                            onChange={handleInputChange} type="number" />
                    </Box>
                </Grid>
                <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                    <Box
                        sx={{
                            backgroundColor: '#FAF9FF',
                            border: '1px solid #FAF9FF',
                            borderRadius: '10px',
                            width: '100%',
                            maxHeight: '20rem',
                            display: 'flex',
                            flexFlow: 'column',
                            padding: '1.5rem',
                            boxShadow: '0px 0px 8px 0px rgba(0,0,0,0.2)',
                        }}
                    >
                        <FormField label="AS is Value Greater Than" placeholder="AS is Value Greater Than" name="greaterValue" value={formValues.greaterValue}
                            onChange={handleInputChange} type="number" />
                        <FormField label="AS is Value Less Than" placeholder="AS is Value Less Than" name="lessValue" value={formValues.lessValue}
                            onChange={handleInputChange} type="number" />
                    </Box>
                </Grid>
                <Grid sx={{ justifyContent: "flex-end" }} item container xs={12}>
                    <Button
                        onClick={logFormData}
                        sx={{
                            height: '50px',
                            width: '150px'
                        }}
                    >
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}

export default FiltrationSection