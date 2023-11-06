"use client"
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Paper, Button, Modal, TextField } from '@mui/material';
import { updateFrequentAddress } from '../../api/firebase/functions/upload'

export default function FrequentAddresses({ addresses }) {
  const [modifiedAddresses, setModifiedAddresses] = React.useState(addresses);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editedAddress, setEditedAddress] = React.useState(null);
  const [editedName, setEditedName] = React.useState('');
  const [editedAddressValue, setEditedAddressValue] = React.useState('');
  const [editedSuburb, setEditedSuburb] = React.useState('');

  const handleModify = (index) => {
    const addressToModify = { ...modifiedAddresses[index] };
    setEditedAddress(addressToModify);
    setEditedName(addressToModify.contact);
    setEditedAddressValue(addressToModify.address);
    setEditedSuburb(addressToModify.suburb);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (editedAddress) {
      const updatedAddresses = [...modifiedAddresses];
      const index = updatedAddresses.findIndex((item) => item.id === editedAddress.id);
      if (index !== -1) {
        updatedAddresses[index] = {
          ...editedAddress,
          contact: editedName,
          address: editedAddressValue,
          suburb: editedSuburb,
        };
        setModifiedAddresses(updatedAddresses);
        updateFrequentAddresses(updatedAddresses); // Pass the updated data to the function
      }
    }
    setIsModalOpen(false);
  };

  const handleDelete = (index) => {
    const updatedAddresses = [...modifiedAddresses];
    updatedAddresses.splice(index, 1);
    setModifiedAddresses(updatedAddresses);
    updateFrequentAddresses(updatedAddresses); // Pass the updated data to the function
  };


  async function updateFrequentAddresses() {
    try {
      const data = { frequentAddresses: modifiedAddresses }
      updateFrequentAddress(data)
      console.log('Data updated successfully');
    } catch (error) {
      console.error(`Error updating data: ${error}`);
    }

  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Suburb</TableCell>
              <TableCell>Actions</TableCell> {/* New column for actions */}
            </TableRow>
          </TableHead>
          <TableBody>
            {modifiedAddresses && modifiedAddresses.map((row, index) => (
              <TableRow key={index + 1}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.contact}</TableCell>
                <TableCell>{row.address}</TableCell>
                <TableCell>{row.suburb}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleModify(index)}
                  >
                    Modify
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 300, backgroundColor: 'white', padding: 16 }}>
          <h2>Edit Address</h2>
          <TextField
            label="Name"
            fullWidth
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
          <TextField
            label="Address"
            fullWidth
            value={editedAddressValue}
            onChange={(e) => setEditedAddressValue(e.target.value)}
          />
          <TextField
            label="Suburb"
            fullWidth
            value={editedSuburb}
            onChange={(e) => setEditedSuburb(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      </Modal>
    </div>
  );
}