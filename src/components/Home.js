import React from "react";
import { Container, Typography, Grid, Card, CardContent } from "@mui/material";
import bus1 from "../Img/bus1.png";
import bus2 from "../Img/bus2.png";
import bus3 from "../Img/bus3.png";

export default function Home() {
  return (
    <div
      style={{
        backgroundImage: "url('https://source.unsplash.com/1600x900/?bus')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        color: "white",
        textAlign: "center",
        paddingTop: "50px",
      }}
    >
      {/* Welcome Section */}
      <Container>
        <Typography variant="h3" gutterBottom>
          Welcome to Bus Ticket Management System
        </Typography>
        <Typography variant="h6">
          Book your tickets easily, track your journey, and enjoy a seamless experience.
        </Typography>

        {/* Static Bus Images in a Row */}
        <Grid container spacing={3} justifyContent="center" sx={{ mt: 3 }}>
          <Grid item xs={12} sm={4}>
            <img src={bus1} alt="Bus 1" style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "10px" }} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <img src={bus2} alt="Bus 2" style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "10px" }} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <img src={bus3} alt="Bus 3" style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "10px" }} />
          </Grid>
        </Grid>

        {/* Features Section */}
        <Typography variant="h4" sx={{ mt: 5, mb: 3 }}>
          Our Features
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {[
            { title: "Easy Ticket Booking", desc: "Book bus tickets hassle-free with just a few clicks." },
            { title: "Live Bus Tracking", desc: "Track your bus in real-time and plan your journey better." },
            { title: "Secure Payments", desc: "Multiple payment options for a safe and secure transaction." },
            { title: "24/7 Support", desc: "Customer support available anytime for your assistance." },
          ].map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ bgcolor: "rgba(255, 255, 255, 0.8)", color: "black" }}>
                <CardContent>
                  <Typography variant="h6">{feature.title}</Typography>
                  <Typography variant="body2">{feature.desc}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
