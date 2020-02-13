import React, { Component } from 'react';
class ESeg extends Component{
    state = {
        segmentos: []
    }
    Eliminar(ID){
        fetch('http://localhost:9000/delSegmento/'+ID)
        .then(res => console.log(res))
        .catch(console.log)
        alert("El segmento: "+ID+" ha sido eliminado")
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
        return(
          <div class="card">
              <table class="table">
                <tbody>
                      <tr>
                          <td>ID</td>
                          <td>Nomenclatura</td>
                          <td>Longitud</td>
                          <td>Estrato</td>
                          <td>Editar</td>
                          <td>Eliminar</td>
                          
                      </tr>
              {this.state.segmentos.map((segmento)=>(
                <tr key={segmento.ID}>
                    <td>{segmento.ID}</td>
                    <td>{segmento.NOMENCLATURA}</td>
                    <td>{segmento.LONGITUD}</td>
                    <td>{segmento.ESTRATO}</td>
                    <td><center><a href={"/editar/"+segmento.ID}><h2>&Lambda;</h2></a></center></td>
                    <td><center><button onClick={(evento) => this.Eliminar(segmento.ID)}><h1>&#215;</h1></button></center></td>
                </tr>  
              ))}
              </tbody> 
              </table>
          </div>
        )
      }
}

export default ESeg