import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Routes, Link  } from 'react-router-dom';
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
import AddCategorias from "./AddCategoria";
import Cookies from 'js-cookie';
function CRUDCategoria() {
    const [data, setData] = useState([
        {
            id: 1,
            categoria: "Ofertas",
            icono: <img className="logoOfertasCrudProd" src={ofertasLogo} alt="Ofertas" />,
            estado: "Activo",
            fechaCreacion: "10/10/2023",
        },
        {
            id: 2,
            categoria: "Combos",
            icono: <img className="logoCombosCrudProd" src={combosLogo} alt="Combos" />,
            estado: "Activo",
            fechaCreacion: "02/08/2021",
        },
        {
            id: 3,
            categoria: "Bebidas",
            icono: <img className="logoBebidasCrudProd" src={bebidasLogo} alt="Bebidas" />,
            estado: "Activo",
            fechaCreacion: "05/07/2022",
        },
        {
            id: 4,
            categoria: "Sánduches",
            icono: <img className="logoSanduchesCrudProd" src={sanduchesLogo} alt="Sánduches" />,
            estado: "Activo",
            fechaCreacion: "03/05/2022",
        },
        {
            id: 5,
            categoria: "Donas Premium",
            icono: <img className="logoPremiumCrudProd" src={donaPremiumLogo} alt="Donas Premium" />,
            estado: "Inactivo",
            fechaCreacion: "25/02/2023",
        }
    ]);

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
                    <React.Fragment>   
                        <a href="/registroCategoria/editarCategoria">
                            <button className="EditarProd">
                                <FiEdit size={25}/>
                            </button>
                        </a>
                    </React.Fragment>
                    <button className="EliminarProd">
                        <BsTrash size={25}/>
                    </button>
                </div>
            )
        },
    ];

    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const nuevaCategoria = Cookies.get('nuevaCategoria');
        if (nuevaCategoria) {
            const nuevoDato  = (JSON.parse( nuevaCategoria));
            setData(prevData => [...prevData, { id: prevData.length + 1, ...nuevoDato }]);
            Cookies.remove('nuevaCategoria');
        }
    }, []); 

    // Función para filtrar los productos según el término de búsqueda
    const filteredData = data.filter(producto =>
        producto.categoria.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <body>
            <div className="container-crud-categoria">
                <main className="crud-categoria-container">
                    <div className="crud-categoria">
                        <div className="BusquedaCategoria">
                            <img className="FotoBuscarCategoria" src={buscar} alt="Buscar" />
                            <input
                            type="text"
                            className="TextoBusquedaProducto"
                            placeholder="Buscar Categoría"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <React.Fragment>
                            <Link to="/RegistroCategoria/AgregarCategoria">
                                <button className='botonAgregarCategoria'>Agregar Categoría</button>
                            </Link>
                        </React.Fragment>
                    </div>
                    <div className="tabla-categoria-container">
                        <DataTable
                            columns={columns}
                            data={filteredData}
                        />
                    </div>
                </main>
                <footer className="contenedorFooter-categoria">
                    <div className="textoFooter2">
                        Copyright © 2024 Too Good To Go International. All Rights Reserved.
                    </div>
                </footer>
                <div className="waves-background2-categoria"></div>
            </div>
        </body>
    );
}

export default CRUDCategoria;