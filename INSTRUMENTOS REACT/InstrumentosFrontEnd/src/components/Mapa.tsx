import Navbar from "./navbar"

const Mapa = () => {

    return (
        <>
            <Navbar></Navbar>
            <h1 style={{ textAlign: 'center', fontFamily: 'raleway, sans-serif', letterSpacing: '1rem' }}>UBICACION</h1>
            <div>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3350.4480721978634!2d-68.84314324581791!3d-32.88631960580244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967e091ed2dd83f7%3A0xf41c7ab7e3522157!2sAv.%20San%20Mart%C3%ADn%20%26%20Av.%20Las%20Heras%2C%20Capital%2C%20Mendoza!5e0!3m2!1ses-419!2sar!4v1717688978753!5m2!1ses-419!2sar" width="800" height="600" style={{ border: 0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </>
    )
}

export default Mapa
