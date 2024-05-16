import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import "./assets/styles/App.css";
import Cliente from "./pages/Cliente"
import Restaurante from "./pages/Restaurante";
import Bienvenida from "./pages/Bienvenida"
<<<<<<< Updated upstream
import CrudProducto from "./pages/CrudProducto";
import AddProduct from "./pages/AddProduct";

=======
import CrudProducto from "./pages/crudProducto";
import Register from "./pages/Register";
import RegistroCliente from "./pages/registroCliente";
import RegistroNegocio from "./pages/registroNegocio";
>>>>>>> Stashed changes
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/Inicio" element={<Cliente />} />
          <Route path="/Registro" element={<Register />} />
          <Route path="/Registro-Cliente" element={<RegistroCliente />} />
          <Route path="/Registro-Negocio" element={<RegistroNegocio />} />
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


