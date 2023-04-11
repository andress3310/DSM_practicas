import Producto from './producto';
import './producto.css';
import { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Carrito from './modal_carrito.tsx';
import {useContext , createContext} from 'react';
import UserContext from '../../UserContext';

import React from 'react';


function Productos(props) {

    const contexto = useContext(UserContext);

    const [productos, setProductos] = useState([]);
    const [unidades, setUnidades] = useState([]);
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);
    const [filter, setFilter] = useState('');
    const [viewN, setViewN] = useState('3');

    const toggleViewAll = () => {
    if (viewN==3)
        {setViewN(100)}
    else
        {setViewN(3)}
    }

    const anadirProducto = (indice) => {
        const unidades_temp = [...unidades];
        unidades_temp[indice] += 1;
        setUnidades(unidades_temp)
    }
    const sustraerProducto = (indice) => {
        const unidades_temp = [...unidades];
        if (unidades_temp[indice]>0){
            unidades_temp[indice] +=-1;
            setUnidades(unidades_temp)
        }
    }

    const calcularPrecio = () => {
        const precio = unidades.map((u,i) => {return {u: u, p: productos[i].precio}})
            .reduce((acc,{u,p}) => acc+u*p, 0).toFixed(2)
        return precio
    }

    useEffect(() => {
        axios.get('https://dsm-react-demo-andres-default-rtdb.europe-west1.firebasedatabase.app/productos.json')
            .then((response) => {
                let arrayProductos = [];
                let arrayUnidades = [];
                let index = 0;
                for (let key in response.data) {
                    arrayProductos.push({
                        id: index,
                        nombre: response.data[key].Name,
                        precio: response.data[key].Price,
                        enlace: response.data[key].Image
                    })
                    index+=1
                }
                setProductos(arrayProductos);
                for (let i in response.data) {
                    arrayUnidades.push(0);
                }
                setUnidades(arrayUnidades);

            }).catch((error)=>{
                alert('Se ha producido un error');
            })
    },[]);

    let contenido = <Alert variant='primary'>No hay productos</Alert>;
    let textViewN = 'Ver Todos'
    if (viewN==3)
        { textViewN = 'Ver todos'}
    else
        {textViewN = 'Ver menos'}


    if (productos.length > 0) {
        contenido = <div>
            {productos.filter(p => p.nombre.toLowerCase().startsWith(filter.toLowerCase())).slice(0,viewN).map((elemento) => {
                return (
                    <Producto producto={elemento} unidades={unidades} anadirProducto={anadirProducto} sustraerProducto={sustraerProducto}/>
                )
            })}
        <Button onClick={toggleViewAll} className='boton_pedido'>{textViewN}</Button>
        </div>
    }

    return (
        <>
            <div className='cabecera'>
            <input id="nameFilter"
                name="nameFilter"
                type="text"
                value={filter}
                onChange={event => setFilter(event.target.value)}
                />
                <h4>Coste total: {calcularPrecio()}</h4>
                <Carrito productos={productos} unidades={unidades} precio={calcularPrecio()} context={contexto}></Carrito>
            </div>
            {contenido}
        </>
    )
}

export default Productos;