import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Container, Paper, List, ListItem, ListItemText } from '@mui/material';

const AddContactsPage = () => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const navigate = useNavigate();
  const [requestData, setRequestData] = useState({
    name: '',
    email: '',
    number: '',
    expense: 500,
  });

  const submitButtonHandler = () => {
    // Update requestData with current state values
    const updatedState = {
      ...requestData,
      name,
      email,
      number,
    };
  
    console.log("hello", updatedState);
  
    // Make the API call
    axios.post('http://localhost:3000/', updatedState, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        console.log(response.data);
        // Handle the response as needed
      })
      .catch(error => {
        console.error(error);
        // Handle errors as needed
      });

      setContacts(prevContacts => [...prevContacts, updatedState]);

      // Clear the input fields after adding a contact
      setName('');
      setEmail('');
      setNumber('');
  };

  const goToCreateGroup = () => {
    navigate('/create-group', { state: { contacts } });
  };

  return (
    <div>hello
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h5" component="div" mb={2}>
          Add Contacts
        </Typography>
        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
          mb={2}
        />
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          mb={2}
        />
        <TextField
          fullWidth
          label="Number"
          variant="outlined"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          margin="normal"
          mb={2}
        />

        <Button variant="contained" color="primary" onClick={submitButtonHandler} mb={2}>
          Add Contact
        </Button>

        {/* Display the list of added contacts */}
        {contacts.length > 0 && (
          <List>
            {contacts.map((contact, index) => (
              <ListItem key={index}>
                <ListItemText primary={contact.name} secondary={`${contact.email} | ${contact.number}`} />
              </ListItem>
            ))}
          </List>
        )}

        <Button variant="contained" color="primary" onClick={goToCreateGroup}>
          Create Group
        </Button>
      </Paper>
    </Container>
    </div>
  );
};

export default AddContactsPage;
