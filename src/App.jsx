import { Routes, Route } from "react-router-dom";
import "./App.css";
import "./index.css";
import PainterRoutes from "./routes/PainterRoutes";
import PublicRoute from "./routes/PublicRoute";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<PublicRoute/>} />
        <Route path="/painter/*" element={<PainterRoutes />} />
      </Routes>
    </div>
  );
}
export default App;