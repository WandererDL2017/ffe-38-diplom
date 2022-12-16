import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import Tickets from './components/Tickets';
import Seats from './components/Seats';
import Passengers from './components/Passengers';
import Paying from './components/Paying';
import Verify from './components/Verify';
import SuccessOrder from './components/SuccessOrder';

import links from './data/links';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path={links.main} element={<HomePage />} />
          <Route exact path={links.tickets} element={<Tickets />} />
          <Route exact path={links.seats} element={<Seats />} />
          <Route exact path={links.passengers} element={<Passengers />} />
          <Route exact path={links.paying} element={<Paying />} />
          <Route exact path={links.verify} element={<Verify />} />
          <Route exact path={links.successOrder} element={<SuccessOrder />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
