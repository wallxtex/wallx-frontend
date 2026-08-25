import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './common/Navbar';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <div className="min-h-[2000px] bg-[#fafafa] pt-[40px] text-center">
              <h1 className="text-4xl font-bold">WALLX Luxury Wall Texture Coating</h1>
              <p className="mt-4">Scroll down to see the sticky navbar in action.</p>
            </div>
          } />
          {/* Add more routes here as needed */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
