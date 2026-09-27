import "./App.css";
import "./index.css";
import AppRoutes from "./routes/AppRoutes";

function App() {
  console.log("BACKEND URL:", import.meta.env.VITE_BACKEND_URL);
  return (
    <div className="App">
      {/* this is global component for implementing the protected route */}
      <AppRoutes />
    </div>
  );
}

export default App;