import React,  { useState } from 'react';
import { Button, TextField, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function OtpPage() {
    const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleOTPSubmit = () => {
    // Validate OTP and log in user
    navigate('/');
  };
  return (
    <Container>
      <Typography variant="h4">Enter OTP</Typography>
      <TextField
        label="OTP"
        variant="outlined"
        fullWidth
        margin="normal"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleOTPSubmit}>
        Submit OTP
      </Button>
    </Container>
  )
}

export default OtpPage