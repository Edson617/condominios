import React from 'react';
import Navbar from './components/Navbar';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="dashboard">
      <Navbar />
      <div className="dashboard-content">
        <h1>Dashboard</h1>
        <p>Bienvenido al dashboard de admin.</p>
      </div>
    </div>
  );
};

export default App;