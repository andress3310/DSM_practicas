import './App.css';
import Producto from './componentes/prod/producto';
import Productos from './componentes/prod/productos';
import Header from './componentes/ui/header';
import Footer from './componentes/ui/footer';
import NuevoProducto from './componentes/NuevoProducto/NuevoProducto';
import Calculadora from './componentes/calculadora/calculadora';
import {useState} from 'react';


function App() {

  const [productos, setProductos] = useState( 
    [
      {
        id: 1,
        nombre: '111111',
        precio: 45.5,
        fecha: new Date(2023, 2,5),
        dimensiones: {alto: 5, ancho: 10}
      },
      {
        id: 2,
        nombre: '22222',
        precio: 45.5,
        fecha: new Date(2023, 2,6),
        dimensiones: {alto: 3, ancho: 7}
      },
      {
        id: 3,
        nombre: '333333',
        precio: 45.5,
        fecha: new Date(2024, 2,12),
        dimensiones: {alto: 4, ancho: 9}
      },
      {
        id: 4,
        nombre: 'producto 4',
        precio: 49.5,
        fecha: new Date(2025, 2,12),
        dimensiones: {alto: 4, ancho: 9}
      }
    ] 
  );

  const titulos = {titulo: 'Productos', subtitulo: 'de gran calidad y a buen precio'}

  const addProducto = (producto) => {
    setProductos((previousProd => {
      return [producto, ...previousProd]
    }));
  }

  const borraProducto = (id) => {
    let copiaProductos = [...productos];
    copiaProductos = copiaProductos.filter((elemento) => {
      return elemento.id !== id;
    })
    setProductos(copiaProductos);
  }


return (
  <div>
    <Header titulos={titulos}/>
    <Calculadora/>
    <NuevoProducto addProducto={addProducto}/>
    <Productos productos={productos} borraProducto={borraProducto}/>
    <Footer/>
  </div>
);
}

export default App;
