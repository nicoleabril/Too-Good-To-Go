import React, {useState, useEffect} from "react";
import "../styles/crud-product.css";
import buscar from "../images/buscar.png";
import DataTable from "react-data-table-component";
import { BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import bolsa from "../images/bolsa.jpeg";
import Cookies from 'js-cookie';

function CRUDOferta() {
    const [ofertasData, setOfertasData] = useState([
        {
            id: 1,
          precio: '6.99',
          name: 'Oferta #1',
          descript: 'Esta bolsa sorpresa está valorada en $11,99',
          image: bolsa,
        },
        {
            id: 2,
          precio: '4.99',
          name: 'Oferta #2',
          descript: 'Esta bolsa sorpresa está valorada en $7,99',
          image: bolsa,
        },
        {
            id: 3,
          precio: '9.99',
          name: 'Oferta #3',
          descript: 'Esta bolsa sorpresa está valorada en $31,99',
          image: bolsa,
        }
  ]);
    const columns = [
        {
            name: "Id",
            selector : row => row.id,
            sortable: true
        },
        {
            name: "Oferta",
            selector : row => row.name,
            sortable: true
        },
        {
            name: "Imagen",
            cell: row => <img className="imagenProd" src={bolsa} alt={row.name}/>
        },
        {
            name: "Descripción",
            selector : row => row.descript,
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
                        <a href="/RegistroOfertas/EditarOferta">
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

    useEffect(() => {
        const nuevaOferta = Cookies.get('nuevaOferta');
        if (nuevaOferta) {
            const nuevoDato  = (JSON.parse( nuevaOferta));
            setOfertasData(prevData => [...prevData, { id: prevData.length + 1, ...nuevoDato }]);
            Cookies.remove('nuevaOferta');
        }
    }, []);


    return (
        <body className="container-crud-prod">
            <main className="crud-producto-container">
                <div className="crud-producto">
                    <div className="BusquedaProducto">
                        <img className="FotoBuscar" src={buscar} alt="Buscar" />
                        <input type="text" className="TextoBusquedaProducto" placeholder="Buscar Oferta" />
                    </div>
                    <React.Fragment>
                        <a href="/RegistroOfertas/AgregarOferta"><button className='botonAgregarProducto'>Agregar Oferta</button></a>
                    </React.Fragment>
                </div>
                <div className="tabla-productos-container">
                    <DataTable
                        columns={columns} 
                        data={ofertasData} 
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

export default CRUDOferta;