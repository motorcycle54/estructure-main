<template src="./selectInput.html"></template>
<script>
import { ref } from '@vue/reactivity';
import { watchEffect } from "@vue/runtime-core";
export default {
    name: "SelectInput",
    props: {
        type: String,
        label: String,
        model: String,
        list_items: Array,
        object_item: Object,
        variant: String,
        class: String,
    },
    setup(props, { emit }) {
        let showMenu = ref(false);       
        let list_items = ref(props.list_items)
        let object_item = ref(props.object_item);      

        const selected = (itemSelected) => {
            showMenu.value = false;
            emit("id", itemSelected[object_item.value.id]);
            emit("desc", itemSelected[object_item.value.desc])
            emit("obj", { id: itemSelected[object_item.value.id], desc: itemSelected[object_item.value.desc] })
        }

        const getValueOfList = (id)=> {
            let item = list_items.value.find((item) => item[object_item.value.id] == id )
            return item[object_item.value.desc]
        }
        
        watchEffect(() => {
        });

        return { showMenu, object_item, selected }
    },
}
</script>