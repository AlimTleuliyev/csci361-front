// src/App.js
import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage.js';
import './App.css';
import Driver from './Driver.js';


function App() {
  return (
    <Router>

      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<MainContent />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/contact" element={<Driver />} />
        </Routes>
      </div>
    </Router>
  );
}

function Navbar() {
  return (
    <nav>
      <ul>
        <li><a href="services">Services</a></li>
        <li><a href="about">About Us</a></li>
        <li><a href="contact">Contact</a></li>
        <li><a href="author">Author</a></li>
        <li><a href="login">Login</a></li>
      </ul>
    </nav>
  );
}

function MainContent() {
  return (
    <div>
      <h1>Welcome to Vehicle Management System</h1>
      <AppointmentForm />
      <SearchForm />
    </div>
  );
}

function AppointmentForm() {
  return (
    <div>
      <h2>Make an Appointment</h2>
      <form>
        <label htmlFor="to">To:</label>
        <input type="text" id="to" name="to" required />

        <label htmlFor="from">From:</label>
        <input type="text" id="from" name="from" required />

        <label htmlFor="time">Time:</label>
        <input type="time" id="time" name="time" required />

        <label htmlFor="capacity">Capacity:</label>
        <input type="number" id="capacity" name="capacity" required />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

function SearchForm() {
  // Implement your search form here
  return (
    <div>
      <h2>Search</h2>
      {/* Your search form elements go here */}
    </div>
  );
}

export default App;