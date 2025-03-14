import React, { useState } from "react";
import { TextField, Button, Typography, Paper, Alert, Box, CircularProgress } from "@mui/material";
import axios from "axios";

export default function TicketStatus() {
  const [ticketId, setTicketId] = useState("");
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const checkStatus = async () => {
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await axios.get(`http://localhost:8080/api/tickets/status/${ticketId}`);
      setTicket(response.data);
    } catch (error) {
      setTicket(null);
      setErrorMessage("❌ Ticket not found. Please check your Ticket ID.");
    }

    setLoading(false);
  };

  const cancelTicket = async () => {
    if (!ticket) {
      setErrorMessage("❌ Please check ticket status first.");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await axios.delete(`http://localhost:8080/api/tickets/cancel/${ticketId}`);
      setSuccessMessage("✅ Your ticket has been successfully canceled.");
      setTicket(null);
    } catch (error) {
      setErrorMessage("❌ Error canceling ticket. Please try again.");
    }

    setLoading(false);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
      <Paper sx={{ p: 4, width: 500, backgroundColor: "#ffffff", boxShadow: 3 }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ color: "#1976d2", fontWeight: "bold" }}>
          🎫 Check & Cancel Ticket
        </Typography>

        {/* ✅ Ticket ID Input - Always Visible Text */}
        <TextField
          label="Enter Ticket ID"
          variant="outlined"
          fullWidth
          value={ticketId}
          onChange={(e) => setTicketId(e.target.value)}
          sx={{
            mt: 2,
            input: { color: "#1976d2" }, // ✅ Always Blue Text
            label: { color: "#1976d2" }, // ✅ Always Blue Label
            "& label.Mui-focused": { color: "#0047ab" }, // Darker blue when focused
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#1976d2" }, // ✅ Blue Border
              "&:hover fieldset": { borderColor: "#0047ab" }, // ✅ Darker Blue on Hover
              "&.Mui-focused fieldset": { borderColor: "#0047ab" } // ✅ Darker Blue on Focus
            }
          }}
        />

        <Button variant="contained" color="primary" sx={{ mt: 2, width: "100%" }} onClick={checkStatus}>
          Check Status
        </Button>

        {loading && <CircularProgress sx={{ display: "block", mx: "auto", mt: 2 }} />}

        {errorMessage && <Alert severity="error" sx={{ mt: 2 }}>{errorMessage}</Alert>}
        {successMessage && <Alert severity="success" sx={{ mt: 2 }}>{successMessage}</Alert>}

        {ticket && (
          <Box sx={{ 
            mt: 3, 
            p: 2, 
            bgcolor: "#f0f8ff",
            borderRadius: 2, 
            color: "#1976d2",
            fontSize: "16px",
            border: "2px solid #1976d2"
          }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#0047ab" }}>🎟 Ticket Details</Typography>
            <Typography><strong>Ticket ID:</strong> {ticket.ticketId}</Typography>
            <Typography><strong>Bus Name:</strong> {ticket.busName}</Typography>
            <Typography><strong>Seat Number:</strong> {ticket.seatNumber}</Typography>
            <Typography><strong>Passenger Name:</strong> {ticket.passengerName}</Typography>
            <Typography><strong>Email:</strong> {ticket.passengerEmail}</Typography>
            <Typography><strong>Price:</strong> ₹{ticket.price}</Typography>

            <Button variant="contained" color="error" sx={{ mt: 2, width: "100%" }} onClick={cancelTicket}>
              Cancel Ticket
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
}
