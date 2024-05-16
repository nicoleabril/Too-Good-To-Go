import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import "./assets/styles/App.css";
import Cliente from "./pages/Cliente"
import Restaurante from "./pages/Restaurante";
import Bienvenida from "./pages/Bienvenida"
import CrudProducto from "./pages/CrudProducto";
import AddProduct from "./pages/AddProduct";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/Inicio" element={<Cliente />} />
          <Route path="/Restaurante" element={<Restaurante />} />
          <Route path="/" element={<Bienvenida />} />
          <Route path="/RegistroProductos" element={<CrudProducto />} />
          <Route path="/RegistroProductos/agregarProducto" element={<AddProduct />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;


