function FechaProducto(props) {

    const fecha = props.fecha;
    const ano = fecha.getFullYear();
    const mes = fecha.toLocaleString('es-ES', { month: 'long' });
    const dia = fecha.toLocaleString('es-ES', { day: '2-digit' });

    return (
        <div className='producto-fecha'>
            <div className='producto-fecha__dia'>{dia}</div>
            <div className='producto-fecha__mes'>{mes}</div>
            <div className='producto-fecha__ano'>{ano}</div>
        </div>
    )
}

export default FechaProducto;