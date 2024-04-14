<template src="./recepcionPide.html"></template>
<script>
import { RecepcionPideService } from "../../_services/RecepcionPide.service";
import { SearchRequestModel } from "../../_models/searchRequest.model";
import Edit from "./edit/Edit.vue";
import Destinatarios from "./destinatarios/Destinatarios.vue";
import FilterSection from "./filterSection/filterSection.vue";

import { ref } from "@vue/reactivity";
import { onMounted, provide, watchEffect } from "@vue/runtime-core";

export default {
  name: "RecepcionPide",
  components: {
    Edit,
    Destinatarios,
    FilterSection
  },
  setup() {
    const recepcionPideService = new RecepcionPideService();
    const searchRequestModel = ref(
      new SearchRequestModel([{}], [{}], [{}], [{}])
    );

    let listRecepcionPide = ref([]);
    let detalleRecepcionPide = ref();
    let listDestination = ref([]);
    let cargarEdit = ref(false);
    let cargarDestinos = ref(false);
    let mostrarEdit = ref(false);
    provide("mostrar_edit", mostrarEdit);
    provide("searchRequestModel", searchRequestModel);

    function search() {
      listRecepcionPide.value = [];
      recepcionPideService
        .getListaRecepcionPide(JSON.stringify(searchRequestModel.value))
        .then((data) => {
          if (data.status) {
            listRecepcionPide.value = data.data;
          } else {
            console.log("error", data.mensaje);
          }
        });
    }

    async function fillDetail(idRow) {
      cargarEdit.value = false;
      cargarDestinos.value = false;
      mostrarEdit.value =true;

      await recepcionPideService.getEditRecepcionPide(idRow).then((data) => {
        if (data.status) {          
          cargarEdit.value = true;
          detalleRecepcionPide.value = data.data;
        } else {
          console.log("error obteniendo detalle", data.mensaje);
        }
      });

      await recepcionPideService.getListRecepcionDestinoPide(idRow).then((data) => {
        if (data.status) {
          listDestination.value = data.data;
          cargarDestinos.value = true;
        } else {
          console.log("error obteniendo lista Destino", data.mensaje);
        }
      });
    }

    onMounted(() => {
      search();
    });

    return {
      listRecepcionPide,
      detalleRecepcionPide,
      listDestination, cargarDestinos,
      cargarEdit, mostrarEdit,
      search,
      fillDetail,
    };
  },
  data: () => ({
    column_set: [
      {
        icono: "idEstado",
        show_always: true,
        linea1: ["tipoDocumentoAdm"],
        linea2: ["nuDocumentoAdm"],
      },
      {
        linea1: ["tipoDocumentoEmisor", "nuDocumentoEmisor"],
        linea2: ["nombreEmisor"],
      },
      {
        show_always: true,
        linea1: ["asunto"],
      },
      {
        linea1: ["feRegistro"],
      },
      {
        linea1: ["tipoRecepcion"],
        linea2: ["nroCuo"],
      },
    ],

    id_row: "idRecepcion",
  }),
};
</script>
<style src="./recepcionPide.css"></style>
