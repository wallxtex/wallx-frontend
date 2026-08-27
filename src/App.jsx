import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './common/Navbar';
import PainterSignup from './pages/auth/PainterSignup';
import PainterVerification from './pages/auth/PainterVerification';
import DealerSignup from './pages/auth/DealerSignup';
import DealerVerification from './pages/auth/DealerVerification';
import PainterPage from './pages/painter/PainterPage';
import './App.css';
import "./index.css";
import HomePage from "./components/pages/HomePage";

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
          <Route path="/painters" element={<PainterPage />} />
          <Route path="/painter-signup" element={<PainterSignup />} />
          <Route path="/painter-verification" element={<PainterVerification />} />
          <Route path="/dealer-signup" element={<DealerSignup />} />
          <Route path="/dealer-verification" element={<DealerVerification />} />
          {/* Add more routes here as needed */}
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
