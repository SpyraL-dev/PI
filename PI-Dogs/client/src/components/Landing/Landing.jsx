import "./Landing.css"
import logo from "../imgs/perro_smoking.jpg"
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className= "fondo-home">
            <div className= "div-container-home">
                <div className= "foto-perrito-container">
                    <img className= "foto-perrito-home" src={logo} alt= ""></img>
                </div>
                <div className= "contenedor-titulo-home">
                    <div className= "titulo-home-container">
                        <p className= "titulo-home">Dogs Api</p>
                    </div> 
                    <div className= "subtitulo-home-container">
                        <p className= "subtitulo-home">El lugar donde podes encontrar informacion sobre perros</p>
                        <Link to= "/Home"><button className= "boton-home">Entrar</button> </Link>                      
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
