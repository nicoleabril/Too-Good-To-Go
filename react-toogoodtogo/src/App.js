import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import "./assets/styles/App.css";
import Cliente from "./pages/Cliente"
import Restaurante from "./pages/Restaurante";
import Bienvenida from "./pages/Bienvenida"
import CrudProducto from "./pages/crudProducto";
import CrudOferta from "./pages/crudOferta";
import AddProduct from "./pages/AddProduct";
import Register from "./pages/Register";
import RegistroCliente from "./pages/registroCliente";
import RegistroNegocio from "./pages/registroNegocio";
import NegocioPage from "./pages/InicioNegocio";
import RegistroCategoria from "./pages/crudCategoria";
import AddCategoria from "./pages/AddCategoria";
import EditProduct from "./pages/EditProduct";
import EditCategoria from "./pages/EditCategoria";
import AddOferta from "./pages/AddOferta";
import EditOferta from "./pages/EditOferta";
import Negocio from "./pages/Negocio";
import PaginaDeReserva from "./pages/PaginaDeReserva";
import MiPerfil from "./pages/MiPerfil";
import RegistroComentarios from "./pages/crudComentarios";
import ReservacionesRecibidas from "./pages/ReservacionesRecibidas";
import EditComentarios from "./pages/EditComentarios";
import AddComentario from "./pages/AddComentario";
import { CommentsProvider } from './pages/commentsContext'; 
import HistorialReserva from "./pages/HistorialReservas";
import ReservacionesEnProceso from "./pages/ReservacionesEnProceso";
import ReservacionesListas from "./pages/ReservacionesListas";
import ReservacionesHistorial from "./pages/ReservacionesHistorial";
function App() {
  return (
    <div className="App">
      <CommentsProvider>
      <Router>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/Inicio" element={<Cliente />} />  //COLOCADO autenticación
          <Route path="/Inicio-Negocio" element={<NegocioPage />} /> //COLOCADO autenticación
          <Route path="/Negocio" element={<Negocio />} /> //COLOCADO autenticación
          <Route path="/Registro" element={<Register />} />
          <Route path="/Registro-Cliente" element={<RegistroCliente />} />
          <Route path="/Registro-Negocio" element={<RegistroNegocio />} />
          <Route path="/Restaurante" element={<Restaurante />} /> //COLOCADO autenticación
          <Route path="/" element={<Bienvenida />} />
          <Route path="/RegistroOfertas" element={<CrudOferta />} /> //COLOCADO autenticación
          <Route path="/RegistroOfertas/AgregarOferta" element={<AddOferta />} /> //COLOCADO autenticación
          <Route path="/RegistroOfertas/EditarOferta" element={<EditOferta />} /> //COLOCADO autenticación
          <Route path="/RegistroProductos" element={<CrudProducto />} /> //COLOCADO autenticación
          <Route path="/RegistroProductos/AgregarProducto" element={<AddProduct />} /> //COLOCADO autenticación
          <Route path="/RegistroCategoria" element={<RegistroCategoria />} /> //COLOCADO autenticación
          <Route path="/RegistroCategoria/AgregarCategoria" element={<AddCategoria />} /> //COLOCADO autenticación
          <Route path="/RegistroProductos/EditarProducto" element={<EditProduct />} /> //COLOCADO autenticación
          <Route path="/RegistroCategoria/EditarCategoria" element={<EditCategoria />} /> //COLOCADO autenticación
          <Route path="/Reserva" element={<PaginaDeReserva />} /> //COLOCADO autenticación
          <Route path="/MiPerfil" element={<MiPerfil />} /> //COLOCADO autenticación
          <Route path="/RegistroComentarios" element={<RegistroComentarios />} /> //COLOCADO autenticación
          <Route path="/ReservasRecibidas" element={<ReservacionesRecibidas />} /> //COLOCADO autenticación
          <Route path="/ReservasEnProceso" element={<ReservacionesEnProceso />} /> //COLOCADO autenticación
          <Route path="/ReservasListas" element={<ReservacionesListas />} /> //COLOCADO autenticación
          <Route path="/ReservasHistorial" element={<ReservacionesHistorial />} /> //COLOCADO autenticación
          <Route path="/RegistroComentarios/EditarComentarios/:id" element={<EditComentarios />} /> //COLOCADO autenticación
          <Route path="/RegistroComentarios/AgregarComentarios" element={<AddComentario />} /> //COLOCADO autenticación
          <Route path="/HistorialReservas" element={<HistorialReserva />} /> //COLOCADO autenticación
        </Routes>
      </Router>
      </CommentsProvider>
    </div>
  );
}

export default App;


