import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Routes, Link  } from 'react-router-dom';
import {Table} from "antd"; 
import "../styles/crud-categoria.css";
import buscar from "../images/buscar.png";
import DataTable from "react-data-table-component";
import { BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { Typography, Modal, Alert } from 'antd'; 
import Cookies from 'js-cookie';
import axios from 'axios'; // Importa Axios

const { confirm } = Modal;
const { Title } = Typography; // Usa Typography de antd para el título

function CRUDCategoria() {
    const idNegocio = Cookies.get('id');
    const [categorias, setCategorias] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const obtenerCategoria = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/categorias/${idNegocio}`);
                setCategorias(response.data.data);
                console.log(response.data.data);
            } catch (error) {
                console.error('Error al obtener negocio:', error);
            }
        };

        obtenerCategoria();
    }, [idNegocio]); 

    const eliminarCategoria = async (idCategoria) => {
        try {
            const response = await axios.delete(`http://localhost:8000/api/categorias/${idCategoria}`);
            console.log('Categoría eliminada:', response.data);
            const nuevasCategorias = categorias.filter((cat) => cat.id_categoria !== idCategoria);
            setCategorias(nuevasCategorias); 
        } catch (error) {
            console.error('Error al eliminar categoría:', error);
            throw error; // Maneja el error según tus necesidades
        }
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id_categoria',
            key: 'id_categoria',
            sorter: (a, b) => a.id_categoria - b.id_categoria,
        },
        {
            title: 'Categoría',
            dataIndex: 'nombre_categoria',
            key: 'nombre_categoria',
            sorter: (a, b) => a.nombre_categoria.localeCompare(b.nombre_categoria),
        },
        {
            title: 'Descripción',
            dataIndex: 'descripcion',
            key: 'descripcion',
            sorter: (a, b) => a.descripcion.localeCompare(b.descripcion),
        },
        {
            title: 'Icono',
            dataIndex: 'imagen_categoria',
            key: 'imagen_categoria',
            render: imagen_categoria =>  <img className="logoPremiumCrudProd" src={imagen_categoria} alt="Icono" />,
        },
        {
            title: 'Habilitado',
            dataIndex: 'habilitado',
            key: 'habilitado',
            render: habilitado => (habilitado ? 'Activo' : 'Inactivo'),
            sorter: (a, b) => a.descripcion.localeCompare(b.descripcion),
        },
        {
            title: 'Fecha de Creación',
            dataIndex: 'fecha_creacion',
            key: 'fecha_creacion',
            sorter: (a, b) => new Date(a.fecha_creacion) - new Date(b.fecha_creacion),
        },
        {
            title: '',
            key: 'editar',
            fixed: 'left',
            render: (_, registro) => (
                <div className="botonesCrudCategoria">
                    <React.Fragment>   
                        <Link to={`/RegistroCategoria/editarCategoria/`} onClick={() => editar_categoria(registro.id_categoria)}>
                            <button className="EditarProd" title="Editar Categoría">
                                <FiEdit size={25}/>
                            </button>
                        </Link>
                     </React.Fragment>
                </div>
            ),
            width:10,
        },
          {
            title: '',
            key: 'eliminar',
            fixed: 'left',
            render: (_, registro) => (
                <div className="botonesCrudCategoria">
                        <button className="EliminarProd" title="Eliminar Categoría" onClick={() => eliminarCategoria(registro.id_categoria)}>
                            <BsTrash size={25}/>
                        </button>
                </div>
            ),
            width:10,
         },
    ];

    const filteredData = categorias.filter(producto =>
        producto.nombre_categoria.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const editar_categoria = (id) => {
        sessionStorage.setItem('id_categoria', id);
    };

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
                        <Table
                            columns={columns}
                            dataSource={filteredData}
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