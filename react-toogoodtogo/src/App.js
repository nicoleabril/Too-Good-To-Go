import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import "./assets/styles/App.css";
import Cliente from "./pages/Cliente"
import Restaurante from "./pages/Restaurante";
import Bienvenida from "./pages/Bienvenida"
import CrudProducto from "./pages/crudProducto";
import AddProduct from "./pages/AddProduct";
import Register from "./pages/Register";
import RegistroCliente from "./pages/registroCliente";
import RegistroNegocio from "./pages/registroNegocio";
import NegocioPage from "./pages/InicioNegocio";
import RegistroCategoria from "./pages/crudCategoria";
import AddCategoria from "./pages/AddCategoria";
import EditProduct from "./pages/EditProduct";
import EditCategoria from "./pages/EditCategoria";
import Negocio from "./pages/Negocio";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/Inicio" element={<Cliente />} />
          <Route path="/Inicio-Negocio" element={<NegocioPage />} />
          <Route path="/Negocio" element={<Negocio />} />
          <Route path="/Registro" element={<Register />} />
          <Route path="/Registro-Cliente" element={<RegistroCliente />} />
          <Route path="/Registro-Negocio" element={<RegistroNegocio />} />
          <Route path="/Restaurante" element={<Restaurante />} />
          <Route path="/" element={<Bienvenida />} />
          <Route path="/RegistroProductos" element={<CrudProducto />} />
          <Route path="/RegistroProductos/AgregarProducto" element={<AddProduct />} />
          <Route path="/RegistroCategoria" element={<RegistroCategoria />} />
          <Route path="/RegistroCategoria/AgregarCategoria" element={<AddCategoria />} />
          <Route path="/RegistroProductos/EditarProducto" element={<EditProduct />} />
          <Route path="/RegistroCategoria/EditarCategoria" element={<EditCategoria />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;


