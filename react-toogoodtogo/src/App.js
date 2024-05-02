import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import "./assets/styles/App.css";
import Cliente from "./pages/Cliente"
import Restaurante from "./pages/Restaurante";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Inicio" element={<Cliente />} />
          <Route path="/Restaurante" element={<Restaurante />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;


