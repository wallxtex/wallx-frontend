import { Routes, Route } from "react-router-dom";
import "./App.css";
import "./index.css";
import PainterRoutes from "./routes/PainterRoutes";
import PublicRoute from "./routes/PublicRoute";
import DealerRoutes from "./routes/DealerRoute";

function App() {
  return (
    // painter
    <div className="App">
      <Routes>
        <Route path="/*" element={<PublicRoute />} />
        <Route path="/painter/*" element={<PainterRoutes />} />
        <Route path="/dealer/*" element={<DealerRoutes />} />
      </Routes>
    </div>
  );
}
export default App;