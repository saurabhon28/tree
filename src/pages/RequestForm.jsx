import React, { useState, useCallback } from 'react';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  Grid,
  Dialog, 
  DialogContent,
  IconButton
} from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import UploadIcon from '@mui/icons-material/Upload';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MapComponent from '../components/MapComponent';

function RequestForm() {
    const [address, setAddress] = useState('');
    const [openMapModal, setOpenMapModal] = useState(false); // State for modal visibility
  const [userInfo, setUserInfo] = useState({
    name: '',
    contactNumber: '',
    emailAddress: '',
    address: '',
  });

  const [treeDetails, setTreeDetails] = useState({
    typeOfTree: '',
    numberOfTrees: '',
    treeHeight: '',
    ageOfTree: '',
    healthOfTree: '',
  });

  const [serviceDetails, setServiceDetails] = useState({
    typeOfService: '',
    preferredDate: null,
    reasonForService: '',
    additionalRequests: '',
  });

  const [legalCompliance, setLegalCompliance] = useState({
    permissionStatus: false,
    permissionDocument: null,
    landOwnershipProof: null,
    environmentalImpact: '',
  });

  const [pricingAndPayment, setPricingAndPayment] = useState({
    estimatedCost: '',
    paymentMethod: '',
  });

  const handleLocationSelect = (place) => {
    setAddress(place); // Update the address state with the selected place
  };

  const handleOpenMapModal = () => setOpenMapModal(true); // Open modal

  const handleCloseMapModal = () => setOpenMapModal(false); // Close modal

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleTreeDetailsChange = (e) => {
    const { name, value } = e.target;
    setTreeDetails({ ...treeDetails, [name]: value });
  };

  const handleServiceDetailsChange = (e) => {
    const { name, value } = e.target;
    setServiceDetails({ ...serviceDetails, [name]: value });
  };

  const handleLegalComplianceChange = (e) => {
    const { name, checked } = e.target;
    setLegalCompliance({ ...legalCompliance, [name]: checked });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setLegalCompliance({ ...legalCompliance, [name]: files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', { userInfo, treeDetails, serviceDetails, legalCompliance, pricingAndPayment, address });
  };

  return (
    <Box
      sx={{
        padding: 3,
        maxWidth: '90%',
        margin: 'auto',
        backgroundColor: 'white',
        borderRadius: 2,
        border: '1px solid red',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Tree Pruning/Cutting Service Request Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* User Information */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              User Information
            </Typography>
            <TextField
              label="Name"
              name="name"
              fullWidth
              value={userInfo.name}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Contact Number"
              name="contactNumber"
              fullWidth
              value={userInfo.contactNumber}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Email Address"
              name="emailAddress"
              type="email"
              fullWidth
              value={userInfo.emailAddress}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />
              <TextField
              label="Address/Location"
              name="address"
              fullWidth
              value={address}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleOpenMapModal}>
                    <MapIcon />
                  </IconButton>
                ),
              }}
              sx={{ mb: 2 }}
            />
            <Dialog open={openMapModal} onClose={handleCloseMapModal} fullWidth maxWidth="md">
              <DialogContent>
                <MapComponent onLocationSelect={handleLocationSelect} />
              </DialogContent>
            </Dialog>
          </Grid>

          {/* Tree Details */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Tree Details
            </Typography>
            <TextField
              label="Type of Tree"
              name="typeOfTree"
              fullWidth
              value={treeDetails.typeOfTree}
              onChange={handleTreeDetailsChange}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Number of Trees"
              name="numberOfTrees"
              type="number"
              fullWidth
              value={treeDetails.numberOfTrees}
              onChange={handleTreeDetailsChange}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Tree Height/Size"
              name="treeHeight"
              fullWidth
              value={treeDetails.treeHeight}
              onChange={handleTreeDetailsChange}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Age of Tree"
              name="ageOfTree"
              fullWidth
              value={treeDetails.ageOfTree}
              onChange={handleTreeDetailsChange}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Health of Tree"
              name="healthOfTree"
              fullWidth
              value={treeDetails.healthOfTree}
              onChange={handleTreeDetailsChange}
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        {/* Service Details */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Service Details
          </Typography>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Type of Service</InputLabel>
            <Select
              name="typeOfService"
              value={serviceDetails.typeOfService}
              onChange={handleServiceDetailsChange}
            >
              <MenuItem value="Pruning">Pruning</MenuItem>
              <MenuItem value="Cutting">Cutting</MenuItem>
              <MenuItem value="Trimming">Trimming</MenuItem>
              <MenuItem value="Stump Removal">Stump Removal</MenuItem>
            </Select>
          </FormControl>
          {/* <DatePicker
            label="Preferred Date"
            value={serviceDetails.preferredDate}
            onChange={(date) => setServiceDetails({ ...serviceDetails, preferredDate: date })}
            renderInput={(params) => <TextField {...params} fullWidth sx={{ mb: 2 }} />}
          /> */}
          <TextField
            label="Reason for Service"
            name="reasonForService"
            fullWidth
            value={serviceDetails.reasonForService}
            onChange={handleServiceDetailsChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Additional Requests or Comments"
            name="additionalRequests"
            multiline
            rows={4}
            fullWidth
            value={serviceDetails.additionalRequests}
            onChange={handleServiceDetailsChange}
            sx={{ mb: 2 }}
          />
        </Box>

        {/* Legal Compliance */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Legal Compliance
          </Typography>
          <FormControlLabel
            control={<Checkbox name="permissionStatus" checked={legalCompliance.permissionStatus} onChange={handleLegalComplianceChange} />}
            label="Permission Status"
          />
          <TextField
            label="Environmental Impact"
            name="environmentalImpact"
            fullWidth
            value={legalCompliance.environmentalImpact}
            onChange={(e) => setLegalCompliance({ ...legalCompliance, environmentalImpact: e.target.value })}
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <input
              accept="application/pdf"
              style={{ display: 'none' }}
              id="permissionDocument"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="permissionDocument">
              <Button variant="contained" component="span" startIcon={<UploadIcon />}>
                Upload Permission Document
              </Button>
            </label>
            <input
              accept="application/pdf"
              style={{ display: 'none' }}
              id="landOwnershipProof"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="landOwnershipProof">
              <Button variant="contained" component="span" startIcon={<UploadIcon />}>
                Upload Land Ownership Proof
              </Button>
            </label>
          </Box>
        </Box>

        {/* Pricing and Payment */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Pricing and Payment
          </Typography>
          <TextField
            label="Estimated Cost"
            name="estimatedCost"
            type="number"
            fullWidth
            value={pricingAndPayment.estimatedCost}
            onChange={(e) => setPricingAndPayment({ ...pricingAndPayment, estimatedCost: e.target.value })}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Payment Method</InputLabel>
            <Select
              name="paymentMethod"
              value={pricingAndPayment.paymentMethod}
              onChange={(e) => setPricingAndPayment({ ...pricingAndPayment, paymentMethod: e.target.value })}
            >
              <MenuItem value="Cash">Cash</MenuItem>
              <MenuItem value="Online Payment">Online Payment</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
          Submit
        </Button>
      </form>
    </Box>
  );
}

export default RequestForm;
