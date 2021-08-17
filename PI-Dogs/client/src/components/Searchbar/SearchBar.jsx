import { useState } from "react"
import axios from "axios"
import { useDispatch } from "react-redux";
import "./SearchBar.css"

function SearchBar() {
    const dispatch = useDispatch();
    const [buscar, setBuscar] = useState("");

    function handleChange(e) {
        setBuscar(e.target.value);
    }

    const handleKeyDown = ({ keyCode }) => {
    if (keyCode !== 13) return null;
    else {     
        axios.get(`http://localhost:3001/Dogs/search?name=${buscar}`) 
        .then((res) => {
            if(res.data.length === 0) alert("No se encontró el perro")
            else {
            dispatch({
                type: "SEARCH_DOGS",
                payload: res.data,
            })           
            }
        })
        .catch((error) => {
            console.log(error);
            alert("No se encontró el perro")
        });
    }
    };
    const Alldogs = ({e})=>{
        axios.get(`http://localhost:3001/Dogs`) 
        .then((res) => {
            if(res.data.length === 0) alert("error en GET/")
            else {
            dispatch({
                type: "SEARCH_DOGS",
                payload: res.data,
            })           
            }
        })
        .catch((error) => {
            console.log(error);
            alert("error en GET/")
        });
    }
    const CreatedDogs =({e})=>{
        axios.get(`http://localhost:3001/Dogs/CreatedDogs`) 
        .then((res) => {
            if(res.data.length === 0) alert("No se encontraron perros creados")
            else {
            dispatch({
                type: "SEARCH_DOGS",
                payload: res.data,
            })           
            }
        })
        .catch((error) => {
            console.log(error);
            alert("No se encontró el perro")
        });
    }
    return (
        <div>
            <form onSubmit={(e) => e.preventDefault()}>
                <input
                    className= "searchbar"
                    placeholder="Buscar perros"
                    value={buscar}
                    onChange={handleChange}        //a medida que cambia
                    onKeyDown={handleKeyDown}>
                </input>
            </form>
            <div>
                <button onClick={Alldogs}>All Dogs</button>
                <button onClick={CreatedDogs}>Created Dogs</button>
            </div>
        </div>
    )
}

export default SearchBar
