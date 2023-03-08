import Producto from './producto';
import { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import React from 'react';


function Productos(props) {

    const [productos, setProductos] = useState([]);
    const [unidades, setUnidades] = useState([]);

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

    useEffect(() => {
        axios.get('https://dsm-react-demo-andres-default-rtdb.europe-west1.firebasedatabase.app/productos.json')
            .then((response) => {
                let arrayProductos = [];
                let arrayUnidades = [];
                for (let key in response.data) {
                    arrayProductos.push({
                        id: key,
                        nombre: response.data[key].Name,
                        precio: response.data[key].Price,
                        enlace: response.data[key].Imagen
                    })
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

    const comprar = () => {

    }

    let contenido = <Alert variant='primary'>No hay productos</Alert>;

    if (productos.length > 0) {
        contenido = <div>
            {productos.map((elemento) => {
                return (
                    <Producto producto={elemento} unidades={unidades} anadirProducto={anadirProducto} sustraerProducto={sustraerProducto}/>
                )
            })}
        </div>
    }
    return (
        <>
            <Button variant="danger" onClick={comprar} >Comprar</Button>
            {contenido}
        </>
    )
}

export default Productos;