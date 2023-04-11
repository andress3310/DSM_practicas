import { Link } from "react-router-dom";

const Agradecimiento = () => {
    return (
        <>
            <h2>Muchas gracias por usar nuestro servicio!</h2>
            <p>Encontrará el registro del pedido en PEDIDOS</p>
            <Link to="/products" className="btn btn-primary">Realizar un nuevo pedido</Link>

        </>
    )
}

export default Agradecimiento;