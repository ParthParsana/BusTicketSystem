import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
} from "@mui/material";
import axios from "axios";

export default function AddBus() {
  const [buses, setBuses] = useState([]);
  const [busData, setBusData] = useState({
    name: "",
    fromlocation: "",
    tolocation: "",
    seat: "",
    price: "",
    journeyDate: "",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchBuses();
  }, []);

  // Fetch all buses
  const fetchBuses = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/buses/all");
      setBuses(response.data);
    } catch (error) {
      console.error("Error fetching buses:", error);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    setBusData({ ...busData, [e.target.name]: e.target.value });
  };

  // Handle Add/Update bus
  const handleSubmit = async () => {
    try {
      if (editId) {
        // Update bus
        await axios.put(`http://localhost:8080/api/buses/update/${editId}`, busData);
      } else {
        // Add new bus
        await axios.post("http://localhost:8080/api/buses/add", busData);
      }
      setBusData({ name: "", fromlocation: "", tolocation: "", seat: "", price: "", journeyDate: "" });
      setEditId(null);
      fetchBuses();
    } catch (error) {
      console.error("Error saving bus:", error);
    }
  };

  // Handle Edit
  const handleEdit = (bus) => {
    setBusData(bus);
    setEditId(bus.id);
  };

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/buses/delete/${id}`);
      fetchBuses();
    } catch (error) {
      console.error("Error deleting bus:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" align="center" sx={{ my: 2 }}>
        Bus Management
      </Typography>

      {/* Input Form - 2x3 Grid */}
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField label="Name" name="name" value={busData.name} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField label="From" name="fromlocation" value={busData.fromlocation} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField label="To" name="tolocation" value={busData.tolocation} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Seat" name="seat" value={busData.seat} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Price" name="price" type="number" value={busData.price} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Journey Date"
            name="journeyDate"
            type="date"
            value={busData.journeyDate}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
      </Grid>

      {/* Buttons */}
      <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ my: 2, mx: 1 }}>
        {editId ? "Update" : "Add"} Bus
      </Button>

      {/* Bus List Table */}
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>From</TableCell>
              <TableCell>To</TableCell>
              <TableCell>Seat</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Journey-Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {buses.map((bus) => (
              <TableRow key={bus.id}>
                <TableCell>{bus.name}</TableCell>
                <TableCell>{bus.fromlocation}</TableCell>
                <TableCell>{bus.tolocation}</TableCell>
                <TableCell>{bus.seat}</TableCell>
                <TableCell>{bus.price}</TableCell>
                <TableCell>
                  {bus.journeyDate
                    ? new Date(bus.journeyDate).toLocaleDateString("en-GB")
                    : ""}
                </TableCell>
                <TableCell>
                  <Button variant="contained" color="secondary" size="small" onClick={() => handleEdit(bus)} sx={{ mr: 1 }}>
                    Edit
                  </Button>
                  <Button variant="contained" color="error" size="small" onClick={() => handleDelete(bus.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
