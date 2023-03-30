import Pedido from './pedido';
import { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import UserContext from '../../UserContext';
import {useContext , createContext} from 'react';
import Form from 'react-bootstrap/Form';

import React from 'react';


function Pedidos(props) {
    const contexto = useContext(UserContext);

    const[email, setEmail] = useState('');
    const[pass, setPass] = useState('');

    const [pedidos, setPedidos] = useState([]);
    const [seeModal,setSeeModal] = useState(false);


    const iniciarSesion = (event) => {
        event.preventDefault();
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDVgDg-ryUgmp9aRnRbWxC4Ql9EJaoGaVg',
        {email:email,password:pass,returnSecureToken:true})
      .then((response)=>{
        contexto.setUser(response)
      }).catch((error)=>{
        alert('Usuario o contraseña incorrectos')
      })
    }


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
                    console.log(response.data[key])
                    arrayPedidos.push({
                        id: index,
                        datetime: response.data[key].datetime,
                        productos: response.data[key].productos,
                        total: response.data[key].total,
                        address:response.data[key].adrress,
                        email:response.data[key].email,
                        name:key
                    })
                    index+=1
                }
                setPedidos(arrayPedidos);
            }).catch((error)=>{
                alert('Se ha producido un error');
            })
    },[]);
    let pedidosUser=[]
    let contenido = <Alert variant='primary'>No se ha registrado ningún pedido</Alert>;
    console.log(contexto.user)
    if(contexto.user!=''){
        console.log('ola')
        pedidosUser=pedidos.filter(element=>element.email==contexto.user.data.email)
    }

    console.log(pedidosUser)
    if (pedidosUser.length > 0) {
        contenido = <div>
            {pedidosUser.map((elemento) => {
                    return (
                        <Pedido pedido={elemento} borrarPedido={borrarPedido}/>
                    )
            })}
            
        </div>
    }
    if (contexto.user===''){
        contenido=<div class='container-fluid'>
        <Form>
        <Form.Text className="text-muted">
        Inicie sesión para ver sus pedidos
        </Form.Text>
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email Adress</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(event) => setEmail(event.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(event) => setPass(event.target.value)}/>
        </Form.Group>
        <Button onClick={iniciarSesion} type="submit">
        Iniciar Sesión
        </Button>
        </Form>
        </div>
    }
    return (
        <>
        {contenido}
        </>
    )
}

export default Pedidos;