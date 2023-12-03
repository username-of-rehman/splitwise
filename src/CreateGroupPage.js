// src/CreateGroupPage.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Container, Paper, Checkbox, FormControlLabel } from '@mui/material';
import axios from 'axios';


const CreateGroupPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [groupName, setGroupName] = useState('');
    const [expenseAmount, setExpenseAmount] = useState('');
    const [selectedContacts, setSelectedContacts] = useState([]);
    const [expenseDetails, setExpenseDetails] = useState(null);


    const contacts = location.state?.contacts || [];

    const addExpense = async () => {
        // Check if expense amount is provided
        if (!expenseAmount || isNaN(expenseAmount)) {
            alert('Please enter a valid expense amount.');
            return;
        }
    
        const expense = parseFloat(expenseAmount);
        if (expense <= 0) {
            alert('Expense amount should be greater than zero.');
            return;
        }
    
        // Calculate share for each selected contact
        const sharePerContact = expense / selectedContacts.length;
    
        // Display the result
        const updatedExpenseDetails = {
            groupName,
            selectedContacts,
            expense: expense.toFixed(2),
            shares: selectedContacts.map((contact) => `${contact}: ${sharePerContact.toFixed(2)}`),
        };
    
        setExpenseDetails(updatedExpenseDetails);
    
        try {
            const response = await axios.post('http://localhost:3000/create-group', updatedExpenseDetails, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            console.log(response.data);
            // Handle the response as needed
        } catch (error) {
            console.error(error);
            // Handle errors as needed
        }
    };
    

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                <Typography variant="h5" component="div" mb={2}>
                    Create Group and Add Expense
                </Typography>
                <TextField
                    fullWidth
                    label="Group Name"
                    variant="outlined"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    margin="normal"
                    mb={2}
                />

                <TextField
                    fullWidth
                    label="Expense Amount"
                    variant="outlined"
                    type="number"
                    value={expenseAmount}
                    onChange={(e) => setExpenseAmount(e.target.value)}
                    margin="normal"
                    mb={2}
                />

                <Typography variant="h6" component="div" mb={2}>
                    Select Contacts:
                </Typography>
                {contacts.map((contact, index) => (
                    <FormControlLabel
                        key={index}
                        control={
                            <Checkbox
                                checked={selectedContacts.includes(contact.name)}
                                onChange={() => {
                                    setSelectedContacts((prev) =>
                                        prev.includes(contact.name)
                                            ? prev.filter((name) => name !== contact.name)
                                            : [...prev, contact.name]
                                    );
                                }}
                            />
                        }
                        label={contact.name}
                    />
                ))}

                <Button variant="contained" color="primary" onClick={addExpense} style={{ marginTop: '20px' }}>
                    Add Expense
                </Button>

                {/* Display expense details */}
                {expenseDetails && (
                    <div style={{ marginTop: '20px' }}>
                        <Typography variant="h6" component="div" mb={2}>
                            Expense Details:
                        </Typography>
                        <p>Group: {expenseDetails.groupName}</p>
                        <p>Added Users: {expenseDetails.selectedContacts.join(', ')}</p>
                        <p>Expense: {expenseDetails.expense}</p>
                        <p>Shares:</p>
                        <ul>
                            {expenseDetails.shares.map((share, index) => (
                                <li key={index}>{share}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </Paper>
        </Container>
    );
};

export default CreateGroupPage;
