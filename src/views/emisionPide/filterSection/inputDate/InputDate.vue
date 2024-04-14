<template src="./inputDate.html"></template>
<script>
import { ref, onMounted, watch } from "vue";
import Datepicker from "vue3-date-time-picker";
import "vue3-date-time-picker/dist/main.css";
import moment from "moment";
import { inject } from "vue";

export default {
  name: "inputDate",
  components: { Datepicker },
  setup() {
    let rangeDate = "dddd";
    let searchRequestModel = inject("searchRequestModel");
    const date = ref();

    const presetRanges = ref([
      { label: "Hoy", range: [moment().startOf("day"), moment().endOf("day")] },
      {
        label: "Ayer",
        range: [
          moment().subtract(1, "days").startOf("day"),
          moment().subtract(1, "days").endOf("day"),
        ],
      },
      {
        label: "Mes actual",
        range: [
          moment().startOf("month").startOf("day"),
          moment().endOf("month").endOf("day"),
        ],
      },
      {
        label: "Mes anterior",
        range: [
          moment().subtract(1, "month").startOf("month"),
          moment().subtract(1, "month").endOf("month"),
        ],
      },
      {
        label: "Últimos 30 días",
        range: [
          moment().subtract(30, "days").startOf("day"),
          moment().endOf("day"),
        ],
      },
      {
        label: "Año 2021",
        range: [
          moment().subtract(1, "year").startOf("year"),
          moment().subtract(1, "year").endOf("year"),
        ],
      },
      {
        label: "Año 2022",
        range: [
          moment().startOf("year").startOf("day"),
          moment().endOf("year").endOf("day"),
        ],
      },
      {
        label: "Todos",
        range: [
          moment().year("2000").startOf("year"),
          moment().endOf("year").endOf("year"),
        ],
      },
    ]);

    onMounted(() => {
      // const startDate = new Date();
      // const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
      const startDate = moment().year("2000").startOf("year");
      const endDate = moment().endOf("year").endOf("year");
      date.value = [startDate, endDate];
      searchRequestModel.value.range = [
        {
          feRegistroIni: startDate.format("DD/MM/YYYY"),
          feRegistroFin: endDate.format("DD/MM/YYYY"),
        },
      ];
    });

    watch(date, async () => {
      if (date) {
        searchRequestModel.value.range = [
          {
            feRegistroIni: moment(date.value[0]).format("DD/MM/YYYY"),
            feRegistroFin: moment(date.value[1]).format("DD/MM/YYYY"),
          },
        ];
      }
    });

    const showInput = (date) => {
      let range = "";
      date.forEach((date) => {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        if(range !== "")
          range = `${range} - ${day}/${month}/${year}`
        else
          range = `${range}${day}/${month}/${year}`
      });

      return `FECHA SELECCIONADA ${range}`;
    };

    return { rangeDate, date, presetRanges, showInput };
  },
};
</script>
<style src="./inputDate.css">
</style>
