import { RecepcionarRequestModel } from "../_models/recepcionarRequest.model";
import { BASE_URL } from "./Globales.service";


export class RecepcionPideService {

  async getEditRecepcionPide(id) {
    const options = {
      method: "GET",
      headers: { 
        "Content-Type": "application/json;charset=UTF-8", 
        "Authorization": `Bearer ${sessionStorage.tokenSession}`
      },      
    }
    return await fetch(BASE_URL + `/recepcion/${id}`, options)
    .then((response) => response.json())
  }

  async getListaRecepcionPide(data) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8", 
        "Authorization": `Bearer ${sessionStorage.tokenSession}`
      },
      body: data      
    }
    return await fetch(BASE_URL + `/recepcion/search`, options)
      .then((response) => {
        return response.json()
      })
  }

  async getListRecepcionDestinoPide(id) {
    const options = {
      method: "GET",
      headers: {"Content-Type": "application/json;charset=UTF-8", 
      "Authorization": `Bearer ${sessionStorage.tokenSession}`},
    }

    return await fetch(BASE_URL + `/recepcion/${id}/destinos`, options)
    .then((response) => response.json());
  }

  async updateListRecepcionDestinoPide(idRecepcion, list) {
    const options = {
      method: "POST",
      headers: {"Content-Type": "application/json;charset=UTF-8", 
      "Authorization": `Bearer ${sessionStorage.tokenSession}`},
      body: JSON.stringify(list)
    }
    return await fetch(BASE_URL + `/recepcion/${idRecepcion}/destinos`, options)
    .then((response) => response.json())
  }

  async getDocumentRepository(idRecepcion, data) {
    const options = {
      method: "POST",
      headers: {"Content-Type": "application/json;charset=UTF-8", 
      "Authorization": `Bearer ${sessionStorage.tokenSession}`},
      body: JSON.stringify(data)
    }

  return await fetch(BASE_URL + `/recepcion/${idRecepcion}/documento`, options)
  .then((response)=> response.json());
  }

  async putCambiarEStado (idRecepcion, idEstadoRecepcion) {
    const options = {
      method: "PUT",
      headers: {"Content-Type": "application/json;charset=UTF-8", 
      "Authorization": `Bearer ${sessionStorage.tokenSession}`},
      body: JSON.stringify({"idEstadoRecepcion": idEstadoRecepcion})
    }
    return await fetch(BASE_URL +`/recepcion/${idRecepcion}/cambiar-estado`, options)
    .then((response) => response.json());
  }

  async putGrabarCambios (idRecepcion, objectRequest) {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Authorization": `Bearer ${sessionStorage.tokenSession}`
      },
      body: JSON.stringify(objectRequest)
    }
    return await fetch(BASE_URL + `/recepcion/${idRecepcion}/grabar-cambios`, options)
    .then((response) => response.json());
  }

  async putFirmar(idRecepcion) {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Authorization": `Bearer ${sessionStorage.tokenSession}`
      }
    }
    return await fetch(BASE_URL +`/recepcion/${idRecepcion}/firmar`, options)
    .then((response) => response.json())
  }

  async recepcionar(idRecepcion, objectRequest) {
    
    let recepcionarRequestModel = new RecepcionarRequestModel();
    let objectR = JSON.parse(objectRequest);
    recepcionarRequestModel.idArchivo = objectR.objeto.metadataTemporalBean.idArchivo;
    recepcionarRequestModel.idExterno = objectR.objeto.metadataTemporalBean.idOrigenExterno;
    recepcionarRequestModel.tokenConfirmacion = objectR.objeto.tokenConfirmacion;
    recepcionarRequestModel.tokenMetadataTemporal = objectR.objeto.tokenMetadataTemporal;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Authorization": `Bearer ${sessionStorage.tokenSession}`
      },
      body: JSON.stringify(recepcionarRequestModel)
    }
    return await fetch(BASE_URL +`/recepcion/${idRecepcion}/recepcionar`, options)
    .then((response) => response.json())
  }
}