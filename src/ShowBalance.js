// src/components/BalancesPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BalancesPage = () => {
  const [balances, setBalances] = useState([]);

  useEffect(() => {
    // Fetch balances from the server
    const fetchBalances = async () => {
      try {
        const response = await axios.get('http://localhost:3000/balances');
        console.log("userdata",response.data[0].balance)
        setBalances(response.data);
      } catch (error) {
        console.error('Error fetching balances:', error);
      }
    };

    // Call the fetchBalances function
    fetchBalances();
  }, []); // The empty dependency array ensures this effect runs once after initial render

  return (
    <div>
      <h1>User Balances</h1>
      <ul>
        {balances.map((balance) => (
          <li key={balance.userId}>
            {balance.userId}: ${balance.balance ? balance.balance.toFixed(2) : 'N/A'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BalancesPage;
