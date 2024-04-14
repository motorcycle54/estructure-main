import { WSClientRequestModel } from '../../_models/wsClientRequest.model'
let wsObj = null;
let appSO = "";
let messageWS = "";
export let conectado = false;
export class WSClientMPFN {

    abrirCliente = () => {
        console.log("....abrir Cliente....");
        let ua = navigator.userAgent.toLowerCase();
        let isAndroid = ua.indexOf("android") > -1;
        if (isAndroid) {
            //window.location.assign('intent://#Intent;package=pe.gob.sgd.clientews;scheme=SGDPJ;end;');
            window.location.assign('intent://#Intent;package=pe.gob.sgd.clientews;scheme=CLIMPFN;end;');
        } else {
            //window.location.assign('SGDPJ://.');
            window.location.assign('CLIMPFN://.');
        }
    };

    openConectionCliente = async () => {
        return new Promise((resolve, reject) => {
            console.log("....1-conectando....", conectado);
            if (conectado) return;

            wsObj = new WebSocket("ws://localhost:8885");
            wsObj.onopen = (evt) => {
                console.log("c.1-Conexión establecida: ", evt);                
                resolve({ "conectado": true });
            };
            wsObj.onmessage = (evt) => {
                console.log("c.2-Mensaje Recibido: ", evt);
                messageWS = JSON.parse(evt.data);
                
            };
            wsObj.onerror = (evt) => {
                console.error("c.3-Error de Websocket: ", evt);
                let target = evt.target;
                if (target.readyState === WebSocket.CLOSED) {
                    resolve({ "conectado": false });
                }
            };
            wsObj.onclose = () => {
                console.log("c.4-Desconectado de Websockets.", evt);
                resolve({ "conectado": false });
            };
        })
    };

    sendMessageWS = async(msg, accion) => {
        messageWS = ""
        //nrOperacion = Math.round(Math.random() * 0x1000000);    
        //var msg = '{"message":' + msg + ', "sender":"", "destination":"' + wsDestino + '" ,"accion":"'+accion+'" ,"nrOperacion":"'+nrOperacion+'"}';    
        console.log(accion, msg);
        wsObj.send(JSON.stringify(msg));

        const msgResponse = await this.getMessageWS();
        return msgResponse.messageWS;
    }

    getMessageWS = async() =>{
        return new Promise((resolve, reject) => {
            setTimeout(()=>{
                if(messageWS){
                    resolve({"messageWS": messageWS});
                }else{
                    reject({"messageErr": "no se pudo recuperar respuesta"})
                }
            }, 1000)            
        });
    }

    setPCData = async() => {
        if(!appSO){
            let wsClientRequestModel = new WSClientRequestModel('getInfo');
            let msg = await this.sendMessageWS(wsClientRequestModel, "INFO");
            appSO = JSON.parse(msg.message).os;
        }
    }

    firmarDocDesktop = async(wsClientRequestModel) => {        
        wsClientRequestModel.command = (appSO === "Windows") ? "downloadAndSign" : "downloadAndOpen";        
        try {
            //console.log(JSON.stringify(param));
            return await this.sendMessageWS(wsClientRequestModel, "EJECUTAR_FIRMA");
        } catch (ex) {
            //alert("Fallo en abrir el documento");
            console.log(ex.message);
        }
    }

    verificarSiExiste = async (wsClientRequestModel) => {  
        wsClientRequestModel.command = "checkFile";
        try {
            return await this.sendMessageWS(wsClientRequestModel, "VERIFICAR_EXISTE_DOC");
        } catch (ex) {
            console.log(ex.message);
        }
    };

    cargarDocFirmadoDesktop = async(wsClientRequestModel) => {
        wsClientRequestModel.command = "uploadMultipart";
        try {
            return await this.sendMessageWS(wsClientRequestModel, "CARGAR_DOCUMENTO");
        } catch (ex) {
            console.log(ex.message);
        }
    };


}