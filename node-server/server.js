// Your server file (e.g., server.js)
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

console.log("in server")
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/', async (req, res) => {
  try {
    console.log(req.body, "request bodys");
    const requestData = req.body;

    // Assuming this endpoint is correct and functioning
    const apiResponse = await axios.post('http://127.0.0.1:4567/addUser', requestData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    res.status(200).json({ message: 'Contact added successfully', requestData: apiResponse.data });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/create-group', async (req, res) => {
  try {
    console.log(req.body, "request body in create group");
    const requestData = req.body;

    // Assuming this endpoint is correct and functioning
    const apiResponse = await axios.post('http://127.0.0.1:4567/createGroup', requestData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    res.status(200).json({ message: 'Group created successfully', requestData: apiResponse.data });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/balances', async (req, res) => {
  try {
    // Assuming you have an endpoint in Spark that provides user balances
    const response = await axios.get('http://127.0.0.1:4567/showBalance');
    const balances = response.data;
    console.log("balance data", balances)

    res.status(200).json(balances);
  } catch (error) {
    console.error('Error fetching user balances from Spark:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
