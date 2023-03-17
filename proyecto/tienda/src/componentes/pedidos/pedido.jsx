import {useState} from 'react';
import Button from 'react-bootstrap/Button';
import React from 'react';
import './pedido.css'



function Pedido(props) {

    const total = props.pedido.total;
    const productos = props.pedido.productos;
    const fecha = props.pedido.datetime;

    let entries = Object.entries(productos);
    let entry;
    let data = entries.map( ([key, val] = entry) => {
        return <div>{key}: {val}</div>;
    });
    const [open, setOpen] = useState(false);
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
        <div className='pedido' onClick={toggleOpen}>
            <div>
                <h4>Pedido realizado el: {fecha}</h4>
                <div>Precio total: {total} rupias.</div>
                {detalles}
            </div>
        </div>
    )
}

export default Pedido;