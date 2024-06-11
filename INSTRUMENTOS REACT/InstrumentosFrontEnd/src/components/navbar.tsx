import './css/navbar.css'
const Navbar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg full-width navbar-personalizado fixed-top">
                <div className="container-fluid">
                    <a className="navbar-brand brand-pers" href="/home">HENDRIX</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="/home">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/productos">Productos</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/mapa">Donde estamos</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/grilla">Grilla</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
