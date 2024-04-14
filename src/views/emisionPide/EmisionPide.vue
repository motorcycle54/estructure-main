<template src="./emisionPide.html"></template>
<script>
import { EmisionPideService } from "../../_services/EmisionPide.service";
import { SearchRequestModel } from "../../_models/searchRequest.model";
import FilterSection from "./filterSection/filterSection.vue";
import Edit from "./edit/Edit.vue";

import { ref,inject } from "vue";
import { onMounted, provide, watchEffect } from "@vue/runtime-core";

export default {
  name: "EmisionPide",
  components: {
    Edit,
    FilterSection
  },
  setup() {
    const emisionPideService = new EmisionPideService();
    const searchRequestModel = ref(new SearchRequestModel([{}],[{}],[{}],[{}]));

    let listRecepcionPide = ref([]);
    let detalleRecepcionPide = ref();
    let cargarEdit = ref(false);
    let mostrar_edit = ref(false);
    provide("mostrar_edit", mostrar_edit);
    provide("searchRequestModel", searchRequestModel)

    function search() {
      listRecepcionPide.value = [];
      emisionPideService
        .getListaEmisionPide(JSON.stringify(searchRequestModel.value))
        .then((data) => {
          if (data.status) {
            listRecepcionPide.value = data.data;
          } else {
            console.log("error", data.mensaje);
          }
        });
    }

    async function fillDetail(idRow){
      cargarEdit.value = false;
      mostrar_edit.value = true;
      
      await emisionPideService.getEditEmisionPide(idRow)
      .then((data) => {
        if(data.status)
        {
          cargarEdit.value = true;
          detalleRecepcionPide.value = data.data
        }
        else {
          console.log("error obteniendo detalle", data.mensaje);
        }
        
      })
    }

    watchEffect(() => {
      
    });

    onMounted(() => {      
        search();
    });
    
    return { listRecepcionPide, detalleRecepcionPide, mostrar_edit, search, fillDetail,cargarEdit }
  },
  data: ()=>({
    column_set: [
      {
        icono: "idEstado",
        show_always: true,
        linea2: ["nuDocumentoAdm"],
      },
      {
        linea1: ["tipoDocumentoDestino", "nuDocumentoDestino"],
        linea2: ["deNombreEmisor"],
      },
      {
        show_always: true,
        linea1: ["asunto"],
      },
      {
        linea1: ["feRegistro"],
      },
      {
        linea1: ["tipoEmision"],
        linea2: ["nuDocumentoEmisor"],
      },
    ],

    id_row: "idEmision",
  }),
};
</script>
<style src="./emisionPide.css" scoped></style>
