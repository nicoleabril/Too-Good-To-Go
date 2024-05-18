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
            name: "Icono",
            cell: row => row.icono,
        },
        {
            name: "Estado",
            selector : row => row.estado,
            sortable: true
        },
        {
            name: "Fecha de Creación",
            selector : row => row.fechaCreacion,
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
            icono: <img className="logoOfertasCrudProd" src={ofertasLogo} alt="Ofertas" />,
            estado: "Activo",
            fechaCreacion: "2023-10-10",
        },
        {
            id: 2,
            categoria: "Combos",
            icono: <img className="logoCombosCrudProd" src={combosLogo} alt="Combos" />,
            estado: "Activo",
            fechaCreacion: "2021-10-10",

        },
        {
            id: 3,
            categoria: "Bebidas",
            icono: <img className="logoBebidasCrudProd" src={bebidasLogo} alt="Bebidas" />,
            estado: "Activo",
            fechaCreacion: "2022-10-10",
        },
        {
            id: 4,
            categoria: "Sánduches",
            icono: <img className="logoSanduchesCrudProd" src={sanduchesLogo} alt="Sánduches" />,
            estado: "Activo",
            fechaCreacion: "2022-05-03",
        },
        {
            id: 5,
            categoria: "Donas Premium",
            icono: <img className="logoPremiumCrudProd" src={donaPremiumLogo} alt="Donas Premium" />,
            estado: "Inactivo",
            fechaCreacion: "2023-02-25",
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