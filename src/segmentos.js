import React from 'react'
const Segmentos = ({ segmentos }) => {
    return(
        <div>
            <center><h2>Lista de segmentos</h2></center>
            {segmentos.map((segmento) =>(
                <div class="card">
                    <table class="table">
                        <tbody>
                            <tr>
                                <td><h4>Segmento:</h4> {segmento.ID}</td>
                                <td><h4>Nomenclatura:</h4> {segmento.NOMENCLATURA}</td>
                            </tr>
                            <tr>
                                <td><h4>Tipo de vía:</h4> {segmento.TIPO_VIA}</td>
                                <td><h4>Estrato:</h4> {segmento.ESTRATO}</td>
                                <td><h4>Longitud:</h4> {segmento.LONGITUD}</td>
                            </tr>
                        </tbody>
                    </table>
                    <table class="table">
                      <thead><h3>Calzadas</h3>
                        <tr>
                                <td><h5>Funcionalidad</h5></td>
                                <td><h5>Superficie</h5></td>
                                <td><h5>IRI</h5></td>
                                <td><h5>OPI</h5></td>
                                <td><h5>MDR</h5></td>
                            </tr>
                      </thead>
                        <tbody>
                        {segmento.CALZADAS.map((calzada)=>(
                            <tr>
                                <td>{calzada.FUNCIONALIDAD}</td>
                                <td>{calzada.SUPERFICIE}</td>
                                <td>{calzada.IRI}</td>
                                <td>{calzada.OPI}</td>
                                <td>{calzada.MDR}</td>
                            </tr>
                        ))}
                        </tbody>
                        </table>                          
                        
                        <table class="table">
                        <thead><h3>Bordillos</h3>
                        
                        <tr>
                            <td><h5>Estado</h5></td>
                            <td><h5>Orden</h5></td>
                            <td><h5>Longitud</h5></td>
                            <td><h5>Indice de condición</h5></td>
                        </tr>
                        </thead>
                        
                        <tbody>
                    {segmento.BORDILLOS.map((bordillo)=>(
                        <tr>
                            <td>{bordillo.ESTADO}</td>
                            <td>{bordillo.ORDEN}</td>
                            <td>{bordillo.LONGITUD}</td>
                            <td>{bordillo.INDICE_CONDICION}</td>
                        </tr>
                        ))}
                        </tbody>
                        </table>  
                    <br/>
                </div>
            ))}
        </div>
    )
};
export default Segmentos