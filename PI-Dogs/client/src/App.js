import Home from "./components/Home/Home"
import Landing from "./components/Landing/Landing"
import { Route, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import DogDetail from "./components/DogDetails/DogDetail";
import NewDog from "./components/NewDogs/NewDog";
import About from "./components/About/about";
import Nav from "./components/Navbar/navbar";

function App() {
  return (
    <div className="App">
      <Router>
          <Route  path='/' component={Nav}/>
          <Route exact path='/' component={Landing}/>
          <Route exact path='/Home' component={Home}/>
          <Route exact path='/About' component={About}/>
          <Route exact path= '/dog-detail/:id' component= {DogDetail}/>
          <Route exact path= "/NewDog" component= {NewDog}/>
      </Router>
    </div>
  );
}

export default App;