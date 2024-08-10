import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker, Autocomplete } from '@react-google-maps/api';
import { TextField, Box, Typography } from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import env from "react-dotenv";

const libraries = ['places'];

const MapComponent = ({ onLocationSelect }) => {
  const [selected, setSelected] = useState(null);
  const [address, setAddress] = useState('');
  const [autocomplete, setAutocomplete] = useState(null);
  const [center, setCenter] = useState({ lat: 20.5937, lng: -78.9629 });
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: env.GOOGLE_MAP_API, // Replace with your actual API key
    libraries,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCenter({ lat: latitude, lng: longitude });
        },
        () => {
          console.log('Unable to retrieve your location');
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }, []);

  const onPlaceChanged = useCallback(() => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setSelected(location);
        setAddress(place.formatted_address);
        onLocationSelect(place.formatted_address); // Pass the selected address to parent component
      }
    }
  }, [autocomplete, onLocationSelect]);

  const handleMapClick = (event) => {
    const latLng = event.latLng.toJSON();
    setSelected(latLng);

    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latLng.lat},${latLng.lng}&key=AIzaSyDssbhtl1oAlKfV7hqwGX1Ls_5Nw7Nvg5k`)
      .then(response => response.json())
      .then(data => {
        if (data.results && data.results[0]) {
          const address = data.results[0].formatted_address;
          setAddress(address);
          onLocationSelect(address); // Pass the address to parent component
        }
      });
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <Box sx={{ position: 'relative' }}>
      <Autocomplete
        onLoad={setAutocomplete}
        onPlaceChanged={onPlaceChanged}
      >
        <TextField
          id="search-box"
          type="text"
          placeholder="Search for a place"
          variant="outlined"
          fullWidth
          InputProps={{
            endAdornment: <MapIcon />,
          }}
        />
      </Autocomplete>
      <GoogleMap
        zoom={10}
        center={selected || center}
        mapContainerStyle={{ height: '400px', width: '100%' }}
        onClick={handleMapClick}
      >
        {selected && <Marker position={selected} />}
      </GoogleMap>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body1">Selected Location:</Typography>
        <TextField
          value={address}
          fullWidth
          InputProps={{
            readOnly: true,
          }}
        />
      </Box>
    </Box>
  );
};

export default MapComponent;




