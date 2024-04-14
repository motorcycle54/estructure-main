export class RecepcionRequestModel {
    constructor(asunto, idRecepcion, idTipoDocumentoAdm, nuDocumentoAdm, observacion, inObservado){
        this.asunto = asunto;
        this.idRecepcion = idRecepcion;
        this.idTipoDocumentoAdm = idTipoDocumentoAdm;
        this.nuDocumentoAdm = nuDocumentoAdm;
        this.observacion = observacion;
        this.inObservado = inObservado;
    }
}