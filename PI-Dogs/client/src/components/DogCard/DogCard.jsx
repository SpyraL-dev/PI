import { Link } from "react-router-dom";
import "./DogCard.css"

function DogCard({name, temperament, id, img, temperaments}) {
 if(temperaments) {
    const solucion= [...temperaments]
    temperament= solucion
     }
  return (
    <Link to={`/dog-detail/${id}`}>
      <div key={id} className="card-container">
          <img className= "img-dog" src= {img} alt=""></img>
          <div className="titulo-dog-container">
            <p className="titulo-card">{name}</p>
            <br />
            <p className="temperamento-card">Temperamento: <br/> <p/>{temperament}</p>            
          </div>
      </div>
    </Link>    
  );
}

export default DogCard;