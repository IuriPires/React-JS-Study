import React, { Component } from 'react';
import Routes from './routes';
import './App.css';
// import api from './components/services/api';
import Header from './components/header/header';
import Main from './pages/main/index';

const App = () => (
 <div className="App">
    <Header />
    <Routes />
    
 </div>
  
);
export default App;
