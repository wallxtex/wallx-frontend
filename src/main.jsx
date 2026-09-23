import { createRoot } from "react-dom/client";
import "./index.css";
import "react-circular-progressbar/dist/styles.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext.jsx";
import { ToastProvider } from "./lib/notify";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
      <AuthProvider>
        <App />
        <ToastProvider />
      </AuthProvider>
    </BrowserRouter>
);
