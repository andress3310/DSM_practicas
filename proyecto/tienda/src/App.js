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
import React from 'react';
import { createContext } from "react";
import ReactDOM from "react-dom/client";
import UserContext from './UserContext';

function App() {
  
  const [user, setUser] = useState('');
  const [unidades, setUnidades] = useState(
    []
  );

  const [productos, setProductos] = useState( 
    [] 
  );

  const titulos = {titulo: 'Teletienda', subtitulo: 'el lugar donde comprar las telecosas'}
  
return (
  <div>
    <UserContext.Provider
      value={{
        user:user,
        setUser:setUser
      }}
    >
    <Header titulos={titulos}/>
    <MenuUI></MenuUI>
    <Routes>
      <Route path='/products' element={<Productos></Productos>} />
      <Route path='/agradecimiento' element={<Agradecimiento></Agradecimiento>} />
      <Route path='*' element={<ErrorPage/>} />
      <Route path='/pedidos' element={<Pedidos></Pedidos>} />
      <Route path='/' element={<Productos></Productos>} />
    </Routes>
    <Footer/>
    </UserContext.Provider>
  </div>
);
}

export default App;
