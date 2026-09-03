import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './common/Navbar';
import PainterSignup from './pages/auth/PainterSignup';
import PainterVerification from './pages/auth/PainterVerification';
import DealerSignup from './pages/auth/DealerSignup';
import DealerVerification from './pages/auth/DealerVerification';
import PainterPage from './pages/painter/PainterPage';
import DealersPage from './pages/dealers/DealersPage';
import ProductsPage from './pages/products/ProductsPage';
import NotFound from './pages/NotFound';
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
          <Route path="/product" element={<ProductsPage />} />
          <Route path="/painter-signup" element={<PainterSignup />} />
          <Route path="/painter-verification" element={<PainterVerification />} />
          <Route path="/dealer-signup" element={<DealerSignup />} />
          <Route path="/dealer-verification" element={<DealerVerification />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
