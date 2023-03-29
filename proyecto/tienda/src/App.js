import './App.css';
import Producto from './componentes/prod/producto';
import Productos from './componentes/prod/productos';
import Header from './componentes/ui/header';
import Footer from './componentes/ui/footer';
import MenuUI from './componentes/ui/menu'
import {useState} from 'react';
import ErrorPage from './pages/ErrorPage';
import Agradecimiento from './pages/Agradecimiento'
import { Route, Routes } from 'react-router-dom';
import Pedidos from './componentes/pedidos/pedidos';


function App() {

  const titulos = {titulo: 'Productos', subtitulo: 'de gran calidad y a buen precio'}
  
return (
  <div>
    <Header titulos={titulos}/>
    <MenuUI></MenuUI>
    <Routes>
      <Route path='/products' element={<Productos></Productos>} />
      <Route path='/' element={<Productos></Productos>} />
      <Route path='/agradecimiento' element={<Agradecimiento></Agradecimiento>} />
      <Route path='*' element={<ErrorPage/>} />
      <Route path='/pedidos' element={<Pedidos></Pedidos>} />
    </Routes>
    <Footer/>
  </div>
);
}

export default App;
