<template src="./edit.html"></template>
<script>
import { ref, reactive } from "@vue/reactivity";
import {
  inject,
  getCurrentInstance,
  onMounted,
  watchEffect,
  provide,
} from "@vue/runtime-core";
import { RecepcionPideService } from "../../../_services/RecepcionPide.service";
import { AdjuntoService } from "../../../_services/Adjunto.service";
import {
  AttachRequestModel,
  DescargaAdjuntoRequest,
} from "../../../_models/attachRequest.model";
import { DocumentRequestModel } from "../../../_models/documentRequest.model";
import { RecepcionRequestModel } from "../../../_models/recepcionRequest.model";
import { ListDialogService } from "../../../_services/ListDialog.service";
import { WSClientMPFN } from "../../../plugins/ws/wsClientMPFN";
import { WSClientRequestModel } from "../../../_models/wsClientRequest.model";
import { AlertSnackBarService } from "../../../_services/alert-snackBar.service";
import { EncodePDF } from "../../../_services/EncodePDF.service"

export default {
  name: "Edit",
  props: {
    data_set: {
      type: Object,
      required: true,
    },
  },
  components: {},
  mounted() {},
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    const recepcionPideService = new RecepcionPideService();
    const adjuntoService = new AdjuntoService();
    const listDialogService = new ListDialogService();
    const wsClientTramiteDoc = new WSClientMPFN();

    const alertSnackBarService = new AlertSnackBarService();

    const encodePDF = new EncodePDF();

    let cargaDestinos = ref(false);

    let data_set = ref(props.data_set);
    let mostrar_edit = inject("mostrar_edit");
    let lista_dialog = inject("lista_dialog");
    let files_attached_set = ref([]);
    let files_anexos_set = ref([]);
    let cargaDocFirmado;
    let showBtnFirmar = ref(props.data_set.idEstado == "V");
    let showBtnCargar = ref(false);

    let openConexion = inject("open_conexion");

    onMounted(() => {
      document
        .getElementById("link")
        .setAttribute("href", data_set.value.urlAnexos);
      getListaAdjunto();
    });

    const getListaAdjunto = () => {
      adjuntoService
        .getListAdjuntos(data_set.value.idRecepcion)
        .then((data) => {
          if (data.status) {
            files_attached_set.value.splice(0, files_attached_set.value.length);
            files_attached_set.value.push(...data.data);
          } else {
            console.log("error obteniendo lista adjuntos", data.mensaje);
          }
        });
    };

    const agregarAdjuntos = async (files) => {
      let listNewFiles = await adjuntoService.cargarAdjuntosRecepcion(
        files,
        data_set.value.idRecepcion
      );
      await updateAdjunto(listNewFiles);
    };

    const updateAdjunto = async (listNewFiles) => {
      let adjuntoRequest = new AttachRequestModel(listNewFiles);

      let responseUpdated = await adjuntoService.updateAdjuntoDestino(
        adjuntoRequest,
        data_set.value.idRecepcion
      );
      if (!responseUpdated.status) {
        alertSnackBarService.showErrorAlert(responseUpdated.mensaje);
        return;
      }
      getListaAdjunto();
      alertSnackBarService.showSuccessAlert(responseUpdated.mensaje);
    };

    const openFileAdjunto = (file) => {
      
      let descargaAdjuntoRequest = new DescargaAdjuntoRequest(
        file.idArchivo,
        "WEB"
      );
      adjuntoService
        .getSolicitudDescargaAdjunto(descargaAdjuntoRequest)
        .then(async (data) => {
          if (data.exito) {
            let fileBase64 = await  encodePDF.downloadFile(data.url)
            listDialogService.openPdf(lista_dialog.value, {
              id: file.idArchivo,
              title: file.noArchivo,  
              url: fileBase64,
            });
            seguimiento();
          }
        });
    };

    const openDocument = () => {
      
      let documentRequestModel = new DocumentRequestModel("WEB");
      recepcionPideService
        .getDocumentRepository(data_set.value.idRecepcion, documentRequestModel)
        .then(async (data) => {
          if (data.exito) {
            
            let fileBase64 = await encodePDF.downloadFile(data.url)
                  
            listDialogService.openPdf(lista_dialog.value, {
              id: `R-${data_set.value.idRecepcion}`,
              title: `N° ${data_set.value.nuDocumentoAdm}`,
              url: fileBase64})
              seguimiento();
            
          } else {
            console.log("error al obtener documento", data.mensaje);
          }
        });
        
      };

    const updateEstado = (objEstado) => {
      if (data_set.value.nuAnexos > files_attached_set.value.length) {
        console.log(
          `Debe Adjuntar los documenos del link ${data_set.value.urlAnexos}`
        );
        return;
      }
      recepcionPideService
        .putCambiarEStado(data_set.value.idRecepcion, objEstado.id)
        .then((data) => {
          if (data.status) {
            alertSnackBae.data.datarService.showSuccessAlert(data.mensaje);
            data_set.value.idEstado = objEstado.id;
            data_set.value.estado = objEstado.desc;
            if (data_set.value.idEstado == "V") showBtnFirmar.value = true;
            else {
              showBtnFirmar.value = false;
            }
          } else {
            alertSnackBarService.showWarningAlert(data.mensaje);
          }
        });
    };

    const saveChanges = () => {
      alertSnackBarService.showSuccessAlert();
      let recepcionRequest = new RecepcionRequestModel();
      recepcionRequest.asunto = data_set.value.asunto;
      recepcionRequest.idRecepcion = data_set.value.idRecepcion;
      recepcionRequest.idTipoDocumentoAdm = data_set.value.idTipoDocumentoAdm;
      recepcionRequest.nuDocumentoAdm = data_set.value.nuDocumentoAdm;
      recepcionRequest.inObservado = data_set.value.inObservado
        ? data_set.value.inObservado
        : "0";
      recepcionRequest.observacion =
        data_set.value.inObservado != 0 ? data_set.value.observacion : "";
      recepcionPideService
        .putGrabarCambios(data_set.value.idRecepcion, recepcionRequest)
        .then((response) => {
          if (response.status) {
            alertSnackBarService.showSuccessAlert(response.mensaje);
          } else {
            alertSnackBarService.showWarningAlert(response.mensaje);
          }
        });
    };

    const firmarDocumento = async () => {
      const response = await recepcionPideService.putFirmar(
        data_set.value.idRecepcion
      );
      if (response.exito) {
        let param = "1$0$"; ////let param = tipoFirma$inTsa$cargoEmpleado
        let rutaDoc = `$temp/${response.noArchivo}`;

        let descargaAndFirma = new WSClientRequestModel();
        descargaAndFirma.command = "downloadAndSign";
        descargaAndFirma.param = param;
        descargaAndFirma.target = rutaDoc;
        descargaAndFirma.url = response.url;

        cargaDocFirmado = new WSClientRequestModel();
        cargaDocFirmado.url = response.urlActualiza;
        cargaDocFirmado.target = targetSign(rutaDoc);

        const responseFirma = await wsClientTramiteDoc.firmarDocDesktop(
          descargaAndFirma
        );
        if (responseFirma.error) {
          alertSnackBarService.showWarningAlert(responseFirma.message);
        } else {
          showBtnCargar.value = true;
        }
      } else {
        console.log("error al firopenSeguimientomar", response.mensaje);
      }
    };

    const subirDocumento = async () => {
      const responseVerifica = await wsClientTramiteDoc.verificarSiExiste(
        cargaDocFirmado
      );
      if (responseVerifica.error) {
        alertSnackBarService.showWarningAlert(responseVerifica.message);
        return;
      }
      const responseCarga = await wsClientTramiteDoc.cargarDocFirmadoDesktop(
        cargaDocFirmado
      );
      if (responseCarga.error) {
        alertSnackBarService.showWarningAlert(responseCarga.message);
        return;
      }
      const responseRecepcion = await recepcionPideService.recepcionar(
        data_set.value.idRecepcion,
        responseCarga.message.trim()
      );
      if (responseRecepcion.status) {
        alertSnackBarService.showSuccessAlert(responseRecepcion.mensaje);
        emit("recepcionado", data_set.value.idRecepcion);
      } else {
        alertSnackBarService.showWarningAlert(responseRecepcion.mensaje);
        return;
      }
    };
    const targetSign = (target) => {
      let arrayTarget = target.split(".");
      return `${arrayTarget[0]}[F].pdf`;
    };

    const seguimiento = () => {
      openConexion.value = true;
    }

    return {
      data_set,
      mostrar_edit,
      files_attached_set,
      files_anexos_set,
      agregarAdjuntos,
      updateAdjunto,
      openFileAdjunto,
      openDocument,
      updateEstado,
      saveChanges,
      cargaDestinos,
      firmarDocumento,
      subirDocumento,
      showBtnFirmar,
      showBtnCargar,
      seguimiento
    };
  },
  data() {
    return {
      estados_set: [
        { idEstado: "P", estado: "EN REGISTRO" },
        { idEstado: "V", estado: "PARA VERIFICAR" },
      ],
      ///prueba
      items: [
        {
          id: 1,
          title: "Real-Time",
          icon: "mdi-clock",
          url: "https://cea3.mpfn.gob.pe/repo/archivoBinario/goDescargarDocumento?token=-_T0qPnpzWUT&modo=WEB",
        },
        {
          id: 2,
          title: "Audience",
          icon: "mdi-account",
          url: "OFICIO-000669-2019-GG VB PAGINAS.pdf",
        },
        {
          id: 3,
          title: "Conversions asdasdasdas asdasdasd ",
          icon: "mdi-flag",
          url: "compressed.tracemonkey-pldi-09.pdf",
        },
      ],
    };
  },
};
</script>
<style src="./edit.css"></style>
