"use client";
import { useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Button } from "@mantine/core";

export default function Users({ users }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    const filtered = users.filter((user) =>
      user.email.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  return (
    <div style={{ width: "80%", margin: "2rem auto" }}>
      {/* Styled Search Bar */}
      <TextField
        fullWidth
        variant="outlined"
        label="Search by Email"
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ margin: "1rem 0" }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>All Addresses</TableCell>
              <TableCell>View</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers &&
              filteredUsers.map((row, index) => {
                const { firstName, lastName, email, role, frequentAddresses } =
                  row;
                return (
                  <TableRow key={index + 1}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{role}</TableCell>
                    <TableCell>{`${firstName} ${lastName}`}</TableCell>
                    <TableCell>{email}</TableCell>
                    <TableCell>
                      {frequentAddresses && frequentAddresses.length + 1}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="filled"
                        color="red"
                        onClick={() => alert(row.key)}
                      >
                        Password
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
