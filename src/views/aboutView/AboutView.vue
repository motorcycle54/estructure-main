<template>
  <div class="container-body">
    <div class="filtro">
      <filter-section />
    </div>
    <div class="tabla">
      <div class="wrapper">
        <div
          class="lista"
         
        >
          <tableof-list
            v-if="listEpisodios.length > 0"
            :id_row="id_row"
            :data_set="listEpisodios"
            :column_set="column_set"
            @getIdRow="fillDetail"
          />
        </div>        
      </div>      
    </div>
    
    <div v-if="mostrar_edit && !!detalleEpisodio" class="container-right">
      <div class="wrapper">
        <span class="detalle">
          <Edit :data_set = "detalleEpisodio"/>
        </span>
      </div>
    </div>   
  </div>
</template>
<script>
import { RickandMortyService } from "../../_services/RickandMorty.service";
import { SearchRequestModel } from "../../_models/searchRequest.model";
import Edit from "./edit/Edit.vue";
import { ref } from "@vue/reactivity";
import { provide, watchEffect } from "@vue/runtime-core";

export default {
  name: "About",
  components: {
    Edit,
  },
  setup() {
    const rickandMortyService = new RickandMortyService();
    const searchRequestModel = ref(new SearchRequestModel({},{},{},{}));

    let mostrar_edit = ref(false);    
    let listEpisodios = ref([]);
    let detalleEpisodio = ref();
    provide("mostrar_edit", mostrar_edit);    
    provide("searchRequestModel", searchRequestModel);

    watchEffect(() => {

    });

    rickandMortyService.getAllEpisodes().then((data) => {
      listEpisodios.value = data.results;
    });

    function fillDetail(idRow){
      console.log("**idEpisode**", idRow, "++")
      rickandMortyService.getEpisode(idRow)
      .then((data) => {
        detalleEpisodio.value = data;
        console.log("data Detalle", data);
      })
    }

    return { listEpisodios, detalleEpisodio, mostrar_edit, fillDetail };
  },  
  data: () => ({
    column_set: [
      {
        icono: "id",
        show_always: true,
        linea1: ["name", "episode"],
        linea2: ["air_date"],
        linea3: ["id"],
      },
      {
        show_always: true,
        linea2: ["episode"],
        linea3: ["url"],
      },
      {
        linea1: ["created"],
      },
      {
        linea1: ["episode"],
      },
      {
        linea1: ["id"],
      },
    ],

    id_row: "id",
  }),
};
</script>
<style src="./aboutView.css" >
  
</style>
