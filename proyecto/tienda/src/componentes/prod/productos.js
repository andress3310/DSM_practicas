import Producto from './producto';
import { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';



function Productos(props) {

    const [productos, setProductos] = useState([]);

    useEffect(() => {
        //console.log('Se monta Productos');
        axios.get('https://dsm-react-demo-andres-default-rtdb.europe-west1.firebasedatabase.app/productos.json')
            .then((response) => {
                //console.log(response.data);
                let arrayProductos = [];
                console.log(response.data)
                for (let key in response.data) {
                    arrayProductos.push({
                        id: key,
                        nombre: response.data[key].Name,
                        precio: response.data[key].Price,
                        enlace: response.data[key].Imagen
                    })
                }
                //console.log(arrayProductos);
                setProductos(arrayProductos);
            }).catch((error)=>{
                alert('Se ha producido un error');
            })
    },[]);


    let contenido = <Alert variant='primary'>No hay productos</Alert>;

    if (productos.length > 0) {
        contenido = <div>
            {productos.map((elemento) => {
                return (
                    <Producto key={elemento.id} producto={elemento} />
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

export default Productos;