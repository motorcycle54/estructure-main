<template src="./edit.html"></template>
<script>
import { ref } from "vue";
import {
  inject,
  getCurrentInstance,
  onMounted,
  watchEffect,
} from "@vue/runtime-core";
import { RecepcionPideService } from "../../../_services/RecepcionPide.service";
import { AdjuntoService } from "../../../_services/Adjunto.service";
import { AttachRequestModel, DescargaAdjuntoRequest } from "../../../_models/attachRequest.model";
import { AlertSnackBarService } from '../../../_services/alert-snackBar.service';
import { DocumentRequestModel } from "../../../_models/documentRequest.model"
import { ListDialogService } from '../../../_services/ListDialog.service';
import { EncodePDF } from "@/_services/EncodePDF.service";

export default {
    name: "Edit",
    props: [
      'data_set',
    ],
    setup(props) {

        const { proxy } = getCurrentInstance();
        const adjuntoService = new AdjuntoService();
        const alertSnackBarService = new AlertSnackBarService();
        const recepcionPideService = new RecepcionPideService();
        const listDialogService = new ListDialogService();
        const encodePDF = new EncodePDF();

        let objectSession = proxy.$objectSession;
        let data_set = props.data_set;
        let mostrar_edit = inject("mostrar_edit");
        let files_attached_set = ref([]);
        let lista_dialog = inject("lista_dialog");

        const agregarAdjuntos = async(files) => {      
          let listNewFiles = await adjuntoService.cargarAdjuntosRecepcion(files, objectSession, data_set.idEmision);      
          await updateAdjunto(listNewFiles);      
        } 

        const updateAdjunto = async (listNewFiles) => {      
          let adjuntoRequest = new AttachRequestModel(listNewFiles, objectSession);
          let responseUpdated = await adjuntoService.updateAdjuntoDestino(adjuntoRequest, data_set.idEmision);
          if (!responseUpdated.status) {
            alertSnackBarService.showErrorAlert(responseUpdated.mensaje);
            //console.log("error en update Adjuntos", responseUpdated.mensaje);   
            return;       
          }
          getListaAdjunto();
          alertSnackBarService.showSuccessAlert(responseUpdated.mensaje)
        }

        const openFileAdjunto = (file) => {
          let descargaAdjuntoRequest = new DescargaAdjuntoRequest(file.idArchivo, "WEB");
          adjuntoService.getSolicitudDescargaAdjunto(descargaAdjuntoRequest)
          .then((data)=> {
            if(data.exito){
              listDialogService.openPdf(lista_dialog.value, {id: file.idArchivo, title: "item.title", url: data.url}) 
            }
          });
        } 

        const getListaAdjunto = () => {
          //objInicial.idArchivo = 1
          adjuntoService.getListAdjuntos(data_set.idEmision).then((data) => {        
            if (data.status) {         
              files_attached_set.value.splice(0, files_attached_set.value.length);
              files_attached_set.value.push(...data.data);           
            } else {
              console.log("error obteniendo lista adjuntos", data.mensaje);
            }
          });
        };

        const openDocument = () => {
          let documentRequestModel = new DocumentRequestModel("WEB");
          recepcionPideService
            .getDocumentRepository(data_set.idRecepcion, documentRequestModel)
            .then(async (data) => {
              if (data.exito) {
                
                let fileBase64 = await encodePDF.downloadFile(data.url)
                      
                listDialogService.openPdf(lista_dialog.value, {
                  id: `R-${data_set.idRecepcion}`,
                  title: `N° ${data_set.nuDocumentoAdm}`,
                  url: fileBase64})
                  seguimiento();
                
              } else {
                console.log("error al obtener documento", data.mensaje);
              }
            });
        }

        const seguimiento = () => {
          openSeguimiento.value = true;
        }
        
        return { data_set, mostrar_edit,files_attached_set,agregarAdjuntos,updateAdjunto, openFileAdjunto, openDocument }
    },
    data: () => ( {
        show: false,
        estados_set: [{idEstado: "P", estado: "EN REGISTRO"}, {idEstado: "V", estado: "PARA VERIFICAR"}],
        files: [
        {
          color: 'blue',
          icon: 'mdi-clipboard-text',
          subtitle: 'Jan 20, 2014',
          title: 'Vacation itinerary',
        },
        {
          color: 'amber',
          icon: 'mdi-gesture-tap-button',
          subtitle: 'Jan 10, 2014',
          title: 'Kitchen remodel',
        },
      ]
    })
}
</script>
<style src="./edit.css"></style>
