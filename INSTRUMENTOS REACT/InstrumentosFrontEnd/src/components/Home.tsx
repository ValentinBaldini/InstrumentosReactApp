import Navbar from "./navbar"
import './css/home.css'


const Home = () => {
  return (
    <>
      <Navbar />
      <h1 className="h1Home">MUSICAL HENDRIX</h1>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-8">
            <div id="carouselExample" className="carousel slide">
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img src="/img/pexels-joshsorenson-995301.jpg" className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                  <img src="/img/pexels-pixabay-210764.jpg" className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                  <img src="/img/pexels-pixabay-45243.jpg" className="d-block w-100" alt="..." />
                </div>
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <p className="pHome">Musical Hendrix es una tienda de instrumentos musicales con ya más de 15 años de
        experiencia. Tenemos el conocimiento y la capacidad como para informarte acerca de las
        mejores elecciones para tu compra musical.</p>
    </>
  )
}

export default Home
