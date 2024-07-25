import React, { useState } from 'react';
import { Container, Grid, Typography, Checkbox, FormControlLabel, Icon, Modal, Box, Button } from '@mui/material';
import { styled } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { setModalResponse } from '../../../../features/authSlice';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios'
import { saveAs } from 'file-saver';

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
  const dispatch = useDispatch();
  const { modalResponse } = useSelector(({ auth }) => auth);

  console.log(modalResponse, 'modalResponse');

  const titles = [
    'ifrs 2 share based payment',
    'ifrs 3 business combinations',
    'ifrs 5 non current assets held for sale and discontinued operations',
    'ifrs 6 exploration for and evaluation of mineral resources',
    'ifrs 7 financial instruments disclosures',
    'ifrs 8 operating segments',
    'ifrs 16 leases',
    'ifrs 17 insurance contracts',
    'ias 1 presentation of financial statements',
    'ias 2 inventories',
    'ias 7 statement of cash flows',
    'ias 8 accounting policies changes in accounting estimates and errors',
    'ias 10 events after the reporting period',
    'ias 16 property plant and equipment',
    'ias 19 employee benefits',
    'ias 20 accounting for government grants and disclosure of government assistance',
    'ias 21 the effects of changes in foreign exchange rates',
    'ias 23 borrowing costs',
    'ias 24 related party disclosures',
    'ias 26 accounting and reporting by retirement benefit plans',
    'ias 27 separate financial statements',
    'ias 29 financial reporting in hyperinflationary economies',
    'ias 33 earnings per share',
    'ias 36 impairment of assets',
    'ias 37 provisions contingent liabilities and contingent assets',
    'ias 38 intangible assets',
    'ias 40 investment property',
    'ias 41 agriculture',
    'ifrs 12 disclosure of interests in other entities',
    'ifrs 13 fair value measurement',
    'ifrs 14 regulatory deferral accounts',
    'ifrs 15 revenue from contracts with customers'
  ];

  const [checkedItems, setCheckedItems] = useState(() => {
    // Initialize checkedItems with the modalResponse data
    const initialCheckedItems = {};
    titles.forEach(title => {
      initialCheckedItems[title] = modalResponse?.summary_report[title];
    });
    return initialCheckedItems;
  });

  const [open, setOpen] = useState(false);
  const [currentReasoning, setCurrentReasoning] = useState('');
  const [currentTitle, setCurrentTitle] = useState('');

  const handleChange = (event) => {
    setCheckedItems({ ...checkedItems, [event.target.name]: event.target.checked });
  };

  const handleOpen = (reasoning) => {
    console.log(reasoning, 'reasoning');
    setCurrentReasoning(reasoning);
    setCurrentTitle()
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const downloadReport = async () => {
    try {
      const fileId = modalResponse['ID Filename']
      if(fileId){
        const response = await axios.get(`https://findoc.abark.tech/download_report/?id=${fileId}`, {
          responseType: 'blob', 
        }); 
        console.log(response, 'api log');
        const blob = new Blob([response.data], { type: 'application/pdf' });
        saveAs(blob, modalResponse['ID Filename']);
        console.log(response, 'response');
      }
    
    } catch (error) {
      console.error('Error downloading the report', error);
    }
  }

  console.log(modalResponse.detailed_report);

  return (
    <Container style={{ padding: '20px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4">
          Results
        </Typography>
        <Button variant="contained" sx={{ alignSelf: 'flex-end' }} onClick={downloadReport}>
          Download Report
        </Button>
      </Box>
      <Grid container spacing={2}>
        {titles.map((title, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <StyledFormControlLabel
              control={
                checkedItems[title] ? (
                  <>
                    <CheckCircleIcon
                      sx={{ color: "#3B90B2" }}
                    />
                    {/* {{title}} */}
                  </>
                ) : (
                  <CloseIcon style={{ color: 'red' }} />
                )
              }
              label={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <VisibilityIcon
                    style={{ cursor: 'pointer', marginRight: '8px' }}
                    onClick={() => handleOpen((modalResponse.detailed_report[`${title}`].reason))}
                  />
                  {title}
                </div>
              }
            />
          </Grid>
        ))}
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 800,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            // height: 400
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Reasoning
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2, overflow: "auto", maxHeight: '400px', }}>
            {currentReasoning}
          </Typography>
        </Box>
      </Modal>
    </Container>
  );
};

export default EmployeeManagement;
