import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Segmentos from './segmentos';
import CSeg from './cseg';
import ESegID from './esegid';
import ESeg from './eseg';
class Seg extends Component {
  state = {
    segmentos: []
  }
  componentDidMount(){
    fetch('http://localhost:9000/getSegmentos/')
    .then(res => res.json())
    .then((segmentos) => {
      this.setState({ segmentos })
    })
    .catch(console.log)
  }
  render(){
    return(<Segmentos segmentos={this.state.segmentos}/>   
      );
  }
}
class App extends Component {
  
  render(){
    return(
      <Router>
      <div className={"site-content"}>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <ul class="navbar-nav">
            <li class="nav-item">
              <Link to="/listar_segmentos/">Lista de Segmentos</Link>
            </li>
            <li class="nav-item">
              <Link to="/crear_segmento/">Crear Segmento</Link>
            </li>
            <li class="nav-item">
              <Link to="/editar_segmento/">Editar Segmento</Link>
            </li>
          </ul>
        </nav>
        <Route path="/listar_segmentos/" component={Seg} />
        <Route path="/crear_segmento/" component={CSeg} />
        <Route path="/editar_segmento/" component={ESeg} />
        <Route path="/editar/:id" component={ESegID} />
      </div>
    </Router>
    )
  }
}

export default App;
