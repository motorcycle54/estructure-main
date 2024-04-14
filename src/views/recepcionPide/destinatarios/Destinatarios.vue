<template src="./destinatarios.html"></template>
<style scoped>
  .btn-show-sede{
    font-size: 10px;
    width: 6px;
    font-weight: 500;
  }
</style>
<script>
import { ref } from "@vue/reactivity";
import { getCurrentInstance, onMounted } from "@vue/runtime-core";
import { RecepcionPideService } from "../../../_services/RecepcionPide.service";
import { AlertSnackBarService } from "../../../_services/alert-snackBar.service";
import AddDestinations from "../../../components/AddDestinations/AddDestinations.vue";
import AutoComplete from "../../../components/autoComplete/AutoComplete.vue";
import dependenceSearch from "../../../components/dependenceSearch/dependenceSearch.vue"

export default {
  name: "Destinatarios",
  components: { AddDestinations, AutoComplete, dependenceSearch },
  props: {
    idRecepcion: Number,
    listDestination: Array,
    estadoRecepcion: String,
  },
  setup(props) {
    const { proxy } = getCurrentInstance();
    const recepcionPideService = new RecepcionPideService();
    const alertSnackBarService = new AlertSnackBarService();

    let list_destination = ref(props.listDestination);
    let list_dependencies = proxy.$list_dependencies;
    let list_priority = proxy.$list_priority;
    let list_locales = proxy.$list_locales;
    let flagSede = ref(false);

    onMounted(() => {
    });   

    const updateRecepcionDestino = (listOriginally) => {
      
      recepcionPideService.updateListRecepcionDestinoPide( props.idRecepcion, list_destination.value)
        .then((data) => {
          if (data.status) {
            alertSnackBarService.showSuccessAlert(data.mensaje);
          } else {
            list_destination.value.splice(0, list_destination.value.length)
            list_destination.value.push(...listOriginally.value)
            alertSnackBarService.showWarningAlert(data.mensaje);
          }
        });
      
    };

    const deleteDestination = (destino) => {
      const index = list_destination.value.findIndex(
        (destination) => destination == destino
      );
      if (index > -1) {
        list_destination.value.splice(index, 1);
      }
    };

    const fillDestino = (itemSelected, destino) => {
      destino.coDepDes = itemSelected.coDependencia;
      destino.deDepDes = itemSelected.deDependencia;
      destino.coEmpDes = itemSelected.coEmpleado;
      destino.deEmpDes = itemSelected.deEmpleado;
      destino.coLocDes = itemSelected.coLocal;
      destino.deLocDes = itemSelected.deLocal;
    }

    return { list_destination, list_dependencies, list_priority, list_locales, flagSede, updateRecepcionDestino, deleteDestination, fillDestino }
  },
  data() {
    return {
      header_set: ["Destinatario", "Prioridad"],
      column_set: [
        {
          show_always: true,
          linea1: ["deDepDes"],
          linea2: ["deEmpDes"],
        },
        {
          show_always: true,
          linea2: ["dePri"],
        },
      ],
    }
  }
};
</script>
