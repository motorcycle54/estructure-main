<template src="./addDestinations.html"></template>
<script>

import { ref } from "@vue/reactivity";
import AutoComplete from "../autoComplete/AutoComplete.vue";
import { AlertSnackBarService } from "../../_services/alert-snackBar.service";

export default {
    name: "AddDestinations",
    components: { AutoComplete },
    props: ["listDestination"],
    emits: ['saveList'],
    setup(props, {emit}){
        let openDialog = ref(false);
        let listDestination = ref(props.listDestination);
        let listOriginally = ref([...props.listDestination]);
        let showWarning = ref(false);

        const alertSnackBarService = new AlertSnackBarService();

        const addDestinatarios = () => {            
            let obj = listDestination.value[0];
            let emptyObj = {}
            for(let i in obj){
                emptyObj[i] = "";
            }
            listDestination.value.push(emptyObj);
        }        

        const saveListDestination = () => {
            if(validateNotEmpty(listDestination)){
                emit("saveList", listOriginally);            
                openDialog.value = false;
            }else{
                alertSnackBarService.showWarningAlert("Debe completar todos los campos")
            }
        }

        const closeWithoutSave = () => {            
            listDestination.value.splice(0, listDestination.value.length)
            listOriginally.value.forEach(element => {
                listDestination.value.push(element);
            });
            openDialog.value = false;
        }

        const openEditDestination = () => {
            listOriginally.value = [...props.listDestination];
            openDialog.value = true
        }

        const valida = () => {
            if(listDestination.value.length != listOriginally.value.length){
                showWarning.value = true;
            }else{
                for (let index = 0; index < listOriginally.value.length; index++) {
                    if(listOriginally.value[index] != listDestination.value[index]){
                        showWarning.value = true;
                        return;
                    }
                    
                }
            }
        }
         const validateNotEmpty = (list) => {
            let isEmpty = true;
            list.value.forEach(element => {
                for(let i in element){
                    if(element[i] == "" && i != "deEmpDes" && i != "coEmpDes"){
                        isEmpty = false;
                        return;
                    }
                }
            });            
            return isEmpty
        }

        return { openDialog, addDestinatarios, saveListDestination, closeWithoutSave, openEditDestination, showWarning, valida }
    }
}
</script>
<style >
    .dialog_destination .v-overlay__content {
        border-radius: 0;
        padding: 100px;
        width: 100%;
        height: 100%;
        max-width: 100%;
        max-height: 100%;
        overflow-y: auto;
        top: 0;
        left: 0;
}
</style>