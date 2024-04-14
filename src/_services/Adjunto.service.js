import { AttachObjectModel } from "../_models/attachRequest.model";
import { BinaryFileService } from "./BinaryFile.service";

import { BASE_URL } from "./Globales.service";
const binaryFileService = new BinaryFileService();

export class AdjuntoService {


    async getListAdjuntos(idRecepcion) {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json;charset=UTF-8", 
                "Authorization": `Bearer ${sessionStorage.tokenSession}`
            }
        }
        return await fetch(BASE_URL + `/recepcion/${idRecepcion}/adjuntos`, options)
            .then((response) => response.json());
    }

    async getSolicitudCargaAdjunto(data) {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=UTF-8", 
                "Authorization": `Bearer ${sessionStorage.tokenSession}`
            },
            body: JSON.stringify(data)
        }
        return await fetch(BASE_URL + `/adjunto/solicitud-carga`, options)
            .then((response) => response.json());
    }

    async getSolicitudDescargaAdjunto(data) {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=UTF-8", 
                "Authorization": `Bearer ${sessionStorage.tokenSession}`
            },
            body: JSON.stringify(data)
        }
        return await fetch(BASE_URL + `/adjunto/solicitud-descarga`, options)
            .then((response) => response.json());
    }

    async cargarAdjuntosRecepcion(files, objectRequest, idRecepcion) {        
        let listNewFiles = [];
        return new Promise(async (resolve, reject) => {
            await Promise.all(files.map(async (objectFile) => {

                let attachObjectModel = new AttachObjectModel();
                attachObjectModel = Object.assign(attachObjectModel, objectFile);
                delete attachObjectModel.file;
                let formData = new FormData()
                formData.append("file", objectFile.file);
                let responseSolicitud = await this.getSolicitudCargaAdjunto(objectRequest);
                if (!responseSolicitud.exito) {
                    console.log("error solicitando Carga", responseSolicitud.mensaje);
                    reject("error solicitando Carga");
                    return;
                }

                let responseArchivo = await binaryFileService.goGuardarDocumento(responseSolicitud.url, formData);
                if (!responseArchivo.exito) {
                    console.log("error Cargando archivo binario", responseArchivo.mensaje);
                    reject("error Cargando archivo binario");
                    return;
                }

                attachObjectModel.accion = "I";
                attachObjectModel.idArchivo = responseArchivo.objeto.metadataTemporalBean.idArchivo;
                attachObjectModel.idAdjunto = responseArchivo.objeto.metadataTemporalBean.idAdjunto;
                attachObjectModel.idRecepcion = idRecepcion;
                attachObjectModel.tokenConfirmacion = responseArchivo.objeto.tokenConfirmacion;
                listNewFiles.push(attachObjectModel);

            }));
            if (listNewFiles.length > 0)
                resolve(listNewFiles);
            else {
                console.log("la lista esta vacia")
                reject("la lista esta vacia");
            }

        })
    }


    async updateAdjuntoDestino(data, idRecepcion) {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=UTF-8", 
                "Authorization": `Bearer ${sessionStorage.tokenSession}`
            },
            body: JSON.stringify(data)
        }
        return await fetch(BASE_URL + `/recepcion/${idRecepcion}/adjuntos`, options)
            .then((response) => response.json());
    }
}