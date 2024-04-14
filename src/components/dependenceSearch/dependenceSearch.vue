<template src="./dependenceSearch.html"></template>
<script>

import { DependenciaService } from "../../_services/Dependecia.service";
import { SearchRequestModel } from "../../_models/searchRequest.model";
import { ref } from "@vue/reactivity";
import {provide} from "@vue/runtime-core";

export default {
  name: "AutoCompletev2",
  props: {    
    coLocal: String,
    model: String,
    object_item: Object,
    class: String,
  },
  setup(props, {emit}) {

    const dependenciaService = new DependenciaService();
    const searchDependenciaModel = ref(new SearchRequestModel([{}],[{}],[{}],[{}]))

    let showMenu = ref(false);    
    let model = ref(props.model);
    let listFiltered = ref([]);

    const filterList = (text) => {
      showMenu.value = true;
      searchDependenciaModel.value.index = "dependencias";
      searchDependenciaModel.value.routing = "string";
      searchDependenciaModel.value.search= [{"deBusDependencia":text}];
      if(!!props.coLocal)
        searchDependenciaModel.value.filter = [{"coLocal": props.coLocal}]
      dependenciaService
      .searchDependencia(JSON.stringify(searchDependenciaModel.value)).then((data) => {
          listFiltered.value = data.data;
      })
      if (listFiltered.value.length < 1) {
        listFiltered.value.push({code: 0, [props.object_item.desc]: "Debe Seleccionar un Item"});
      }
    };

    const selected = (itemSelected) => {
      if (itemSelected.code != 0) {
        model.value = itemSelected[props.object_item.desc];
        emit("itemSelected", itemSelected)        
        restore();
      }
    };

    const restore = () => {
      listFiltered.value = [];
        showMenu.value = false;
    }

    return { showMenu, listFiltered, model, filterList, selected };
  },
};
</script>
<style >
  .v-field__append-inner{
    cursor: pointer;
  }
</style>