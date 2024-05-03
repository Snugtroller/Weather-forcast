import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes,Route } from 'react-router-dom';
import Weather from './components/weather';
import "./index.css"


function App() {
  return (

    <div className='App'>
      <Weather/>
    </div>
  );
}

export default App;
