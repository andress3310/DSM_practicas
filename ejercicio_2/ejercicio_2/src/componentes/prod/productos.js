import Producto from './producto';
import FiltroProductos from './filtroProductos';
import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';


function Productos(props) {

    const [ano, setAno] = useState('');

    const updateAno = (ano) => {
        setAno(ano);
    }

    const productosFiltrados = props.productos.filter((elemento) => {
        if (ano !== '') {
            return elemento.fecha.getFullYear().toString() === ano;
        }
        return true;
    })


    let contenido = <Alert variant='primary'>No hay productos</Alert>;

    if (productosFiltrados.length > 0) {
        contenido = <div>
            {productosFiltrados.map((elemento) => {
                return (
                    <Producto key={elemento.id} producto={elemento} borraProducto={props.borraProducto} />
                )
            })}
        </div>
    }
    return (
        <>
            <FiltroProductos updateAno={updateAno}/>
            {contenido}
        </>
    )
}

export default Productos;