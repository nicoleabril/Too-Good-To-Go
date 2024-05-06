import React from "react";
import "../styles/crud-product.css";
//import actualizar from "../images/actualizar.png";
//import borrar from "../images/eliminar.png";
import buscar from "../images/buscar.png";

function CRUDProducts() {
    return (
        <div className="crud-producto-container">
            <div className="crud-producto">
                <div className="BusquedaProducto">
                    <img className="FotoBuscar" src={buscar} alt="Buscar" />
                    <input type="text" className="TextoBusquedaProducto" placeholder="Buscar Producto" />
                </div>
                <button className="botonAgregarProducto">Agregar Producto</button>
            </div>
        </div>
    );
}

export default CRUDProducts;