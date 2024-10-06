
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Post/Home';  // Scalable post-related components
import Login from './components/Auth/Login';  // Auth
import Registration from './components/Auth/Registration';  // Auth
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
