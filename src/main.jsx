import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "react-circular-progressbar/dist/styles.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./auth/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <ToastContainer limit={2} position="top-right"/>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
