"use client";
import { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Modal, TextField,
} from '@mui/material';
import { updateFrequentAddress } from '../../api/firebase/functions/upload';
import { Button } from '@mantine/core';
import { PlacesAutocomplete } from '@/components/Index';

export default function FrequentAddresses({ addresses }) {
  const [modifiedAddresses, setModifiedAddresses] = useState(addresses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedAddress, setEditedAddress] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedAddressValue, setEditedAddressValue] = useState('');
  const [editedIndex, setEditedIndex] = useState(null);
  console.log(addresses)

  const handleModify = (index) => {
    const addressToModify = { ...modifiedAddresses[index] };
    setEditedAddress(addressToModify);
    setEditedName(addressToModify.contact);
    setEditedAddressValue(addressToModify.label);
    setEditedIndex(index);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (editedAddress && editedIndex !== null) {
      const updatedAddresses = [...modifiedAddresses];

      if (editedIndex >= 0 && editedIndex < updatedAddresses.length) {
        updatedAddresses[editedIndex] = {
          ...editedAddress,
          contact: editedName,
          address: editedAddressValue.label,
          coordinates: editedAddressValue.coordinates
        };
        setModifiedAddresses(updatedAddresses);
        updateFrequentAddress(updatedAddresses);
      }
    }
    setIsModalOpen(false);
  };

  const handleDelete = (index) => {
    const updatedAddresses = [...modifiedAddresses];
    updatedAddresses.splice(index, 1);
    setModifiedAddresses(updatedAddresses);
    updateFrequentAddress(updatedAddresses);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Modify</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {modifiedAddresses && modifiedAddresses.map((row, index) => (
              <TableRow key={index + 1}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.contact}</TableCell>
                <TableCell>{row.address}</TableCell>
                <TableCell>
                  <Button variant="light" color="indigo" onClick={() => handleModify(index)}>
                    Modify
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant="light" color="pink" onClick={() => handleDelete(index)}>
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
          <PlacesAutocomplete onLocationSelect={(selectedLocation) => setEditedAddressValue(selectedLocation)} />
          <TextField label="Name" fullWidth value={editedName} onChange={(e) => setEditedName(e.target.value)} />

          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </div>
      </Modal>
    </div>
  );
}
