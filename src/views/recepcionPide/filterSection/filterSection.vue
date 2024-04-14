<template src="./filterSection.html"></template>
<script>
import InpuDate from "./inputDate/InputDate.vue";
import { inject, getCurrentInstance, provide } from 'vue';
import{ ref } from "@vue/reactivity";
import router from '@/router';

export default {
    name: "FilterSection",
    props: [],
    components:{
        InpuDate,
    },
    emits: ['search'],
    setup(props, {emit}) {
        const { proxy } = getCurrentInstance();    
        let showFiltros = ref(false);  
        let estados = proxy.$list_state;
        let filterlist = ref([])

        let hide_filter = inject('mostrar_edit');
        let searchRequestModel = inject("searchRequestModel");    
        
        let documento;
        let dniEmisor;
        let ruc = ref("")
        let asunto = ref("")
        let estado = ref({idEstado: '', deEstado: 'TODOS'})
        provide('ruc', ruc)
        provide('estado',estado)
        provide('asunto',asunto)

        function search(){
            filterlist.value = []
            //filtro 1
            if(!!estado.value.idEstado)
            {
                filterlist.value.push({ "idEstado": estado.value.idEstado })
            }
            //filtro 2    
            if(ruc.value != "")
            {
                filterlist.value.push({"nuDocumentoEmisor": ruc.value})                   
            } 
            //...para agregar mas filtros    
            searchRequestModel.value.filter=filterlist.value;
            searchRequestModel.value.search=[{ "asunto": asunto.value}] 
            emit("search")
        }        

        return {documento, dniEmisor, asunto, hide_filter, showFiltros, estado, estados, search,ruc,filterlist,}
    }      
}
</script>
<style src ="./filterSection.css">
</style>
