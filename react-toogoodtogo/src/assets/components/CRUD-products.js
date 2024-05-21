import React, {useState, useEffect} from "react";
import "../styles/crud-product.css";
import buscar from "../images/buscar.png";
import DataTable from "react-data-table-component";
import { BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import Combo1 from "../images/combo1.jpeg";
import Combo2 from "../images/combo2.jpeg";
import Combo3 from "../images/combo3.jpeg";
import bebida1 from '../images/bebida1.jpeg'
import bebida2 from '../images/bebida2.jpeg'
import bebida3 from '../images/bebida3.jpeg'
import Cookies from 'js-cookie';
function CRUDProducts() {
    const [data, setData] = useState([
        {
            id: 1,
            producto: "Combo #1",
            imagen: Combo1,
            categoria: "Combos",
            precio: "$25,99",
        },
        {
            id: 2,
            producto: "Combo #2",
            imagen: Combo2,
            categoria: "Combos",
            precio: "$19,99",
        },
        {
            id: 3,
            producto: "Combo #3",
            imagen: Combo3,
            categoria: "Combos",
            precio: "$20,99",
        },
        {
            id: 4,
            producto: "Té Helado Grande",
            imagen: bebida1,
            categoria: "Bebidas",
            precio: "$1,50",
        },
        {
            id: 5,
            producto: "Iced Latte",
            imagen: bebida2,
            categoria: "Bebidas",
            precio: "$3,50",
        },
        {
            id: 6,
            producto: "Chocolate Frío",
            imagen: bebida3,
            categoria: "Bebidas",
            precio: "$3,75",
        }
    ]);
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
            name: "Imagen",
            cell: row => <img className="imagenProd" src={row.imagen} alt={row.producto}/>
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
                    <React.Fragment>   
                        <a href="/registroProductos/editarProducto">
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
        const nuevoProducto = Cookies.get('nuevoProducto');
        if (nuevoProducto) {
            const nuevoDato  = (JSON.parse( nuevoProducto));
            setData(prevData => [...prevData, { id: prevData.length + 1, ...nuevoDato }]);
            Cookies.remove('nuevoProducto');
        }
    }, []);

    // Función para filtrar los productos según el término de búsqueda
    const filteredData = data.filter(producto =>
        producto.producto.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                    <DataTable
                        columns={columns} 
                        data={filteredData}
                        />
                </div>
            </main>
            <footer className="contenedorFooter-prod">
                <div className="textoFooter2">
                Copyright © 2024 Too Good To Go International. All Rights Reserved.
                </div>
            </footer>
            <div className="waves-background2-prod"></div>
        </body>
    );
}

export default CRUDProducts;