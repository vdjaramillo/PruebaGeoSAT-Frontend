import React, { Component } from 'react';

class CSeg extends Component{
    constructor(props){
        super(props);
        this.Cambio = this.Cambio.bind(this);
        this.CambioC = this.CambioC.bind(this);
        this.CambioB = this.CambioB.bind(this);
        this.CambioFS = this.CambioFS.bind(this);
        this.CambioE = this.CambioE.bind(this);
        this.CambioNom = this.CambioNom.bind(this);
        this.NCalzadas = this.NCalzadas.bind(this);
        this.NBordillos = this.NBordillos.bind(this);
        this.Enviar = this.Enviar.bind(this);
    }
    state = {
      tipos: [],
      estratos: [1,2,3,4,5,6],
      nomenclatura:{
        VIA_GENERADORA:"Carrera",
        N_VIA_GEN:0,
        CRUCE_DESDE: "Carrera",
        N_CRUCE_DESDE:0,
        CRUCE_HASTA: "Carrera",
        N_CRUCE_HASTA: 0
      },
      calzada:{
        IRI:0,
        FUNCIONALIDAD: 1,
        OPI:0,
        MDR:0,
        SUPERFICIE:1,
      },
      bordillo:{
        ESTADO: 1,
        ORDEN: 0,
        LONGITUD: 0,
        INDICE_CONDICION:0 
      },
      segm: {
        "TIPO_VIA": "Carrera",
        "ESTRATO": 1,
        "NOMENCLATURA": "",
        "CALZADAS": [],
        "ID": -1,
        "LONGITUD": 0,
        "BORDILLOS": []
      },
      estados:[],
      funcionalidades:[],
      superficies:[]
    }
    CambioNom(evento,attr){
      let nomenclaturaC = JSON.parse(JSON.stringify(this.state.nomenclatura));
      nomenclaturaC[attr] = evento.target.value;
      this.setState({nomenclatura: nomenclaturaC});
    }
    Cambio(evento, attr){
      let segmCopy = JSON.parse(JSON.stringify(this.state.segm));
      segmCopy[attr] = evento.target.value;
      this.setState({segm: segmCopy});
    }
    CambioFS(evento, attr){
      let calzadaC = JSON.parse(JSON.stringify(this.state.calzada));
      calzadaC[attr] = evento.target.options.selectedIndex+1;
      this.setState({calzada: calzadaC});
    }
    CambioE(evento, arr, attr){
      let bordilloC = JSON.parse(JSON.stringify(this.state.bordillo));
      bordilloC[attr] = evento.target.options.selectedIndex+1;
      this.setState({bordillo: bordilloC});
    }
    Enviar(evento){
      let segm = JSON.parse(JSON.stringify(this.state.segm));
      segm["NOMENCLATURA"] = this.state.nomenclatura;
      console.log(JSON.stringify(segm))
      fetch('http://localhost:9000/newSegmento/', {
        method: 'POST',
        body: JSON.stringify(segm),
        headers: {
          'Access-Control-Request-Method':"POST",
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(response => {
          console.log(response)
      })
      evento.preventDefault();
    }
    NCalzadas(){
        let calzada1 = this.state.calzada;
        let segmCopy = this.state.segm;
        segmCopy["CALZADAS"].push(calzada1);
        this.setState({segm:JSON.parse(JSON.stringify(this.state.segm))});
        calzada1.FUNCIONALIDAD = 1;
        calzada1.SUPERFICIE = 1;
        calzada1.IRI = 0;
        calzada1.MDR = 0;
        calzada1.OPI = 0;
        this.setState({calzada:calzada1});
    }
    CambioC(evento, attr){
      let calzadaC = this.state.calzada;
      calzadaC[attr] = evento.target.value;
      this.setState({calzada:calzadaC});
    }
    NBordillos(){
      let bordilloC = this.state.bordillo;
      let segmCopy = this.state.segm;
      segmCopy["BORDILLOS"].push(bordilloC)
      this.setState({segm:JSON.parse(JSON.stringify(this.state.segm))});
      bordilloC.ESTADO=1;
      bordilloC.INDICE_CONDICION=0;
      bordilloC.LONGITUD=0;
      bordilloC.ORDEN=0;
      this.setState({bordillo: bordilloC});  
    }
    CambioB(evento, attr){
      let bordilloC = this.state.bordillo;
      bordilloC[attr] = evento.target.value;
      this.setState({bordillo:bordilloC});
    }
    componentDidMount(){
      fetch('http://localhost:9000/E/')
      .then(res => res.json())
      .then((estados) => {
        this.setState({ estados })
      })
      .catch(console.log)

      fetch('http://localhost:9000/F/')
      .then(res => res.json())
      .then((funcionalidades) => {
        this.setState({ funcionalidades })
      })
      .catch(console.log)

      fetch('http://localhost:9000/S/')
      .then(res => res.json())
      .then((superficies) => {
        this.setState({ superficies })
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
        <div>
          <center><h2>Crear Segmento</h2></center>
          <div class="card">
                    <table class="table">
                        <tbody>
                            <tr>
                                <td><h4>Nomenclatura:</h4> 
                                </td>
                            </tr>
                            <tr>
                              <td>
                              <select class="browser-default custom-select" value={this.state.nomenclatura.VIA_GENERADORA} onChange={(evento) => this.CambioNom(evento,"VIA_GENERADORA")}>
                                {this.state.tipos.map(tipo => (
                                <option key={`tipo_${tipo}`}> {tipo}</option>
                                ))}
                                </select>
                              </td>
                              <td>
                              <input class="form-control" type="number" value={this.state.nomenclatura.N_VIA_GEN} onChange={(evento) => this.CambioNom(evento,"N_VIA_GEN")}/>  
                              </td>
                              <td> entre </td>
                              
                              <td>
                              <select class="browser-default custom-select" value={this.state.nomenclatura.CRUCE_DESDE} onChange={(evento) => this.CambioNom(evento,"CRUCE_DESDE")}>
                                {this.state.tipos.map(tipo => (
                                <option key={`tipo_${tipo}`}> {tipo}</option>
                                ))}
                                </select>
                              </td>
                              <td>
                              <input class="form-control" type="number" value={this.state.nomenclatura.N_CRUCE_DESDE} onChange={(evento) => this.CambioNom(evento,"N_CRUCE_DESDE")}/>  
                              </td>
                              <td> y </td>

                              <td>
                              <select class="browser-default custom-select" value={this.state.nomenclatura.CRUCE_HASTA} onChange={(evento) => this.CambioNom(evento,"CRUCE_HASTA")}>
                                {this.state.tipos.map(tipo => (
                                <option key={`tipo_${tipo}`}> {tipo}</option>
                                ))}
                                </select>
                              </td>
                              <td>
                              <input class="form-control" type="number" value={this.state.nomenclatura.N_CRUCE_HASTA} onChange={(evento) => this.CambioNom(evento,"N_CRUCE_HASTA")}/>  
                              </td>
                            </tr>
                            <tr>
                                <td><h4>Tipo de vía:</h4> 
                                <select class="browser-default custom-select" value={this.state.segm.TIPO_VIA} onChange={(evento) => this.Cambio(evento,"TIPO_VIA")}>
                                {this.state.tipos.map(tipo => (
                                <option key={`tipo_${tipo}`}> {tipo}</option>
                                ))}
                                </select>
                                </td>
                                <td><h4>Estrato:</h4>
                                <select class="browser-default custom-select" value={this.state.segm.ESTRATO} onChange={(evento) => this.Cambio(evento,"ESTRATO")}>
                                {this.state.estratos.map(estrato => (
                                <option key={`estrato_${estrato}`}> {estrato}</option>
                                ))}
                                </select>
                                
                                </td>
                                <td><h4>Longitud:</h4> 
                                <input class="form-control" type="number" value={this.state.segm.LONGITUD} onChange={(evento) => this.Cambio(evento,"LONGITUD")}/>  
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table class="table">
                      <thead>
                        <tr><td><h3>Calzadas</h3></td></tr>
                        
                        <tr>
                                <td><h5>Funcionalidad</h5></td>
                                <td><h5>Superficie</h5></td>
                                <td><h5>IRI</h5></td>
                                <td><h5>OPI</h5></td>
                                <td><h5>MDR</h5></td>
                            </tr>
                      </thead>
                        <tbody id="tcalzadas">
                        {this.state.segm.CALZADAS.map((calzada)=>(
                            <tr>
                            <td>{calzada.FUNCIONALIDAD}</td>
                            <td>{calzada.SUPERFICIE}</td>
                            <td>{calzada.IRI}</td>
                            <td>{calzada.OPI}</td>
                            <td>{calzada.MDR}</td>
                            </tr>
                        ))}
                        <tr>
                            <td>
                                <select onChange={(evento)=>this.CambioFS(evento,"FUNCIONALIDAD")} class="browser-default custom-select">
                                {this.state.funcionalidades.map(fun =>(
                                    <option key={`${fun.ID}`} >{fun.FUNCIONALIDAD}</option>
                                ))}
                                </select>
                            </td>
                            <td>
                            <select onChange={(evento)=>this.CambioFS(evento,"SUPERFICIE")} class="browser-default custom-select">
                                {this.state.superficies.map(sup =>(
                                    <option key={`${sup.ID}`} >{sup.SUPERFICIE}</option>
                                ))}
                                </select>
                            </td>
                            <td><input onChange={(iri)=>this.CambioC(iri,"IRI")} class="form-control" type="number" value={this.state.calzada.IRI} />  
                            </td>
                            <td>
                            <input onChange={(opi)=>this.CambioC(opi,"OPI")} class="form-control" type="number" value={this.state.calzada.OPI} />
                            </td>
                            <td>
                            <input onChange={(mdr)=>this.CambioC(mdr,"MDR")} class="form-control" type="number" value={this.state.calzada.MDR} />

                            </td>
                            </tr>
                            <tr>
                              <td>
                              <button class="btn btn-outline-secondary" onClick={this.NCalzadas}>Agregar Calzada</button>
                              </td>
                            
                            </tr>
                        </tbody>
                        </table>                          
                        
                        <table class="table">
                        <thead>
                          <tr>
                          <td><h3>Bordillos</h3></td>
                          </tr>
                        <tr>
                            <td><h5>Estado</h5></td>
                            <td><h5>Orden</h5></td>
                            <td><h5>Longitud</h5></td>
                            <td><h5>Indice de condición</h5></td>
                        </tr>
                        </thead>
                        
                        <tbody>
                          {this.state.segm.BORDILLOS.map(bordillo => (
                            <tr>
                              <td>{bordillo.ESTADO}</td>
                              <td>{bordillo.ORDEN}</td>
                              <td>{bordillo.LONGITUD}</td>
                              <td>{bordillo.INDICE_CONDICION}</td>
                            </tr>
                            
                          ))}
                        <tr>
                            <td><select onChange={(evento)=>this.CambioE(evento,"ESTADO")} class="browser-default custom-select">>
                              {this.state.estados.map(estado =>(
                                <option key={`${estado.ID}`}>{estado.ESTADO}</option>
                              ))}
                              </select></td>
                            <td>
                              <input onChange={(evento)=>this.CambioB(evento,"ORDEN")} class="form-control" type="number" value={this.state.bordillo.ORDEN} />
                            </td>
                            <td>
                            <input onChange={(evento)=>this.CambioB(evento,"LONGITUD")} class="form-control" type="number" value={this.state.bordillo.LONGITUD} />
                            </td>
                            <td>
                            <input onChange={(evento)=>this.CambioB(evento,"INDICE_CONDICION")} class="form-control" type="number" value={this.state.bordillo.INDICE_CONDICION} />
                            </td>
                        </tr>
                        <tr>
                          <td>
                          <button class="btn btn-outline-secondary" onClick={this.NBordillos}>Agregar Bordillo</button>
                          </td>
                        </tr>
                        </tbody>
                        
                        
                        </table>
                        <button class="btn btn-outline" onClick={this.Enviar}>Crear</button>
                          
                    <br/>
                </div>
        </div>
        );
    }
  }
  export default CSeg