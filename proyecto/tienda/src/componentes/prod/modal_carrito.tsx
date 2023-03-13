import * as React from 'react';
import { Box, styled, Theme } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import Button from '@mui/base/ButtonUnstyled';
import { useNavigate } from "react-router-dom";
import { useSpring, animated, AnyFn } from '@react-spring/web';
import axios from 'axios';


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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let navigate = useNavigate(); 
  const realizarPedido = (event) =>{
    event.preventDefault();
    const pedido = {
        total: props.precio,
        datetime: new Date()
    }

    axios.post('https://console.firebase.google.com/project/dsm-react-demo-andres/database/dsm-react-demo-andres-default-rtdb/data/~2F/pedidos.json',pedido,
      {headers:{  'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'}}
    )
    .then((response)=>{
        alert('El producto se ha insertado en la base de datos');
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
      <Button onClick={handleOpen}>Realizar pedido</Button>
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
            <h2 id="spring-modal-title">Carrito de la compra</h2>
            <span id="spring-modal-description" style={{ marginTop: 16 }}>
              <div>{contenido}</div>
              <h3>Total (rupias): {props.precio}</h3>
              <Button color="primary" className="px-4"
              onClick={realizarPedido}
              >Continuar</Button>
            </span>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
