<template src="./edit.html"></template>
<script>
import { ref } from "@vue/reactivity";
import { inject, onMounted, watchEffect } from "@vue/runtime-core";

import AutoComplete from "../../../components/autoComplete/AutoComplete.vue";
import AddDestinations from "../../../components/AddDestinations/AddDestinations.vue"

export default {
  name: "Edit",
  props: ["data_set"],
  components: { AutoComplete, AddDestinations },
  setup(props) {
    let receiver_set = ref([]);
    let files_attached_set = ref([]);
    let files_anexos_set = ref([]);
    watchEffect(() => {
    });
    onMounted(() => {
      files_attached_set.value = [
        {
          color: "blue",
          icon: "mdi-clipboard-text",
          date: "Jan 20, 2014",
          name: "Vacation itinerary",
        },
        {
          color: "amber",
          icon: "mdi-gesture-tap-button",
          date: "Jan 10, 2014",
          name: "Kitchen remodel",
        },
      ];

      files_anexos_set.value = [
        {
          color: "red",
          icon: "mdi-clipboard-text",
          date: "Jan 20, 2014",
          name: "anexo Vacation itinerary",
        },
        {
          color: "green",
          icon: "mdi-gesture-tap-button",
          date: "Jan 10, 2014",
          name: "anexo remodel",
        },
      ];
    });

    receiver_set.value = [
      {
        deDependencia: "Real-Time",
        deNombres: "nomb1 nomb2",
        dePrimerApellido: "apellido1",
        deSegundoApellido: "apellido2",
        prioridad: "NORMAL",
        tarea: "Evaluar documento registrado",
      },
      {
        deDependencia: "Audience",
        deNombres: "nomb1 nomb2",
        dePrimerApellido: "apellido1",
        deSegundoApellido: "apellido2",
        prioridad: "NORMAL",
        tarea: "Evaluar documento registrado",
      },
      {
        deDependencia: "Conversions",
        deNombres: "nomb1 nomb2",
        dePrimerApellido: "apellido1",
        deSegundoApellido: "apellido2",
        prioridad: "NORMAL",
        tarea: "Evaluar documento registrado",
      },
    ];    

    return {
      data_set,
      receiver_set,
      files_attached_set,
      files_anexos_set,
    };
  },
  data() {
    return {
      notifications: false,
      sound: true,
      widgets: false,
      state: "",
      header_set: [
        "Destinatario", "Prioridad", "Tarea"
      ],
      column_set: [
        {
          show_always: true,
          linea1: ["deDependencia"],
          linea2: ["deNombres", "dePrimerApellido", "deSegundoApellido"],
        },
        {
          show_always: true,
          linea2: ["prioridad"],
        },
        {
          show_always: true,
          linea1: ["tarea"],
        },
      ],
      states: [
        { deDependencia: "Alabama" },
        { deDependencia: "Alaska" },
        { deDependencia: "American Samoa" },
        { deDependencia: "Arizona" },
        { deDependencia: "Arkansas" },
        { deDependencia: "California" },
        { deDependencia: "Colorado" },
        { deDependencia: "Connecticut" },
        { deDependencia: "Delaware" },
        { deDependencia: "District of Columbia" },
        { deDependencia: "Federated States of Micronesia" },
        { deDependencia: "Florida" },
        { deDependencia: "Georgia" },
        { deDependencia: "Guam" },
        { deDependencia: "Hawaii" },
        { deDependencia: "Idaho" },
        { deDependencia: "Illinois" },
        { deDependencia: "Indiana" },
        { deDependencia: "Iowa" },
        { deDependencia: "Kansas" },
        { deDependencia: "Kentucky" },
        { deDependencia: "Louisiana" },
        { deDependencia: "Maine" },
        { deDependencia: "Marshall Islands" },
        { deDependencia: "Maryland" },
        { deDependencia: "Massachusetts" },
        { deDependencia: "Michigan" },
        { deDependencia: "Minnesota" },
        { deDependencia: "Mississippi" },
        { deDependencia: "Missouri" },
        { deDependencia: "Montana" },
        { deDependencia: "Nebraska" },
        { deDependencia: "Nevada" },
        { deDependencia: "New Hampshire" },
        { deDependencia: "New Jersey" },
        { deDependencia: "New Mexico" },
        { deDependencia: "New York" },
        { deDependencia: "North Carolina" },
        { deDependencia: "North Dakota" },
        { deDependencia: "Northern Mariana Islands" },
        { deDependencia: "Ohio" },
        { deDependencia: "Oklahoma" },
        { deDependencia: "Oregon" },
        { deDependencia: "Palau" },
        { deDependencia: "Pennsylvania" },
        { deDependencia: "Puerto Rico" },
        { deDependencia: "Rhode Island" },
        { deDependencia: "South Carolina" },
        { deDependencia: "South Dakota" },
        { deDependencia: "Tennessee" },
        { deDependencia: "Texas" },
        { deDependencia: "Utah" },
        { deDependencia: "Vermont" },
        { deDependencia: "Virgin Island" },
        { deDependencia: "Virginia" },
        { deDependencia: "Washington" },
        { deDependencia: "West Virginia" },
        { deDependencia: "Wisconsin" },
        { deDependencia: "Wyoming" },
      ],
    };
  }
};
</script>

<style scoped src="./edit.css"></style>