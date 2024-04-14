export class RecepcionarRequestModel {
    constructor(idArchivo, idExterno, tokenConfirmacion, tokenMetadataTemporal){
        this.idArchivo = idArchivo,
        this.idExterno = idExterno,
        this.tokenConfirmacion = tokenConfirmacion,
        this.tokenMetadataTemporal = tokenMetadataTemporal
    }
}