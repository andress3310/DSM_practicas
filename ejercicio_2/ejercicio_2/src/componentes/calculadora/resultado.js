import './resultado.css'

function Resultado(props) {

    const resultado = props.resultado;

    return (
        <div className='resultado'>
            <h2>{resultado}</h2>
        </div>
    )
}

export default Resultado;