<template src="./tableofList.html"></template>
<script>
import { ref } from "@vue/reactivity";
import { inject } from "vue";
export default {
  name: "TableofList",
  props: ["data_set", "header_set", "column_set", "id_row", "border"],
  setup(props, { emit }) {
    let id_selected = -1;
    let any_selected = inject("mostrar_edit");
    let estdaoIcono = {
      0: "mdi-clock",
      1: "mdi-account",
      2: "mdi-flag",
      V: "mdi-alpha-v-circle-outline",
      R: "mdi-alpha-r-circle-outline",
      P: "mdi-alpha-p-circle-outline",
    };
    let header_set = props.header_set;
    let data_set = props.data_set;
    let column_set = props.column_set;

    function selectedElement(idRow) {          
      id_selected = idRow;
    }

    function sendRowEvent(idRow) {
      if (!any_selected.value || id_selected != idRow) {
        selectedElement(idRow);
        emit("getIdRow", idRow);
      }else{
        id_selected = -1;
      }
    }

    return { any_selected, estdaoIcono, header_set, column_set, data_set, sendRowEvent };
  },
};
</script>
<style src="./tableofList.css" scoped></style>