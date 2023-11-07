"use client"
import { Button } from '@mantine/core';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper
} from '@mui/material';

export default function RecentInvoices({ invoices }) {
    console.log(invoices)
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Time</TableCell>
                        <TableCell>Invoice(Excl)</TableCell>
                        <TableCell>GST</TableCell>
                        <TableCell>Invoice(Incl)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {invoices && invoices.map((row, index) => (
                            <TableRow key={index + 1}>
                                <TableCell>{row.docId}</TableCell>
                                <TableCell>{row.serviceInformation.date}</TableCell>
                                <TableCell>{row.serviceInformation.time}</TableCell>
                                <TableCell>{0.00}</TableCell>
                                <TableCell>{0.00}</TableCell>
                                <TableCell>{0.00}</TableCell>
                                <TableCell>
                                    <Button variant="light" color="cyan" >
                                        View This Entry
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>

    );
}
