import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import "../DogDetails/DogDetail.css"
import "./NewDog.css"
import axios from "axios"

function AgregarPerro() {
  const dispatch = useDispatch();
  const temperamentos = useSelector((state) => state.temperaments);
  const [NewDog, setNewDog] = useState({name: "",  height:"",  weight:""})
  const [temperamentoUltimo, setTemperamentoUltimo] = useState([])
  const [creatingTemperament, setCreatingTemperament] = useState([])
  const [name, setname] = useState({name:""})

  const newnamechange =(e)=>{
      const {value} = e.target
      setname(value)
  }
  const selectedChange = (e) => {
      const {name, value} = e.target;
      setNewDog({...NewDog, [name]:value})
    }
    
    const selectedChangeTemperament = (e) => {
        let {value} = e.target
      setTemperamentoUltimo([...temperamentoUltimo ,{ name: value}])
      console.log(temperamentoUltimo)
  }

  const AgregarNuevoPerro = () => {
    let temperaments = [...temperamentoUltimo.map(el=>el.name)]
    if(NewDog.name.length<1)throw alert("EL nombre no puede estar en blanco");
    if(NewDog.height.length<1)throw alert("La altura no puede estar en blanco");
    if(NewDog.weight.length<1)throw alert("EL peso no puede estar blanco");
    axios.post(`http://localhost:3001/Dogs/NewDog`, {...NewDog, temperaments})
        .then((res) => {
           console.log(res)          
           alert("Perro creado")
        })
        .catch((error) => {
            console.log(error)
            alert("No se pudo crear el perro")
    });
  }

  const handleSubmit = (e) => {
      e.preventDefault();
      console.log(e)
  }

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

  const crearTemperamento = () => {
    if(name.length<1)throw alert("EL temperamento no puede estar en blanco")
    axios.post(`http://localhost:3001/Temperaments/NewTemperament`, {name})
    .then((res) => {
        alert("Temperamento creado")
        dispatch({
            type: "TEMPERAMENTOS",
            payload: [...temperamentos, res.data],
        })         
    })
    .catch((error) => {
        console.log(error)
  });
  }

    return (
        <div className= "fondo-dog-detail">
            <div className= "container-amarilloo">
                <div className="tabs">
                    <button className= "boton-agregar-temp" 
                            onClick={() => setCreatingTemperament(!creatingTemperament)}>
                        {!creatingTemperament ? 'Volver' : 'Crear temperamento'}
                    </button>
                </div>
                {!creatingTemperament ? (
                    <div className= "agregar-temperamento">
                        <form onSubmit= {handleSubmit}>
                            <div>                       
                                <input type="text" placeholder="Temperamento" value={name.name} onChange={newnamechange} />
                            </div>
                            <button className="boton-agregar" onClick={crearTemperamento}>Agregar</button>
                        </form>
                    </div>
                )
                :
                (
                    <form className= "agregarPerro" onSubmit={handleSubmit}>
                        <div className= "container-desc-img">
                            <div className= "container-img">
                            </div>
                            <div className="descripcion-perro">
                                <p> Nombre:
                                    <input 
                                        name= "name" 
                                        value={NewDog.name} 
                                        onChange={selectedChange} 
                                        placeholder="nombre"/>
                                </p>
                                <div>
                                    <p>Temperamentos:</p> 
                                        <div className="temperaments-conteiner">
                                          {temperamentos.map((el) => (  
                                                <div>
                                                    <input
                                                        type="checkbox" 
                                                        name="temperament" 
                                                        value={el.name}
                                                        id={el.ID}
                                                        onChange={selectedChangeTemperament}/>
                                                    <label htmlFor="temperament">{el.name}</label>
                                                </div>
                                            ))}                                                  
                                        </div>                                                                     
                                    <p> 
                                    Altura:
                                        <input 
                                            name="height"
                                            value={NewDog.height} 
                                            onChange={selectedChange} 
                                            placeholder="altura"/> cm.
                                    </p>
                                    <p> Peso:
                                        <input 
                                            name="weight"
                                            value={NewDog.weight} 
                                            onChange={selectedChange} 
                                            placeholder="peso"/> kg.
                                    </p>
                                </div>
                                <div>
                                    <button className= "boton-agregar-perroo" onClick={AgregarNuevoPerro}>Agregar perro</button>
                                </div>
                            </div>                                           
                        </div>
                    </form>
                )}
            </div>
        </div>
    )
}

export default AgregarPerro
