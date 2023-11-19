"use client";
import { useEffect, useState } from "react";
import { TextField, InputAdornment, MenuItem, Select } from "@mui/material";
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
import { updateDoc } from "@/api/firebase/functions/upload";

const roleOptions = [
  { value: "admin", label: "Admin" },
  { value: "business", label: "business" },
  { value: "user", label: "User" },
];

export default function Users({ users }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    const filtered = users.filter((user) =>
      user.email.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleStatusChange = async (event, index) => {
    const selectedRole = event.target.value;
    const updatedUsers = [...filteredUsers];
    const changedUser = updatedUsers[index];
    changedUser.role = selectedRole;
    setFilteredUsers(updatedUsers);
    await updateDoc("users", changedUser.email, changedUser);
    console.log("User Info:", changedUser);
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
              <TableCell>Full Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>All Addresses</TableCell>
              <TableCell>View</TableCell>
              <TableCell>Role</TableCell>
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
                    <TableCell>
                      <Select
                        value={role}
                        onChange={(event) => handleStatusChange(event, index)}
                        style={{
                          width: "100%",
                          height: 36,
                          backgroundColor: "#339af0",
                          borderRadius: 4,
                          color: "#fff",
                        }}
                      >
                        {roleOptions.map((option) => (
                          <MenuItem
                            key={option.value}
                            style={{
                              backgroundColor: "#339af0",
                              padding: 15,
                              color: "#fff",
                              borderRadius: 10,
                              margin: 5,
                            }}
                            value={option.value}
                          >
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
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
