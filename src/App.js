import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import Tickets from './components/Tickets';
import Seats from './components/Seats';
import Passengers from './components/Passengers';
import Paying from './components/Paying';
import Verify from './components/Verify';
import SuccessOrder from './components/SuccessOrder';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/tickets" element={<Tickets />} />
          <Route exact path="/seats" element={<Seats />} />
          <Route exact path="/passengers" element={<Passengers />} />
          <Route exact path="/paying" element={<Paying />} />
          <Route exact path="/verify" element={<Verify />} />
          <Route exact path="/successOrder" element={<SuccessOrder />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
