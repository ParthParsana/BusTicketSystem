import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // ✅ Import useNavigate
import { Box, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, MenuItem } from '@mui/material';
import axios from 'axios';

const cities = [
   "Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Junagadh", "Gandhinagar", "Gandhidham", "Nadiad",
   "Bharuch", "Anand", "Morbi", "Mehsana", "Bhuj", "Porbandar", "Navsari", "Valsad", "Vapi", "Amreli"
];

const Book = () => {
   const [from, setFrom] = useState('');
   const [to, setTo] = useState('');
   const [date, setDate] = useState('');
   const [buses, setBuses] = useState([]);
   const navigate = useNavigate();  // ✅ Initialize useNavigate

   const handleSearch = async () => {
      if (!from || !to || !date) {
         alert("Please select From, To, and Date before searching.");
         return;
      }

      try {
         const response = await axios.get(`http://localhost:8080/api/buses/search`, {
            params: { from, to, date }
         });
         setBuses(response.data);
      } catch (error) {
         console.error("Error fetching bus data:", error);
         alert("Failed to fetch bus data. Please try again.");
      }
   };

   const handleBook = (bus) => {
      navigate('/bookticket', { state: { bus } });  // ✅ Navigate with bus details
   };

   return (
      <Box sx={{ p: 4 }}>
         <Typography variant="h4" gutterBottom>
            Book Bus Tickets
         </Typography>
         <Typography>Enter your journey details to search for available buses.</Typography>

         {/* Search Fields */}
         <Box sx={{ mt: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <TextField select label="From" variant="outlined" fullWidth value={from} onChange={(e) => setFrom(e.target.value)}>
               {cities.map(city => <MenuItem key={city} value={city}>{city}</MenuItem>)}
            </TextField>

            <TextField select label="To" variant="outlined" fullWidth value={to} onChange={(e) => setTo(e.target.value)}>
               {cities.map(city => <MenuItem key={city} value={city}>{city}</MenuItem>)}
            </TextField>

            <TextField label="Date" type="date" variant="outlined" fullWidth InputLabelProps={{ shrink: true }} value={date} onChange={(e) => setDate(e.target.value)} />
            <Button variant="contained" onClick={handleSearch}>Search</Button>
         </Box>

         {/* Bus List Table */}
         {buses.length > 0 && (
            <TableContainer component={Paper} sx={{ mt: 3 }}>
               <Table>
                  <TableHead>
                     <TableRow>
                        <TableCell>Bus Name</TableCell>
                        <TableCell>From</TableCell>
                        <TableCell>To</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Action</TableCell>
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {buses.map(bus => (
                        <TableRow key={bus.id}>
                           <TableCell>{bus.name}</TableCell>
                           <TableCell>{bus.fromlocation}</TableCell>
                           <TableCell>{bus.tolocation}</TableCell>
                           <TableCell>₹{bus.price}</TableCell>
                           <TableCell>
                              <Button variant="contained" color="primary" onClick={() => handleBook(bus)}>Book</Button>  {/* ✅ Book Button */}
                           </TableCell>
                        </TableRow>
                     ))}
                  </TableBody>
               </Table>
            </TableContainer>
         )}
      </Box>
   );
};

export default Book;
