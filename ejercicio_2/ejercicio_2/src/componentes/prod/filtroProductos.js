import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';

const FiltroProductos = (props) => {

    const anoHandler = (event) => {
        props.updateAno(event.target.value)

    }
    
    return (
        <Container>
            <Row>
                <Col md={4}>
                    <Form.Label>Seseccione año:</Form.Label>
                    <Form.Select onChange={anoHandler}>
                        <option value= "">Ver todos</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                    </Form.Select>
                </Col>
            </Row>
        </Container>
    )
}

export default FiltroProductos;