<template src="./addFilters.html"></template>

<script>
import { ref } from '@vue/reactivity'
import { inject,getCurrentInstance } from 'vue'
import { AlertSnackBarService } from '../../_services/alert-snackBar.service'
export default {
    name: "addFilters",
    emits: ['usarFiltros'],
    setup(props,{emit})
    {
        let dialog = ref(false)

        //datos del padre
        let estado = inject('estado')
        let asunto = inject('asunto')
        let ruc = inject('ruc')

        //datos del formulario
        let ruc_ = ref("")
        let estado_ =ref("")
        let asunto_ = ref("")

        let showFilters = ref(false)

        let chip1 = ref(false)
        let chip2 = ref(false)
        let chip3 = ref(false)

        let valor;

        const alertSnackBarService = new AlertSnackBarService();

        function addFilters()
        {
            if(ruc.value != "")
            {
                //mostrar los chips y ocultar dialogo
                chip1.value = true
                ruc_.value =  ruc.value 
            }
            if(estado.value.idEstado != "" || estado.value.deEstado != "TODOS")
            {

                chip2.value = true
                estado_.value = estado.value.deEstado ;
              
            }
            if(asunto.value != "")
            {
                chip3.value = true;
                asunto_.value = asunto.value
                
            }
            if(ruc.value == "" && estado.value.idEstado == "" && asunto.value == "")
            {
                alertSnackBarService.showWarningAlert("No esta ingresando ningún filtro.")
                
            }
            showFilters.value = true
            dialog.value = false
        }
        function closeDialog()
        {

            dialog.value = false
            limpiarCampos()
        }

        function remove(valor)
        {
            if(valor == 1)
            {
                chip1.value = false;
                ruc.value = "";   
            }
            if(valor == 2)
            {
                chip2.value = false;
                estado.value.idEstado = "";
                estado.value.deEstado = "TODOS";
            }
            if(valor == 3)
            {
                chip3.value = false;
                asunto.value = "";
            }
            valor = 0
        }

        function limpiarCampos()
        {
            ruc.value = "";
            estado.value.idEstado = "";
            estado.value.deEstado = "TODOS";
            asunto.value = "";
            
        }

        return { dialog, addFilters, showFilters, chip1 , ruc, closeDialog, estado, 
        chip2, chip3, asunto, remove,valor,limpiarCampos,ruc_,estado_,asunto_}
    }
    

}
</script>

<style>

</style>