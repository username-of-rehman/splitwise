// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddContactsPage from './AddContactsPage';
import CreateGroupPage from './CreateGroupPage';
import BalancesPage from './ShowBalance'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AddContactsPage />} />
        <Route path="/create-group" element={<CreateGroupPage />} />
        <Route path="/balances" element={<BalancesPage/>} />
      </Routes>
    </Router>
  );
};

export default App;
