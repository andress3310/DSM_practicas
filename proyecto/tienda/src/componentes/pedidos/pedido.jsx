import {useState} from 'react';
import Button from 'react-bootstrap/Button';
import React from 'react';
import './pedido.css'
import Modal from 'react-bootstrap/Modal'

function Pedido(props) {

    const total = props.pedido.total;
    const productos = props.pedido.productos;
    const fecha = props.pedido.datetime;
    const id= props.pedido.id;
    const name=props.pedido.name;

    let entries = Object.entries(productos);
    let entry;
    let data = entries.map( ([key, val] = entry) => {
        return <div>{key}: {val}</div>;
    });


    const [open, setOpen] = useState(false);
    const [seeModal, setSeeModal] = useState(false);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleBorrar = () => {
        setShow(false);
        props.borrarPedido(name)
    }

    const handleShow = () => setShow(true);
    
    const toggleOpen = () => {
        if (open){
            setOpen(false);
        }else{
            setOpen(true);
        }
    }
    let detalles = null;
    if(open){
        detalles = <div>
            <p></p>
            <h4>Productos comprados:</h4>
            <div>{data}</div>
            </div>
    }
    return (
        <>
            <div className='pedido' onClick={toggleOpen}>
            <div>
                <h3>{name}</h3>
                <h4>Pedido realizado el: {fecha}</h4>
                <div>Precio total: {total} rupias.</div>
                {detalles}
            </div>
            <Button variant="danger" onClick={handleShow} >BORRAR PEDIDO</Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Borra pedido {name} </Modal.Title>
          </Modal.Header>
          <Modal.Body>¿Seguro que quieres cancelar este pedido?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              No
            </Button>
            <Button variant="primary" onClick={handleBorrar}>
              Si
            </Button>
          </Modal.Footer>
        </Modal>

        </div>
        </>
        
    )
}

export default Pedido;