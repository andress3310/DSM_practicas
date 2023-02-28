import './producto.css';
import FechaProducto from './fechaProducto';
import {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';



function Producto(props) {

    const [nombre, setNombre] = useState(props.producto.nombre);

    const fecha = props.producto.fecha;
    const precio = props.producto.precio;
    const dimensiones = props.producto.dimensiones;
    const ano = fecha.getFullYear();
    const mes = fecha.toLocaleString('es-ES', { month: 'long' });
    const dia = fecha.toLocaleString('es-ES', { day: '2-digit' });
    const clickHandler = () => {
        setNombre('Nuevo nombre');
    }
    
    const borraHandler = () => {
        props.borraProducto(props.producto.id)
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className='producto'>
            <FechaProducto fecha={props.producto.fecha} />
            <div className='producto__descripcion'>
                <h2>{nombre}</h2>
                <div className='producto__precio'>{precio}</div>
                <div className='producto__ancho'>{dimensiones.ancho}</div>
                <div className='producto__alto'>{dimensiones.alto}</div>
                <Button onClick={clickHandler}>Cambia nombre</Button>
                <Button variant="warning" onClick={handleShow}>
                Ver detalles
            </Button>
            <Button variant="danger" onClick={borraHandler} >BORRAR</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{nombre}</Modal.Title>
                </Modal.Header>
                <Modal.Body>DETALLES DE MI PRODUCTO: {precio}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
            </div>
        </div>
    )
}

export default Producto;