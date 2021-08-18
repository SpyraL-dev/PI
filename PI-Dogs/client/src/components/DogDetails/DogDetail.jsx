import { useParams } from "react-router-dom"
import {useState, useEffect} from "react"
import foto from "../imgs/Newdog.png"
import axios from "axios"
import "./DogDetail.css"

function DogDetail() {
    const [dogDetail, setDogDetail] = useState({name: "", temperament: "", weight: "", height: "", fotoid: ""})
    let {id} = useParams()

    useEffect(() => {
        traerDetalles()
    })

    const traerDetalles = () => {
        axios.get(`http://localhost:3001/Dogs/${id}`) 
        .then((res) => {
            if(id.length < 4){
                setDogDetail({
                    name: res.data.name,
                    temperament: res.data.temperament,
                    height:"("+ res.data.height?.metric + ")  cm" || res.data.height + " cm",
                    weight:"("+ res.data.weight?.metric+ ") Kg" || res.data.weight + " Kg",
                    fotoid: res.data.image?.url
                })
            }else{
                setDogDetail({
                    name: res.data.name,
                    temperament:res.data.temperaments,
                    height: res.data.height + " cm",
                    weight: res.data.weight + " Kg",
                    fotoid: res.data.image?.url
                })
            }
            })
            .catch((error) => {
                console.log(error);
            }); 
    } 

    return (
        <div className= "fondo-dog-detail">
            <div className= "container-amarillo">
                <div className= "container-img">
                    <img className= "img-perro" src={dogDetail.fotoid} alt= ""></img>
                </div>
                <div className="descripcion-perro">
                    <p> Breed : {dogDetail.name}</p>
                    <div>
                        <p>Temperaments: {dogDetail.temperament}</p>
                        <p>Height:{dogDetail.height}</p>
                        <p>Weight: {dogDetail.weight}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DogDetail
