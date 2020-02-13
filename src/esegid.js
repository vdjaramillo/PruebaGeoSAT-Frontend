import React, { Component } from 'react';
class ESegID extends Component{
    constructor(props){
        super(props);
        this.Cambio = this.Cambio.bind(this);
        this.Enviar = this.Enviar.bind(this);
    }
    state ={
        segmento:{},
        tipos: [],
        estratos: [1,2,3,4,5,6],
    }
    Cambio(evento, attr){
        let segmCopy = JSON.parse(JSON.stringify(this.state.segmento));
        segmCopy[attr] = evento.target.value;
        this.setState({segmento: segmCopy});
      }
    Enviar(evento){
        console.log(this.state.segmento)
        fetch('http://localhost:9000/updateSegmento/', {
            method: 'POST',
            body: JSON.stringify(this.state.segmento),
            headers: {
              'Access-Control-Request-Method':"POST",
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(response => {
              console.log(response)
          })
          evento.preventDefault();
    }
    componentDidMount () {
        const { id } = this.props.match.params
        fetch('http://localhost:9000/getSegmentoById/'+id)
        .then(res => res.json())
        .then((segmento) => {
          this.setState({ segmento })||
          console.log(this.state.segmento)
        })
        .catch(console.log)
        fetch('http://localhost:9000/tipos/')
      .then(res => res.json())
      .then((tipos) => {
        this.setState({ tipos })
      })
      .catch(console.log)
    }    
    render(){
        return(
            <div class="card">
                <table class="table">
                    <tbody>
                        <tr>
                            <td><h4>Nomenclatura:</h4> 
                            </td>
                        </tr>
                        <tr>
                          <td>
                          <select class="browser-default custom-select" value={this.state.segmento.VIA_GENERADORA} onChange={(evento) => this.Cambio(evento,"VIA_GENERADORA")}>
                            {this.state.tipos.map(tipo => (
                            <option key={`tipo_${tipo}`}> {tipo}</option>
                            ))}
                            </select>
                          </td>
                          <td>
                          <input class="form-control" type="number" value={this.state.segmento.N_VIA_GEN} onChange={(evento) => this.Cambio(evento,"N_VIA_GEN")}/>  
                          </td>
                          <td> entre </td>
                          
                          <td>
                          <select class="browser-default custom-select" value={this.state.segmento.CRUCE_DESDE} onChange={(evento) => this.Cambio(evento,"CRUCE_DESDE")}>
                            {this.state.tipos.map(tipo => (
                            <option key={`tipo_${tipo}`}> {tipo}</option>
                            ))}
                            </select>
                          </td>
                          <td>
                          <input class="form-control" type="number" value={this.state.segmento.N_CRUCE_DESDE} onChange={(evento) => this.Cambio(evento,"N_CRUCE_DESDE")}/>  
                          </td>
                          <td> y </td>

                          <td>
                          <select class="browser-default custom-select" value={this.state.segmento.CRUCE_HASTA} onChange={(evento) => this.Cambio(evento,"CRUCE_HASTA")}>
                            {this.state.tipos.map(tipo => (
                            <option key={`tipo_${tipo}`}> {tipo}</option>
                            ))}
                            </select>
                          </td>
                          <td>
                          <input class="form-control" type="number" value={this.state.segmento.N_CRUCE_HASTA} onChange={(evento) => this.Cambio(evento,"N_CRUCE_HASTA")}/>  
                          </td>
                        </tr>
                        <tr>
                            <td><h4>Tipo de vía:</h4> 
                            <select class="browser-default custom-select" value={this.state.segmento.TIPO_VIA} onChange={(evento) => this.Cambio(evento,"TIPO_VIA")}>
                            {this.state.tipos.map(tipo => (
                            <option key={`tipo_${tipo}`}> {tipo}</option>
                            ))}
                            </select>
                            </td>
                            <td><h4>Estrato:</h4>
                            <select class="browser-default custom-select" value={this.state.segmento.ESTRATO} onChange={(evento) => this.Cambio(evento,"ESTRATO")}>
                            {this.state.estratos.map(estrato => (
                            <option key={`estrato_${estrato}`}> {estrato}</option>
                            ))}
                            </select>
                            
                            </td>
                            <td><h4>Longitud:</h4> 
                            <input class="form-control" type="number" value={this.state.segmento.LONGITUD} onChange={(evento) => this.Cambio(evento,"LONGITUD")}/>  
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button class="btn btn-outline" onClick={this.Enviar}>Guardar Modificación</button>
            </div>
        );
    }
}

export default ESegID;