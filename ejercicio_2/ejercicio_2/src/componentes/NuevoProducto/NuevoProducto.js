import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const NuevoProducto = (props) => {

    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [fecha, setFecha] = useState('');

    const nombreHandler = (event) => {
        setNombre(event.target.value);
    }

    const precioHandler = (event) => {
        setPrecio(event.target.value);
    }

    const fechaHandler = (event) => {
        setFecha(event.target.value);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        const producto = {
            id: Math.random().toString(),
            nombre: nombre,
            precio: precio,
            fecha: new Date(fecha),
            dimensiones: {ancho: 2,alto: 3}
        }
        props.addProducto(producto);
        setNombre('');
        setPrecio('');
        setFecha('');
    }

    return (
        <Form onSubmit={submitHandler}>
            <Container>
                <Row>
                    <Col><Form.Label>Nombre: </Form.Label>
                        <Form.Control onChange={nombreHandler} type='text' value={nombre} /></Col>
                    <Col><Form.Label>Precio: </Form.Label>
                        <Form.Control onChange={precioHandler} type='number' value={precio} /></Col>
                    <Col><Form.Label>Fecha: </Form.Label>
                        <Form.Control onChange={fechaHandler} type='date' value={fecha} /></Col>
                    <Col><Button type='submit' variant="success">AÑADIR PRODUCTO</Button></Col>
                </Row>
            </Container>
        </Form>
    )
}

export default NuevoProducto;