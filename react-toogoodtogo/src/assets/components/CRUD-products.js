import React from "react";
import "../styles/crud-product.css";
import buscar from "../images/buscar.png";
import DataTable from "react-data-table-component";
import { BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";

function CRUDProducts() {
    const columns = [
        {
            name: "Id",
            selector : row => row.id,
            sortable: true
        },
        {
            name: "Producto",
            selector : row => row.producto,
            sortable: true
        },
        {
            name: "Categoría",
            selector : row => row.categoria,
            sortable: true
        },
        {
            name: "Precio",
            selector : row => row.precio,
            sortable: true
        },
        {
            name: "Acciones",
            cell: row => (
                <div className="botonesCrud">
                    <button>
                        <FiEdit size={25}/>
                    </button>
                    <button>
                        <BsTrash size={25}/>
                    </button>
                </div>
            )
        }
    ];
    const data = [
        {
            id: 1,
            producto: "Combo #1",
            categoria: "Combos",
            precio: "$25,99",
        },
        {
            id: 2,
            producto: "Combo #2",
            categoria: "Combos",
            precio: "$19,99",
        },
        {
            id: 3,
            producto: "Combo #3",
            categoria: "Combos",
            precio: "$20,99",
        },
        {
            id: 4,
            producto: "Té Helado Grande",
            categoria: "Bebidas",
            precio: "$1,50",
        },
        {
            id: 5,
            producto: "Iced Latte",
            categoria: "Bebidas",
            precio: "$3,50",
        },
        {
            id: 6,
            producto: "Chocolate Frío",
            categoria: "Bebidas",
            precio: "$3,75",
        }
    ];
    return (
        <div className="crud-producto-container">
            <div className="crud-producto">
                <div className="BusquedaProducto">
                    <img className="FotoBuscar" src={buscar} alt="Buscar" />
                    <input type="text" className="TextoBusquedaProducto" placeholder="Buscar Producto" />
                </div>
                <button className="botonAgregarProducto">Agregar Producto</button>
            </div>
            <div className="tabla-productos-container">
                <DataTable
                    columns={columns} 
                    data={data} 
                    />
            </div>
        </div>
    );
}

export default CRUDProducts;
