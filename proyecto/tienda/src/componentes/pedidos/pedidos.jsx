import Pedido from './pedido';
import { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import Button from 'react-bootstrap/Button';


import React from 'react';


function Pedidos(props) {

    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        axios.get('https://dsm-react-demo-andres-default-rtdb.europe-west1.firebasedatabase.app/pedidos.json')
            .then((response) => {
                let arrayPedidos = [];
                let index = 0;
                for (let key in response.data) {
                    arrayPedidos.push({
                        id: index,
                        datetime: response.data[key].datetime,
                        productos: response.data[key].productos,
                        total: response.data[key].total
                    })
                    index+=1
                }
                setPedidos(arrayPedidos);
            }).catch((error)=>{
                alert('Se ha producido un error');
            })
    },[]);

    let contenido = <Alert variant='primary'>No se ha registrado ningún pedido</Alert>;

    if (pedidos.length > 0) {
        contenido = <div>
            {pedidos.map((elemento) => {
                return (
                    <Pedido pedido={elemento}/>
                )
            })}
        </div>
    }
    return (
        <>
            {contenido}
        </>
    )
}

export default Pedidos;