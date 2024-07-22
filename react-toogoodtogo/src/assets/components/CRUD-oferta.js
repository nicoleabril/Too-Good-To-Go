import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Routes, Link  } from 'react-router-dom';
import "../styles/crud-product.css";
import buscar from "../images/buscar.png";
import { BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import Cookies from 'js-cookie';
import axios from 'axios'; // Importa Axios
import {Table} from "antd"; 
import { ToastContainer, toast } from 'react-toastify';

function CRUDOferta() {
    const idNegocio = Cookies.get('id');
    const [ofertas, setOfertas] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const obtenerOferta = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/ofertas/${idNegocio}`);
                setOfertas(response.data.ofertas);
            } catch (error) {
                console.error('Error al obtener negocio:', error);
            }
        };

        obtenerOferta();
    }, [idNegocio]); 

    const eliminarOferta = async (idOferta) => {
        try {
            const response = await axios.delete(`http://localhost:8000/api/ofertas/${idOferta}`);
            console.log('Oferta eliminada:', response.data);
            const nuevasOfertas = ofertas.filter((cat) => cat.id_oferta !== idOferta);
            setOfertas(nuevasOfertas); 
            toast.success('Eliminado');
        } catch (error) {
            toast.error('Error al eliminar.');
            console.error('Error al eliminar oferta:', error);
            throw error; // Maneja el error según tus necesidades
        }
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id_oferta',
            key: 'id_oferta',
            sorter: (a, b) => a.id_oferta - b.id_oferta,
        },
        {
            title: 'Oferta',
            dataIndex: 'nombre_oferta',
            key: 'nombre_oferta',
            sorter: (a, b) => a.nombre_oferta.localeCompare(b.nombre_oferta),
        },
        {
            title: 'Descripción',
            dataIndex: 'descripcion',
            key: 'descripcion',
            sorter: (a, b) => a.descripcion.localeCompare(b.descripcion),
        },
        {
            title: 'Imagen',
            dataIndex: 'imagen_oferta',
            key: 'imagen_oferta',
            render: imagen_oferta =>  <img className="logoPremiumCrudProd" src={imagen_oferta} alt="Icono" />,
        },
        {
            title: 'Precio',
            dataIndex: 'precio',
            key: 'precio',
            sorter: (a, b) => a.precio - b.precio,
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
                        <Link to={`/RegistroOfertas/EditarOferta`} onClick={() => editar_oferta(registro.id_oferta)}>
                            <button className="EditarProd" title="Editar Oferta">
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
                        <button className="EliminarProd" title="Eliminar Oferta" onClick={() => eliminarOferta(registro.id_oferta)}>
                            <BsTrash size={25}/>
                        </button>
                </div>
            ),
            width:10,
         },
    ];

    const filteredData = ofertas && ofertas.length > 0 ? ofertas.filter(producto =>
        producto.nombre_oferta.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];
    
    const editar_oferta = (id) => {
        sessionStorage.setItem('id_oferta', id);
    };

    return (
        <body className="container-crud-prod">
            <main className="crud-producto-container">
                <div className="crud-producto">
                    <div className="BusquedaProducto">
                        <img className="FotoBuscar" src={buscar} alt="Buscar" />
                        <input
                            type="text"
                            className="TextoBusquedaProducto"
                            placeholder="Buscar Oferta"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <React.Fragment>
                        <a href="/RegistroOfertas/AgregarOferta"><button className='botonAgregarProducto'>Agregar Oferta</button></a>
                    </React.Fragment>
                </div>
                <div className="tabla-productos-container">
                    <Table
                        columns={columns}
                        dataSource={filteredData}
                    />
                </div>
            </main>
            <footer className="contenedorFooter-prod">
                <div className="textoFooter2">
                Copyright © 2024 Too Good To Go International. All Rights Reserved.
                </div>
            </footer>
            <div className="waves-background2-prod"></div>
            <ToastContainer
            closeButtonStyle={{
                fontSize: '10px', // Tamaño de fuente del botón de cerrar
                padding: '4px'    // Espaciado interno del botón de cerrar
            }}
            style={{ width: '400px' }} // Ancho deseado para ToastContainer
            />
        </body>
    );
}

export default CRUDOferta;