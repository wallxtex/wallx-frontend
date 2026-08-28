import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './common/Navbar';
import PainterSignup from './pages/auth/PainterSignup';
import PainterVerification from './pages/auth/PainterVerification';
import DealerSignup from './pages/auth/DealerSignup';
import DealerVerification from './pages/auth/DealerVerification';
import PainterPage from './pages/painter/PainterPage';
import DealersPage from './pages/dealers/DealersPage';
import './App.css';
import "./index.css";
import HomePage from "./components/pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/painters" element={<PainterPage />} />
          <Route path="/dealers" element={<DealersPage />} />
          <Route path="/painter-signup" element={<PainterSignup />} />
          <Route path="/painter-verification" element={<PainterVerification />} />
          <Route path="/dealer-signup" element={<DealerSignup />} />
          <Route path="/dealer-verification" element={<DealerVerification />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
