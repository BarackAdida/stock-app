import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Stocks from './pages/Stocks'
import Layout from './components/Layout';

const App = () => {
  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout/>}>
              <Route path="/" element={<Home />} />
              <Route path="/stocks/:symbol" element={<Stocks />} />
            </Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;