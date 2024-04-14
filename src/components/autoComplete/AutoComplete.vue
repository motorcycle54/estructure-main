<template src="./autoComplete.html"></template>
<script>
import { ref } from "@vue/reactivity";

export default {
  name: "AutoComplete",
  props: {    
    model: String,
    list_items: Array,
    object_item: Object,
    value: String,
    class: String,
  },
  emits: ['id', 'desc'],
  setup(props, {emit}) {
    let showMenu = ref(false);    
    let model = ref(props.model);
    let listOrigen = props.list_items;
    let listFiltered = ref([]);
    let value = ref(props.value);

    const filterList = (text) => {
      showMenu.value = true;
      listFiltered.value = filter(text, listOrigen);
      if (listFiltered.value.length < 1) {
        listFiltered.value.push({code: 0, [props.object_item.desc]: "Debe Seleccionar un Item"});
      }
    };

    const filter = (input, list) => {
      const filter_value = input.toUpperCase();
      let newList = list.filter((option) => option[props.object_item.desc].toUpperCase().indexOf(filter_value) === 0 );
      return newList;
    };

    const selected = (itemSelected) => {
      if (itemSelected.code != 0) {
        value.value = itemSelected[props.object_item.code];
        emit("id", value)
        model.value = itemSelected[props.object_item.desc];
        emit("desc", itemSelected[props.object_item.desc])
        listFiltered.value = [];
        showMenu.value = false;
      }
    };

    return { showMenu, listFiltered, value, model, filterList, filter, selected };
  },
};
</script>
<style>
</style>