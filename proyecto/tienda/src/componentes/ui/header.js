import './header.css';

function Header(argumentos) {
    const titulo = argumentos.titulos.titulo;
    const subtitulo = argumentos.titulos.subtitulo;
    return (
        <div className="sample-header">
        <div className="sample-header-section">
            <h1>{titulo}</h1>
            <h2>{subtitulo}</h2>
        </div>
        </div>
    )
}

export default Header;

