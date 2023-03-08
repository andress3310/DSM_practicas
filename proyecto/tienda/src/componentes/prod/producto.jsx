import './producto.css';
import {useState} from 'react';
import Button from 'react-bootstrap/Button';
import React from 'react';



function Producto(props) {

    const [nombre, setNombre] = useState(props.producto.nombre);
    const precio = props.producto.precio;
    const enlace = require('./img/'+props.producto.enlace)
    const unidades = props.unidades;
    const id = props.producto.id;



    return (
        <div className='producto'>
            <div className='producto__descripcion'>
                <h2>{nombre}</h2>
                <div className='producto__precio'>{precio}</div>
                <img src={enlace} alt="Logo" />
                <Button variant="danger" onClick={() => {props.sustraerProducto(id)}} >-</Button>
                <div className='producto__precio'>{unidades[id]}</div>
                <Button variant="danger" onClick={() => {props.anadirProducto(id)}}>+</Button>
            </div>
        </div>
    )
}

export default Producto;