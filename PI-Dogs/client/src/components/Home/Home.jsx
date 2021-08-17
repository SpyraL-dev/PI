import "./Home.css"
import SearchBar from "../Searchbar/SearchBar"
import DogCard from "../DogCard/DogCard";
import axios from "axios"
import { useSelector, useDispatch} from "react-redux";
import {useState, useEffect } from "react"
import { Link } from "react-router-dom";    
import Paginacion from "../Paginacion/Paginacion";

function Home() {
    const dispatch = useDispatch();
    const dogs = useSelector((state) => state.dogs);
    const temperaments = useSelector((state) => state.temperaments); 
    const [peso, setPeso] = useState("")
    const razadogs = useSelector((state) => state.razadogs)
    const [razaSelected, setRazaSelected] = useState("")
    const [orderAlfabet, setOrderAlfabet] = useState("")
    const [temperamentSelected, setTemperamentSelected] = useState("")
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPorPag ] = useState(9);

    useEffect(() => {
        axios.get(`http://localhost:3001/Temperaments`) 
        .then((res) => {
            dispatch ({
                type: "TEMPERAMENTOS",
                payload: res.data
            })
        })
        .catch((error) => {
        console.log(error);
    });        
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:3001/Dogs`) 
        .then((res) => {
            dispatch ({
                type: "RAZAS_DOGS",
                payload: res.data
            })
        })
        .catch((error) => {
        console.log(error);
    });        
    }, [])

    const pesoSelectedChange = (e) => {
        if (e.target.value === "liviano-pesado") {
            dispatch({
                type: "ordenar-liviano-pesado",
              });
        }
        else if (e.target.value === "pesado-liviano") {
            dispatch({
                type: "ordenar-pesado-liviano",
              });
        }
        setPeso(e.target.value)
    }

    const alfabetSelectedChange = (e) => {
        if(e.target.value === "asc-desc") {
            dispatch({
                type: "ordenar-asc-desc"
            })
        }
        else if (e.target.value === "desc-asc") {
            dispatch ({
                type: "ordenar-desc-asc"
            })
        }
        setOrderAlfabet(e.target.value)
    }
    
    const temperamentChange = (e) => {
        let temperament = e.target.value
        setTemperamentSelected(temperament)
    }
    const razaChange = (e) => {
        let raza = e.target.value
        setRazaSelected(raza)
    }

    const indexDelUltimoItem = currentPage * itemsPorPag
    const indexDelPrimerItem = indexDelUltimoItem - itemsPorPag
    return (
        <div className= "fondo-Home">
            <div>
                <div>
                    <SearchBar />   
                <div>
                    <Link to= "/NewDog"><button className="boton-agregar-perro">New Dog</button></Link>
                </div>      
                </div>
                <div className="container-todos-select"> 
                    <div className= "select-container">
                        <select value= {peso} onChange= {pesoSelectedChange}>
                            <option>Ordenar por peso:</option>
                            <option value="liviano-pesado">Más liviano a más pesado</option>
                            <option value="pesado-liviano">Más pesado a más liviano</option>
                        </select>
                    </div>
                    <div className= "select-container">
                        <select value={orderAlfabet} onChange= {alfabetSelectedChange}>
                            <option>Ordenar alfabeticamente:</option>
                            <option value= "asc-desc">Ascendente a descendente</option>
                            <option value= "desc-asc">Descendente a ascendente</option>
                        </select>
                    </div>
                    <div className= "select-container">
                        <select onChange={temperamentChange} >
                             <option value={''} >Filtrar por temperamento:</option>                               
                            {temperaments.map((el) => (
                             <option value={el.name}>{el.name}</option>                               
                            ))}
                        </select>
                    </div>
                    <div className= "select-container">
                        <select onChange={razaChange} > 
                             <option value={''} >Seleccionar Raza</option>                               
                            {razadogs.map((el) => (
                            <option value={el.name}>{el.name}</option>                                
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <div className="dogs-container">
                {temperamentSelected &&
                    dogs
                    .filter((dog) => dog.temperament?.includes(temperamentSelected) || dog.temperaments?.includes(temperamentSelected) )
                    .slice(indexDelPrimerItem, indexDelUltimoItem)
                    .map((dog) => (
                        <DogCard 
                            img= {dog.image?.url} 
                            name={dog.name} 
                            temperament={dog.temperament}
                            temperaments={dog.temperaments} 
                            id={dog.id}/>
                    ))}
                     {razaSelected &&
                    dogs
                    .filter((dog) => dog.name?.includes(razaSelected))
                    .slice(indexDelPrimerItem, indexDelUltimoItem)
                    .map((dog) => (
                        <DogCard 
                            img= {dog.image?.url} 
                            name={dog.name} 
                            temperament={dog.temperament} 
                            temperaments={dog.temperaments} 
                            id={dog.id}/>
                    ))}
                {!temperamentSelected &&
                    dogs
                    .slice(indexDelPrimerItem, indexDelUltimoItem)                    
                    .map((dog) => (
                        <DogCard 
                            img= {dog.image?.url} 
                            name={dog.name} 
                            temperament={dog.temperament}
                            temperaments={dog.temperaments} 
                            id={dog.id}/>
                    ))}
            </div> 
            <div>
                <Paginacion itemsPorPag={itemsPorPag} totalPosts={dogs.length} paginate={setCurrentPage} />
            </div>  
        </div>
    )
};

export default Home;