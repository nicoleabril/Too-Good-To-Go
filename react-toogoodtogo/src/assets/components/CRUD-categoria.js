import React, {useState} from "react";
import "../styles/crud-categoria.css";
import buscar from "../images/buscar.png";
import DataTable from "react-data-table-component";
import { BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import Modal from "react-modal";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

Modal.setAppElement('#root');

function CRUDCategoria() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [categoria, setCategoria] = useState("");
    const [estado, setEstado] = useState("Activo")
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

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Aquí puedes agregar la lógica para agregar la nueva categoría a la lista
        // Por ejemplo, podrías actualizar el estado 'data' para incluir la nueva categoría

        // Cierra el modal después de agregar la categoría
        closeModal();
    };

    return (
        <body className="container-crud-categoria">
            <main className="crud-categoria-container">
                <div className="crud-categoria">
                    <div className="BusquedaCategoria">
                        <img className="FotoBuscarCategoria" src={buscar} alt="Buscar" />
                        <input type="text" className="TextoBusquedaCategoria" placeholder="Buscar Categoría" />
                    </div>
                    <button className='botonAgregarCategoria' onClick={openModal}>Agregar Categoría</button>
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
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Agregar Categoría"
            >
                <h2>Agregar Nueva Categoría</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Nombre de la Categoría:</label>
                        <input
                            type="text"
                            value={categoria}
                            onChange={(e) => setCategoria(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Estado:</label>
                        <select
                            value={estado}
                            onChange={(e) => setEstado(e.target.value)}
                            required
                        >
                            <option value="Activo">Activo</option>
                            <option value="Inactivo">Inactivo</option>
                        </select>
                    </div>
                    <button type="submit">Agregar</button>
                    <button type="button" onClick={closeModal}>Cancelar</button>
                </form>
            </Modal>
        </body>
    );
}

export default CRUDCategoria;