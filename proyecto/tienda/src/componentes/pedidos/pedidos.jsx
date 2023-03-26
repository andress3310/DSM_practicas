import Pedido from './pedido';
import { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import Button from 'react-bootstrap/Button';


import React from 'react';


function Pedidos(props) {

    const [pedidos, setPedidos] = useState([]);
    const [seeModal,setSeeModal] = useState(false);

    const borrarPedido = (nombre) => {
        const pedidos_temp = [...pedidos];
        let indice=0;
        for (let index in pedidos_temp){
            if(pedidos_temp[index].name===nombre){
                indice=index;
            }
        }
        const nombrePedido=pedidos[indice].name
        pedidos_temp.splice(indice, 1);
        axios.delete('https://proyecto-dsm-db5ee-default-rtdb.europe-west1.firebasedatabase.app/pedidos/'+nombrePedido+'.json')
        setPedidos(pedidos_temp)
    }

    useEffect(() => {
        axios.get('https://proyecto-dsm-db5ee-default-rtdb.europe-west1.firebasedatabase.app/pedidos.json')
            .then((response) => {
                let arrayPedidos = [];
                let index = 0;
                for (let key in response.data) {
                    arrayPedidos.push({
                        id: index,
                        datetime: response.data[key].datetime,
                        productos: response.data[key].productos,
                        total: response.data[key].total,
                        name:key
                    })
                    index+=1
                }
                setPedidos(arrayPedidos);
            }).catch((error)=>{
                alert('Se ha producido un error');
            })
    },[]);

    let contenido = <Alert variant='primary'>No se ha registrado ningún pedido</Alert>;

    console.log(pedidos.length)
    if (pedidos.length > 0) {
        contenido = <div>
            {pedidos.map((elemento) => {
                return (
                    <Pedido pedido={elemento} borrarPedido={borrarPedido}/>
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