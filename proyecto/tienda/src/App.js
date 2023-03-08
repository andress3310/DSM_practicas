import './App.css';
import Producto from './componentes/prod/producto';
import Productos from './componentes/prod/productos';
import Header from './componentes/ui/header';
import Footer from './componentes/ui/footer';
import {useState} from 'react';


function App() {

  const [unidades, setUnidades] = useState(
    []
  );

  const [productos, setProductos] = useState( 
    [] 
  );
  const titulos = {titulo: 'Productos', subtitulo: 'de gran calidad y a buen precio'}



return (
  <div>
    <Header titulos={titulos}/>
    <Productos productos={productos}/>
    <Footer/>
  </div>
);
}

export default App;
