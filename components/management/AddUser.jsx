import React from "react";
import { Box, Button, Container, Grid, TextField, Select, MenuItem } from "@mui/material";
import { signUpWithEmail } from "@/api/firebase/functions/auth";

export default function AddUser() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const { firstName, lastName, email, password, role } =
      Object.fromEntries(data);
    const userData = { firstName, lastName, email, password, role: role };
    try {
      // Assuming signUpWithEmail is defined somewhere
      await signUpWithEmail(email, password, userData);
      console.log(userData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <Select
                label="Role"
                id="role"
                name="role"
                fullWidth
                defaultValue="user"
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="business">Business</MenuItem>
                <MenuItem value="user">User</MenuItem>
              </Select>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Add User
          </Button>
        </Box>
      </Container>
    </>
  );
}
