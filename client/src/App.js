import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'mdb-ui-kit';
import './index.css';
import { ToastContainer } from 'react-toastify';
import LoginRegistration from './views/LoginRegistration';
import Dashboard from './views/Dashboard';

function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginRegistration/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
        <ToastContainer/>
      </BrowserRouter>
  );
}

export default App;
