export class WSClientRequestModel {
    constructor(command, target, url, param, replace){
        this.command = command;
        this.target = target;
        this.url = url;
        this.param = param;
        this.replace = replace;
    }
}

export var accionOnDesktopTramiteDoc = {
    ejecutaFirma: 1,
    abrirDocumento: 2,
    abrirDocumentoPC: 3,
    cargarDocumento: 4,
    generaDocumento: 5,
    verificaSiExisteDoc: 6,
    getDirectorio: 7,
    abrirRutaDocs: 8,
    verificarRutaDirectorio: 9
};