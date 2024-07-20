import React, {useState, useEffect} from "react";
import "../styles/crud-product.css";
import buscar from "../images/buscar.png";
import DataTable from "react-data-table-component";
import { BrowserRouter as Router, Route, Routes, Link  } from 'react-router-dom';
import { BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import {Table} from "antd"; 
import Cookies from 'js-cookie';
import axios from 'axios'; // Importa Axios
import { ToastContainer, toast } from 'react-toastify';

function CRUDProducts() {
    const idNegocio = Cookies.get('id');
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        const obtenerProducto = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/productos/${idNegocio}`);
                setProductos(response.data.productos);
            } catch (error) {
                console.error('Error al obtener negocio:', error);
            }
        };

        const obtenerCategoria = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/categorias/${idNegocio}`);
                setCategorias(response.data.categorias);
            } catch (error) {
                console.error('Error al obtener negocio:', error);
            }
        };

        obtenerCategoria();
        obtenerProducto();
    }, [idNegocio]); 

    const eliminarProducto = async (id_producto) => {
        try {
            const response = await axios.delete(`http://localhost:8000/api/productos/${id_producto}`);
            console.log('Producto eliminado:', response.data);
            const nuevosProductos = productos.filter((cat) => cat.id_producto !== id_producto);
            setProductos(nuevosProductos); 
            toast.success('Eliminado');
        } catch (error) {
            toast.error('Error al eliminar.');
            console.error('Error al eliminar producto:', error);
            throw error; // Maneja el error según tus necesidades
        }
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id_producto',
            key: 'id_producto',
            sorter: (a, b) => a.id_producto - b.id_producto,
        },
        {
            title: 'Producto',
            dataIndex: 'nombre_producto',
            key: 'nombre_producto',
            sorter: (a, b) => a.nombre_producto.localeCompare(b.nombre_producto),
        },
        {
            title: 'Categoría',
            dataIndex: 'id_categoria',
            key: 'id_categoria',
            sorter: (a, b) => a.id_categoria.localeCompare(b.id_categoria),
        },
        {
            title: 'Descripción',
            dataIndex: 'descripcion',
            key: 'descripcion',
            sorter: (a, b) => a.descripcion.localeCompare(b.descripcion),
        },
        {
            title: 'Imagen',
            dataIndex: 'imagen',
            key: 'imagen',
            render: imagen =>  <img className="logoPremiumCrudProd" src={imagen} alt="Icono" />,
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
                        <Link to={`/registroProductos/editarProducto/`} onClick={() => editar_producto(registro.id_producto)}>
                            <button className="EditarProd" title="Editar Producto">
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
                        <button className="EliminarProd" title="Eliminar Producto" onClick={() => eliminarProducto(registro.id_producto)}>
                            <BsTrash size={25}/>
                        </button>
                </div>
            ),
            width:10,
         },
    ];

    const [searchTerm, setSearchTerm] = useState("");

    const filteredData = productos && productos.length > 0 ? productos.filter(producto =>
        producto.nombre_producto.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];
    
    
    const editar_producto = (id) => {
        sessionStorage.setItem('id_producto', id);
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
                            placeholder="Buscar Producto"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <React.Fragment>
                        <a href="/registroProductos/agregarProducto"><button className='botonAgregarProducto'>Agregar Producto</button></a>
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
            <ToastContainer
            closeButtonStyle={{
                fontSize: '12px', // Tamaño de fuente del botón de cerrar
                padding: '4px'    // Espaciado interno del botón de cerrar
            }}
            style={{ width: '400px' }} // Ancho deseado para ToastContainer
            />
            <div className="waves-background2-prod"></div>
        </body>
    );
}

export default CRUDProducts;