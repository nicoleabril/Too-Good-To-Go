import React from "react";
import "../styles/crud-categoria.css";
import buscar from "../images/buscar.png";
import DataTable from "react-data-table-component";
import { BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import donaPremiumLogo from "../images/donaPremiumLogo.png";
import bebidasLogo from "../images/bebidasLogo.png";
import combosLogo from "../images/combosLogo.png";
import ofertasLogo from "../images/ofertasLogo.png";
import sanduchesLogo from "../images/sanduchesLogo.png";

function CRUDCategoria() {
    const columns = [
        {
            name: "Id",
            selector : row => row.id,
            sortable: true
        },
        {
            name: "Categoría",
            selector : row => row.categoria,
            sortable: true
        },
        {
            name: "Estado",
            selector : row => row.estado,
            sortable: true
        },
        {
            name: "Acciones",
            cell: row => (
                <div className="botonesCrudCategoria">
                    <button>
                        <FiEdit size={25}/>
                    </button>
                    <button>
                        <BsTrash size={25}/>
                    </button>
                </div>
            )
        },
    ];
    const data = [
        {
            id: 1,
            categoria: "Ofertas",
            estado: "Activo",
        },
        {
            id: 2,
            categoria: "Combos",
            estado: "Activo",
        },
        {
            id: 3,
            categoria: "Bebidas",
            estado: "Activo",
        },
        {
            id: 4,
            categoria: "Sánduches",
            estado: "Activo",
        },
        {
            id: 5,
            categoria: "Donas Premium",
            estado: "Inactivo",
        }
    ];
    return (
        <body className="container-crud-categoria">
            <main className="crud-categoria-container">
                <div className="crud-categoria">
                    <div className="BusquedaCategoria">
                        <img className="FotoBuscarCategoria" src={buscar} alt="Buscar" />
                        <input type="text" className="TextoBusquedaCategoria" placeholder="Buscar Categoría" />
                    </div>
                    <React.Fragment>
                        <a href="/registroProductos/agregarProducto"><button className='botonAgregarCategoria'>Agregar Categoría</button></a>
                    </React.Fragment>
                </div>
                <div className="tabla-categoria-container">
                    <DataTable
                        columns={columns} 
                        data={data} 
                        />
                </div>
            </main>
            <footer className="contenedorFooter-categoria">
                <div className="textoFooter2">
                Copyright © 2024 Too Good To Go International. All Rights Reserved.
                </div>
            </footer>
            <div className="waves-background2-categoria"></div>
        </body>
    );
}

export default CRUDCategoria;