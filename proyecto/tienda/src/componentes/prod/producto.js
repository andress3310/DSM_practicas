import './producto.css';
import {useState} from 'react';



function Producto(props) {

    const [nombre, setNombre] = useState(props.producto.nombre);
    const precio = props.producto.precio;
    const enlace = require('./img/'+props.producto.enlace)

    return (
        <div className='producto'>
            <div className='producto__descripcion'>
                <h2>{nombre}</h2>
                <div className='producto__precio'>{precio}</div>
                <img src={enlace} alt="Logo" />
            </div>
        </div>
    )
}

export default Producto;