export class AttachRequestModel {
    constructor(lista, usuario){
        this.lista = lista;
        this.usuario = usuario;        
    }
}

export class AttachObjectModel {
    constructor(accion, deArchivo, idAdjunto, idArchivo, idRecepcion, noArchivo, tokenConfirmacion){
        this.accion = accion;
        this.deArchivo = deArchivo;
        this.idAdjunto = idAdjunto;
        this.idArchivo = idArchivo;
        this.idRecepcion = idRecepcion;
        this.noArchivo = noArchivo;
        this.tokenConfirmacion = tokenConfirmacion;
    }
}

export class DescargaAdjuntoRequest {
    constructor(idArchivo, modalidad){
        this.idArchivo = idArchivo;
        this.idOrigenExterno = 0;
        this.modalidad = modalidad;
        this.usuario = {}
    }
}