import React, { useState } from 'react';
import { Container, FormControlLabel, Checkbox, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';

const StyledFormControlLabel = styled(FormControlLabel)(({ theme, checked }) => ({
  ...(checked && {
    border: `1px solid ${theme.palette.primary.main}`,
    boxShadow: '0 3px 5px 2px rgba(0, 105, 192, .3)',
    backgroundColor: theme.palette.action.hover,
    borderRadius: '4px',
    padding: '4px',
  }),
}));

const EmployeeManagement = () => {
  const titles = [
    'ifrs-2-share-based-payment',
    'ifrs-3-business-combinations',
    'ifrs-5-non-current-assets-held-for-sale-and-discontinued-operations',
    'ifrs-6-exploration-for-and-evaluation-of-mineral-resources',
    'ifrs-7-financial-instruments-disclosures',
    'ifrs-8-operating-segments',
    'ifrs-16-leases',
    'ifrs-17-insurance-contracts',
    'ias-1-presentation-of-financial-statements',
    'ias-2-inventories',
    'ias-7-statement-of-cash-flows',
    'ias-8-accounting-policies-changes-in-accounting-estimates-and-errors',
    'ias-10-events-after-the-reporting-period',
    'ias-16-property-plant-and-equipment',
    'ias-19-employee-benefits',
    'ias-20-accounting-for-government-grants-and-disclosure-of-government-assistance',
    'ias-21-the-effects-of-changes-in-foreign-exchange-rates',
    'ias-23-borrowing-costs',
    'ias-24-related-party-disclosures',
    'ias-26-accounting-and-reporting-by-retirement-benefit-plans',
    'ias-27-separate-financial-statements',
    'ias-29-financial-reporting-in-hyperinflationary-economies',
    'ias-33-earnings-per-share',
    'ias-36-impairment-of-assets',
    'ias-37-provisions-contingent-liabilities-and-contingent-assets',
    'ias-38-intangible-assets',
    'ias-40-investment-property',
    'ias-41-agriculture',
    'ifrs-12-disclosure-of-interests-in-other-entities',
    'ifrs-13-fair-value-measurement',
    'ifrs-14-regulatory-deferral-accounts',
    'ifrs-15-revenue-from-contracts-with-customers'
  ];

  const [checkedItems, setCheckedItems] = useState({});

  const handleChange = (event) => {
    setCheckedItems({ ...checkedItems, [event.target.name]: event.target.checked });
  };

  return (
    <Container style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Results
      </Typography>
      <Grid container spacing={2}>
        {titles.map((title, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <StyledFormControlLabel
              control={
                <Checkbox
                  checked={checkedItems[title] || false}
                  onChange={handleChange}
                  name={title}
                />
              }
              label={title}
              checked={checkedItems[title] || false}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default EmployeeManagement;
