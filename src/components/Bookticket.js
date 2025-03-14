import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography, Paper, Button, TextField, Alert } from "@mui/material";
import axios from "axios";

const BookTicket = () => {
   const location = useLocation();
   const bus = location.state?.bus;

   const [passengerName, setPassengerName] = useState("");
   const [passengerEmail, setPassengerEmail] = useState("");
   const [successMessage, setSuccessMessage] = useState("");
   const [errorMessage, setErrorMessage] = useState("");

   if (!bus) {
      return <Typography variant="h5">No bus selected. Please go back and choose a bus.</Typography>;
   }

   const totalSeats = 30; // Total seats in the bus
   const remainingSeats = parseInt(bus.seat, 10); // Seats left

   // ✅ FIXED: Corrected Seat Number Calculation
   const seatNumber = totalSeats - (remainingSeats - 1); // Ensures seat numbers are correct

   const handleBooking = async () => {
      if (remainingSeats <= 0) {
         setErrorMessage("No seats available!");
         return;
      }

      try {
         const response = await axios.post("http://localhost:8080/api/tickets/book", null, {
            params: {
               busId: bus.id, // Sending bus ID instead of name
               passengerName,
               passengerEmail,
               seatNumber // ✅ Seat number is now correctly assigned
            }
         });

         setSuccessMessage(`Ticket booked successfully! Ticket ID: ${response.data.ticketId}, Seat No: ${seatNumber}`);
         setErrorMessage(""); // Clear errors
      } catch (error) {
         setErrorMessage("Error booking ticket. Please try again.");
         setSuccessMessage(""); // Clear success message
      }
   };

   return (
      <Box sx={{ p: 4 }}>
         <Paper sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>Confirm Booking</Typography>
            <Typography variant="h6"><strong>Bus Name:</strong> {bus.name}</Typography>
            <Typography><strong>From:</strong> {bus.fromlocation}</Typography>
            <Typography><strong>To:</strong> {bus.tolocation}</Typography>
            <Typography><strong>Price:</strong> ₹{bus.price}</Typography>
            <Typography><strong>Remaining Seats:</strong> {remainingSeats}</Typography>

            <TextField
               label="Passenger Name"
               variant="outlined"
               fullWidth
               sx={{ mt: 2 }}
               value={passengerName}
               onChange={(e) => setPassengerName(e.target.value)}
            />
            <TextField
               label="Passenger Email"
               variant="outlined"
               fullWidth
               sx={{ mt: 2 }}
               value={passengerEmail}
               onChange={(e) => setPassengerEmail(e.target.value)}
            />

            {successMessage && <Alert severity="success" sx={{ mt: 2 }}>{successMessage}</Alert>}
            {errorMessage && <Alert severity="error" sx={{ mt: 2 }}>{errorMessage}</Alert>}

            <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleBooking}>
               Confirm Booking
            </Button>
         </Paper>
      </Box>
   );
};

export default BookTicket;
