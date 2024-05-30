import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Grid, IconButton, Tabs, Tab } from "@mui/material";
import { AdminProperties, } from "../../../../axios";
import GlobalTable from "../../../../components/table/GlobalTable";
import { Image, Select } from 'antd';
import EyeOutlined from '@mui/icons-material/VisibilityOutlined';
import DollarOutlined from '@mui/icons-material/AttachMoneyOutlined';
import PhoneOutlined from '@mui/icons-material/PhoneOutlined';
import BasicDialog from "../../../../components/dialog/BasicDialog";
import CashOfferModal from "../components/CashOfferModal";
import FiltrationSection from '../components/FiltrationSection'
import RefreshIcon from '@mui/icons-material/Refresh';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const Dashboard = () => {
  const [allProperties, setAllProperties] = useState([]);
  const [filterationData, setfilterationData] = useState([]);
  const [allOffers, setAllOffers] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState(new Set());
  const [selectedState, setSelectedState] = useState('');
  const [tags, setTags] = useState(new Set());
  const [types, setTypes] = useState(new Set());
  const [showOffer, setShowOffer] = useState(false);
  const [OfferState, setOfferState] = useState({});
  const [isOffer, setIsOffer] = useState(false);
  const [value, setValue] = useState(0);
  const { Option } = Select;
  let totalStates = states?.length;
  let totalProperties = allProperties.length;
  let totalOffers = allOffers.length;
  const [dataLoading, setDataLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [count, setCount] = useState(0);
  const [selectedPage, setSelectedPage] = useState(1);
  const [itemsPerPage] = useState(8);

  const countriesData = [
    {
      "state": "Alabama",
      "cities": ["Birmingham", "Montgomery", "Mobile"]
    },
    {
      "state": "Alaska",
      "cities": ["Anchorage", "Fairbanks", "Juneau"]
    },
    {
      "state": "Arizona",
      "cities": ["Phoenix", "Tucson", "Mesa"]
    },
    {
      "state": "Arkansas",
      "cities": ["Little Rock", "Fort Smith", "Fayetteville"]
    },
    {
      "state": "California",
      "cities": ["Los Angeles", "San Francisco", "San Diego"]
    },
    {
      "state": "Colorado",
      "cities": ["Denver", "Colorado Springs", "Aurora"]
    },
    {
      "state": "Connecticut",
      "cities": ["Bridgeport", "New Haven", "Hartford"]
    },
    {
      "state": "Delaware",
      "cities": ["Wilmington", "Dover", "Newark"]
    },
    {
      "state": "Florida",
      "cities": ["Miami", "Orlando", "Tampa"]
    },
    {
      "state": "Georgia",
      "cities": ["Atlanta", "Augusta", "Savannah"]
    },
    {
      "state": "Hawaii",
      "cities": ["Honolulu", "Hilo", "Kailua"]
    },
    {
      "state": "Idaho",
      "cities": ["Boise", "Meridian", "Nampa"]
    },
    {
      "state": "Illinois",
      "cities": ["Chicago", "Aurora", "Naperville"]
    },
    {
      "state": "Indiana",
      "cities": ["Indianapolis", "Fort Wayne", "Evansville"]
    },
    {
      "state": "Iowa",
      "cities": ["Des Moines", "Cedar Rapids", "Davenport"]
    },
    {
      "state": "Kansas",
      "cities": ["Wichita", "Overland Park", "Kansas City"]
    },
    {
      "state": "Kentucky",
      "cities": ["Louisville", "Lexington", "Bowling Green"]
    },
    {
      "state": "Louisiana",
      "cities": ["New Orleans", "Baton Rouge", "Shreveport"]
    },
    {
      "state": "Maine",
      "cities": ["Portland", "Lewiston", "Bangor"]
    },
    {
      "state": "Maryland",
      "cities": ["Baltimore", "Frederick", "Rockville"]
    },
    {
      "state": "Massachusetts",
      "cities": ["Boston", "Worcester", "Springfield"]
    },
    {
      "state": "Michigan",
      "cities": ["Detroit", "Grand Rapids", "Warren"]
    },
    {
      "state": "Minnesota",
      "cities": ["Minneapolis", "Saint Paul", "Rochester"]
    },
    {
      "state": "Mississippi",
      "cities": ["Jackson", "Gulfport", "Southaven"]
    },
    {
      "state": "Missouri",
      "cities": ["Kansas City", "Saint Louis", "Springfield"]
    },
    {
      "state": "Montana",
      "cities": ["Billings", "Missoula", "Great Falls"]
    },
    {
      "state": "Nebraska",
      "cities": ["Omaha", "Lincoln", "Bellevue"]
    },
    {
      "state": "Nevada",
      "cities": ["Las Vegas", "Henderson", "Reno"]
    },
    {
      "state": "New Hampshire",
      "cities": ["Manchester", "Nashua", "Concord"]
    },
    {
      "state": "New Jersey",
      "cities": ["Newark", "Jersey City", "Paterson"]
    },
    {
      "state": "New Mexico",
      "cities": ["Albuquerque", "Las Cruces", "Rio Rancho"]
    },
    {
      "state": "New York",
      "cities": ["New York City", "Buffalo", "Rochester"]
    },
    {
      "state": "North Carolina",
      "cities": ["Charlotte", "Raleigh", "Greensboro"]
    },
    {
      "state": "North Dakota",
      "cities": ["Fargo", "Bismarck", "Grand Forks"]
    },
    {
      "state": "Ohio",
      "cities": ["Columbus", "Cleveland", "Cincinnati"]
    },
    {
      "state": "Oklahoma",
      "cities": ["Oklahoma City", "Tulsa", "Norman"]
    },
    {
      "state": "Oregon",
      "cities": ["Portland", "Salem", "Eugene"]
    },
    {
      "state": "Pennsylvania",
      "cities": ["Philadelphia", "Pittsburgh", "Allentown"]
    },
    {
      "state": "Rhode Island",
      "cities": ["Providence", "Warwick", "Cranston"]
    },
    {
      "state": "South Carolina",
      "cities": ["Charleston", "Columbia", "North Charleston"]
    },
    {
      "state": "South Dakota",
      "cities": ["Sioux Falls", "Rapid City", "Aberdeen"]
    },
    {
      "state": "Tennessee",
      "cities": ["Nashville", "Memphis", "Knoxville"]
    },
    {
      "state": "Texas",
      "cities": ["Houston", "San Antonio", "Dallas"]
    },
    {
      "state": "Utah",
      "cities": ["Salt Lake City", "West Valley City", "Provo"]
    },
    {
      "state": "Vermont",
      "cities": ["Burlington", "South Burlington", "Rutland"]
    },
    {
      "state": "Virginia",
      "cities": ["Virginia Beach", "Norfolk", "Chesapeake"]
    },
    {
      "state": "Washington",
      "cities": ["Seattle", "Spokane", "Tacoma"]
    },
    {
      "state": "West Virginia",
      "cities": ["Charleston", "Huntington", "Morgantown"]
    },
    {
      "state": "Wisconsin",
      "cities": ["Milwaukee", "Madison", "Green Bay"]
    },
    {
      "state": "Wyoming",
      "cities": ["Cheyenne", "Casper", "Laramie"]
    }
  ]
  useEffect(() => {
    const statesList = countriesData.map((item) => item.state);
    setStates(statesList);
  }, [])

  useEffect(() => {
    if (selectedState) {
      const stateData = countriesData.find((item) => item.state === selectedState);
      setCities(stateData ? stateData.cities : []);
    } else {
      setCities([]);
    }
  }, [selectedState]);
  

  const statusOptions = [
    { label: 'Active', value: 'active' },
    { label: 'Sold', value: 'sold' },
    { label: 'Pending', value: 'pending' },
    { label: 'Foreclosure', value: 'foreclosure' },
    { label: 'Auction', value: 'auction' }
  ];

  const [formValues, setFormValues] = useState({
    state: '',
    type: '',
    city: '',
    price: '',
    tags: '',
    priceLessThanValue: false,
    potentialFlips: false,
    beds: '',
    population: '',
    yearBefore: '',
    yearAfter: '',
    greaterPrice: '',
    lessPrice: '',
    greaterValue: '',
    lessValue: '',
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const statsCardData = [
    {
      title: "Total Properties",
      value:
        totalProperties < 10
          ? totalProperties > 0
            ? "0" + totalProperties
            : "00"
          : totalProperties,
      isPlus: false,
    },
    {
      title: "Total Cash Offers",
      value:
        totalOffers < 10
          ? totalOffers > 0
            ? "0" + totalOffers
            : "00"
          : totalOffers,
      isPlus: false,
    },
    {
      title: "Total States",
      value:
        totalStates < 10
          ? totalStates > 0
            ? "0" + totalStates
            : "00"
          : totalStates,
      isPlus: false,
    },
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'state') {
      setSelectedState(value);
    }
    setFormValues({
      ...formValues,
      [name]: type === 'checkbox' ? checked : value,
    });
  };


  const getallProperties = async (page) => {
    setDataLoading(true);
    try {
      const response = await AdminProperties.getAllOffers();
      setAllOffers(response.data);
      setDataLoading(false);
    } catch (error) {
      console.error(error);
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    getallProperties();
  }, []);

  const validateFields = () => {
    const numberFields = ['beds', 'population', 'yearBefore', 'yearAfter', 'greaterPrice', 'lessPrice', 'greaterValue', 'lessValue'];
    for (let field of numberFields) {
      if (formValues[field] && isNaN(formValues[field])) {
        return false;
      }
    }
    return true;
  };

  const logFormData = () => {
    if (validateFields()) {
      const filteredProperties = filterProperties(formValues, filterationData);
      setAllProperties(filteredProperties)
    } else {
      alert('Please enter valid numbers for the fields requiring numerical values.');
    }
  }

  const filterProperties = (formValues, filterationData) => {
    return filterationData.filter(property => {
      return (
        (formValues.state === "" || property.location.state.toLowerCase() === formValues.state.toLowerCase()) &&
        (formValues.city === "" || property.location.city.toLowerCase() === formValues.city.toLowerCase()) &&
        (formValues.type === "" || property.propertyType.toLowerCase() === formValues.type.toLowerCase()) &&
        (formValues.price === "" || property.listPrice <= parseFloat(formValues.price)) &&
        (!formValues.priceLessThanValue || (formValues.lessPrice === "" || property.listPrice < parseFloat(formValues.lessPrice))) &&
        (!formValues.potentialFlips || (formValues.greaterPrice === "" || property.listPrice > parseFloat(formValues.greaterPrice))) &&
        (formValues.beds === "" || property.beds === parseInt(formValues.beds)) &&
        (formValues.yearBefore === "" || property.Details.year_built <= parseInt(formValues.yearBefore)) &&
        (formValues.yearAfter === "" || property.Details.year_built >= parseInt(formValues.yearAfter))
      );
    });
  }

  const viewListing = (href) => {
    window.open(href, '_blank')
  }


  const columns = [
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      ellipsis: true,
      render: (_, data) => (
        <Select
          defaultValue={data?.status || 'active'}
          style={{ width: 100 }}
        >
          {statusOptions.map(option => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Address",
      key: "address",
      dataIndex: "address",
      ellipsis: true,
      render: (_, data) => (
        <p style={{ color: "gray", fontSize: ".55rem" }}>
          {data?.address || null}
        </p>
      ),
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
      ellipsis: true,
      render: (_, data) => (
        <Typography style={{ color: "gray", fontSize: ".55rem" }} >
          {data?.city || null}
        </Typography>
      ),
    },
    {
      title: "State",
      key: "state",
      dataIndex: "state",
      ellipsis: true,
      render: (_, data) => (
        <Button
          variant="variant-state"
          sx={{
            background: "#cbd5e0",
            borderRadius: "4px",
            width: "auto",
            fontSize: ".55rem",
            fontWeight: 400,
            minHeight: "12px",
            color: "#3b1d6f"
          }}
        >
          {data?.state || null}
        </Button>
      ),
    },
    {
      title: "Zip Code",
      dataIndex: "zip_code",
      key: "zip_code",
      ellipsis: true,
      render: (_, data) => (
        <Typography
          style={{ color: "gray", fontSize: ".55rem" }}
        >
          {data?.zip_code || null}
        </Typography>
      ),
    },
    {
      title: "Beds",
      key: "beds",
      dataIndex: "beds",
      ellipsis: true,
      render: (_, data) => (
        <p style={{ color: "gray", fontSize: ".55rem" }}>
          {`${data?.beds}` || null}
        </p>
      ),
    },
    {
      title: "Baths",
      dataIndex: "bath",
      key: "bath",
      ellipsis: true,
      render: (_, data) => (
        <p style={{ color: "gray", fontSize: ".55rem" }}>
          {data?.bath || null}
        </p>
      ),
    },
    {
      title: "SQFT",
      dataIndex: "sqft",
      key: "sqft",
      ellipsis: true,
      render: (_, data) => (
        <p style={{ color: "gray", fontSize: ".55rem" }}>
          {data?.sqft || null}
        </p>
      ),
    },
    {
      title: "Lot SQFT",
      dataIndex: "lot_sqft",
      key: "lot_sqft",
      ellipsis: true,
      render: (_, data) => (
        <p style={{ color: "gray", fontSize: ".55rem" }}>
          {data?.lot_sqft || null}
        </p>
      ),
    },
    {
      title: "Year Built",
      dataIndex: "year_built",
      key: "year_built",
      ellipsis: true,
      render: (_, data) => (
        <p style={{ color: "gray", fontSize: ".55rem" }}>
          {data?.year_built || null}
        </p>
      ),
    },
    {
      title: "Date Added",
      dataIndex: "date_added",
      key: "date_added",
      ellipsis: true,
      render: (_, data) => (
        <p style={{ color: "gray", fontSize: ".55rem" }}>
          {data?.date_added || null}
        </p>
      ),
    },
    {
      title: "Hoa Fee",
      dataIndex: "hoa_fee",
      key: "hoa_fee",
      ellipsis: true,
      render: (_, data) => {
        const hoaFee = data?.hoa_fee;
        return (
          <p style={{ color: "gray", fontSize: ".55rem" }}>
            {typeof hoaFee === 'number' ? `$${hoaFee}/month` : "None"}
          </p>
        );
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      ellipsis: true,
      render: (_, data) => {
        const formatPrice = (price) => {
          if (price === null || price === undefined) return null;
          return `$${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
        };

        return (
          <p style={{ color: "gray", fontSize: ".55rem" }}>
            {formatPrice(data?.price)}
          </p>
        );
      },
    },

    {
      title: "As Is Value",
      dataIndex: "as_is_value",
      key: "as_is_value",
      ellipsis: true,
      render: (_, data) => (
        <p style={{ color: "gray", fontSize: ".55rem" }}>
          {data?.as_is_value || null}
        </p>
      ),
    },
    {
      title: "Picture",
      dataIndex: "picture",
      key: "picture",
      ellipsis: true,
      render: (_, data) => (
        <Image src={data?.picture || null} alt="Property" style={{ width: '50px', height: 'auto' }} />
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      ellipsis: true,
      render: (_, data) => (
        <div style={{ display: 'flex', gap: '5px' }}>
          <Button variant="variant-grey-button" onClick={() => viewListing(data?.href)} sx={{
            background: "#cbd5e0",
            borderRadius: "4px",
            width: "auto",
            fontSize: ".55rem",
            fontWeight: 400,
            minHeight: "12px",
            color: "#3b1d6f"
          }} startIcon={<EyeOutlined />}>
            View Listing
          </Button>
          <Button variant="variant-grey-button"
            onClick={() => handleOffer(data)}
            sx={{
              background: "#cbd5e0",
              borderRadius: "4px",
              width: "auto",
              fontSize: ".55rem",
              fontWeight: 400,
              minHeight: "1rem",
              color: "#3b1d6f"
            }} startIcon={<DollarOutlined />} >
            Cash Offer
          </Button>
          <Button variant="variant-grey-button" sx={{
            background: "#cbd5e0",
            borderRadius: "4px",
            width: "auto",
            fontSize: ".55rem",
            fontWeight: 400,
            maxHeight: "12px",
            color: "#3b1d6f",
            alignItems: "center"
          }}><PhoneOutlined sx={{ fontSize: ".9rem" }} /></Button>
        </div>
      ),
    }
  ];

  const data = allProperties.map(property => ({
    address: property?.location?.address || "null",
    city: property?.location?.city || "null",
    state: property?.location?.state || "null",
    zip_code: property?.location?.postalCode || "null",
    beds: property?.Details?.beds || "null",
    bath: property?.Details?.baths || "null",
    sqft: property?.sqft || "null",
    lot_sqft: property?.lotSqft || "null",
    year_built: property?.Details?.year_built || "null",
    date_added: property?.listDate || "null",
    hoa_fee: property?.hoa || 'None',
    price: property?.listPrice || "null",
    as_is_value: property?.listDate || "null",
    picture: property?.location?.map || property?.primaryPhoto || "null",
    "id": property?.id,
    "href": property?.href
  }));

  const getProperties = async (page) => {
    setDataLoading(true);
    try {
      const response = await AdminProperties.getAllProperties(page, itemsPerPage);
      const propertiesData = response.data;
      const extractedTags = propertiesData?.map(property => property.tags);
      const extractedTypes = propertiesData?.map(property => property.propertyType);
      const allTags = extractedTags.flat();
      const uniqueTagsSet = new Set(allTags);
      const uniqueTagsArray = [...uniqueTagsSet];
      setAllProperties(propertiesData);
      setfilterationData(propertiesData)
      setTags([...new Set(uniqueTagsArray)]);
      setTypes([...new Set(extractedTypes)]);

      const paginationData = response.data.pagination;
      setCount(paginationData.count);
      setTotalPages(paginationData.totalPages);

      setTotalPages(paginationData.totalPages);
      setDataLoading(false);
    } catch (error) {
      console.error(error);
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    setDataLoading(true)
    getProperties(selectedPage);
  }, [selectedPage]);

  const handleOffer = (offer) => {
    setOfferState(offer);
    setShowOffer(true);
  };

  const handleRefreshClick = () => {
    getProperties()
  };

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
            Dashboard
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
                boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.2)",
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

        <FiltrationSection
          formValues={formValues}
          handleInputChange={handleInputChange}
          states={states}
          types={types}
          cities={cities}
          tags={tags}
          logFormData={logFormData}
        />
        <Box
          sx={{
            // backgroundColor: "#FAF9FF",
            borderRadius: "10px",
            width: "100%",
            maxHeight: "auto",
            display: "flex",
            flexDirection: "column",
            paddingTop: "1rem",
            // boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.2)",
            mt: 2
          }}
        >

          <Box sx={{
            backgroundColor: '#FAF9FF',
            border: '1px solid #FAF9FF',
            borderRadius: '10px',
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: '1.5rem',
            mt: 2,
            boxShadow: '0px 0px 8px 0px rgba(0,0,0,0.2)',
            overflow: "auto"
          }}>

            <Box sx={{ marginTop: "0.3" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="tabs example"
                fullWidth
                TabIndicatorProps={{
                  style: {
                    display: 'none',
                    marginTop: "10px"
                  },
                }}
                sx={{
                  '& .MuiTab-root': {
                    textTransform: 'none',
                    minWidth: 0,
                    marginRight: '1rem',
                    fontWeight: "bold",
                    fontSize: "14px",
                    height: "50px",
                    width: "100px",
                    color: "#252526",
                    background: '#ff',
                    borderRadius: "10px",
                    mb: 4,
                    boxShadow: '0px 0px 8px 0px rgba(0,0,0,0.2)'
                  },
                  '& .Mui-selected': {
                    background: '#3b1e6f !important',
                    fontWeight: 'bold',
                    color: "#fff !important"
                  },
                }}
              >
                <Tab label="Active" />
                <Tab label="Sold" />
                <Tab label="Pending" />
                <Tab label="Foreclosure" />
                <Tab label="Auction" />
              </Tabs>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={handleRefreshClick}>
                  <RefreshIcon />
                </IconButton>
                <Typography variant="h6" style={{ marginLeft: '8px' }}>
                  On Markeet Listing For Cash Offers
                </Typography>
              </div>
              <TabPanel value={value} index={0}>
                <GlobalTable
                  isAction={true}
                  showEdit={true}
                  showDelete={true}
                  rows={data}
                  columns={columns}
                  isPaginate
                  totalPages={totalPages}
                  loading={dataLoading}
                  itemsPerPage={itemsPerPage}
                  selectedPage={selectedPage}
                  count={count}
                  elapse={true}
                  setSelectedPage={setSelectedPage}
                  noDataMessage="Explore your users details and statuses here"
                />
              </TabPanel>
              <TabPanel value={value} index={1}>
                Sold Content
              </TabPanel>
              <TabPanel value={value} index={2}>
                Pending Content
              </TabPanel>
              <TabPanel value={value} index={3}>
                Foreclosure Content
              </TabPanel>
              <TabPanel value={value} index={4}>
                Auction Content
              </TabPanel>
            </Box>
          </Box>
        </Box>
      </Grid>

      <BasicDialog
        title="Edit Detail"
        openDialog={showOffer}
        setOpenDialog={setShowOffer}
        persisted={isOffer}
        dialogWidth="600px"
      >
        <CashOfferModal
          InProgress={isOffer}
          setInProgress={(value) => setIsOffer(value)}
          data={OfferState}
          closeDialog={() => setShowOffer(false)}
          refetch={getProperties}
        />
      </BasicDialog>
    </>
  );
};

export default Dashboard;


