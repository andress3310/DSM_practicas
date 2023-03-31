import * as React from 'react';
import { Box, styled, Theme } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import Button from '@mui/base/ButtonUnstyled';
import { useNavigate } from "react-router-dom";
import { useSpring, animated, AnyFn } from '@react-spring/web';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import {useState } from 'react';
import {useContext , createContext} from 'react';
import UserContext from '../../UserContext';
import './producto.css';



const BackdropUnstyled = React.forwardRef<
  HTMLDivElement,
  { children: React.ReactElement; open: boolean }
>((props, ref) => {
  const { open, ...other } = props;
  return <Fade ref={ref} in={open} {...other} />;
});

const Modal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled(BackdropUnstyled)`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

interface FadeProps {
  children: React.ReactElement;
  in?: boolean;
  onClick?: any;
  onEnter?: (node: HTMLElement, isAppearing: boolean) => void;
  onExited?: (node: HTMLElement, isAppearing: boolean) => void;
}

const Fade = React.forwardRef<HTMLDivElement, FadeProps>(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null as any, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null as any, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

const style = (theme: Theme) => ({
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: theme.palette.mode === 'dark' ? '#0A1929' : 'white',
  border: '2px solid currentColor',
  boxShadow: 24,
  padding: '16px 32px 24px 32px',
});

export default function Carrito(props) {
  const contexto = useContext(UserContext);


  const[email, setEmail] = useState('');
  const[pass, setPass] = useState('');
  const[address, setAddress] = useState('');

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setOpen2(false);
    setOpen3(false);
  }

  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const [open3, setOpen3] = useState(false);
  const handleOpen3 = () => setOpen3(true);
  const handleClose3 = () => setOpen3(false);

  const iniciarSesion = (event) => {
    event.preventDefault();
    axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDv9kit4z1r-px3Rt1Q7qgc0iLCg7GPMa8',
    {email:email,password:pass,returnSecureToken:true})
  .then((response)=>{
    contexto.setUser(response)
    handleClose2();
    handleOpen3();
  }).catch((error)=>{
    alert('Usuario o contraseña incorrectos')
  })
 }

  const handleUser = () => {
    if(contexto.user===''){
      handleOpen2();
      handleClose3();
    }else{
      handleOpen3();
      handleClose2();
    }
  }


  let navigate = useNavigate(); 

  const realizarPedido = (event) =>{
    event.preventDefault();
    const prods = {}

    for (let i = 0; i < props.unidades.length; i++){
      if (props.unidades[i]>0){
        prods[props.productos[i].nombre] = props.unidades[i]
      }
    }

    const pedido = {
        total: props.precio,
        datetime: new Date(),
        productos: prods,
        adrress:address,
        email:contexto.user.data.email,
    }
    axios.post('https://proyecto-dsm-db5ee-default-rtdb.europe-west1.firebasedatabase.app/pedidos.json',pedido,
      {headers:{  'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'}}
    )
    .then((response)=>{
        alert('Pedido realizado');
    }).catch((error)=>{
        alert('No se puede crear el producto');
    })

    let path = '../agradecimiento'; 
    navigate(path);

  }

  let contenido = <div>
            {props.productos.map((elemento: any) => {
              if (props.unidades[elemento.id]>0){
                return (
                    <div>{elemento.nombre}: {props.unidades[elemento.id]}</div>
                  )
            }
            })}
        </div>

  return (
    <div>
      <Button onClick={handleOpen} className='boton_pedido'>Realizar pedido</Button>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
      >
        <Fade in={open}>
          <Box sx={style}>
          <h2 id="spring-modal-title">Carrito de la</h2>
            <span id="spring-modal-description" style={{ marginTop: 16 }}>
              <div>{contenido}</div>
              <h3>Total (rupias): {props.precio}</h3>
              <Button color="primary" className="px-4"
              onClick={handleUser}
              >Continuar</Button>
            </span>
          </Box>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open2}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
      >
        <Fade in={open2}>
          <Box sx={style}>  
          <Form>
          <Form.Text className="text-muted">
          Inicie sesión para completar el pedido
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
          </Box>
        </Fade>
      </Modal>



      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open3}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        >
        <Fade in={open3}>
          <Box sx={style}>
          <Form>
          <Form.Text className="text-muted">
          Rellena la información para completar el pedido
        </Form.Text>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Address</Form.Label>
        <Form.Control type="email" placeholder="Address" onChange={(event) => setAddress(event.target.value)}/>
      </Form.Group>
      <Button onClick={realizarPedido} type="submit">
        Realizar Pedido
      </Button>
    </Form>

          </Box>
        </Fade>
      </Modal>

    </div>
  );
}
