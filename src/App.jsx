import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./common/Navbar";
import HeroSectionVideo from "./components/HeroSectionVideo";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HeroSectionVideo />} />
          {/* Add more routes here as needed */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
