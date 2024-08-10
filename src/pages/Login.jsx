import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Copyright(props) {
  

  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Tree Survey
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

function Login() {
  const navigate = useNavigate();  // Initialize useNavigate
  const [error, setError] = React.useState('');  // State for error messages
  const [userData, setUserData] = React.useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    console.log(email, password)
  
    // Send data as JSON
    axios.post(`http://192.168.29.245:8085/survey/api/login?username=${email}&password=${password}`, 
      { email, password },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
    .then((response) => {
      setUserData(response.data);  // Store user data
      localStorage.setItem('userdata', JSON.stringify(response.data));  // Store user data in local storage
      console.log(response.data);
      navigate('/');  // Redirect to dashboard
    })
    .catch((error) => {
      // Display error message if login fails
      if (error.response && error.response.data) {
        setError(error.response.data.message || 'Login failed. Please check your credentials.');  // Adjust based on the server's response format
      } else {
        setError('An error occurred. Please try again.');
      }
    });
  };

  React.useEffect(()=> {
    if(userData){
      console.log(userData)
    }
   
  }, [userData])


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          backgroundColor: '#c8edbe', // Background color
          backgroundImage: 'url(https://source.unsplash.com/random)', // Optional background image
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: { xs: 2, sm: 3 }, // Responsive padding
        }}
      >
        <Container
          component="main"
          maxWidth="xs"
          sx={{
            bgcolor: 'white',
            borderRadius: 2,
            boxShadow: 3,
            p: { xs: 2, sm: 3 }, // Responsive padding
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            {error && <Typography color={error}>{error}</Typography>}
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Container>
        <Copyright sx={{ mt: 8 }} />
      </Box>
    </ThemeProvider>
  );
}

export default Login;
