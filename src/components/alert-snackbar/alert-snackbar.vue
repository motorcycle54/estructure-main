<template>
  <div :class="type">
    <v-snackbar
      v-model="flagSnackbar"
      :top="position.top"
      :right="position.right"
      :left="position.left"
      :timeout="duration"
    >
      {{ message }}

      <template v-slot:actions>
        <v-btn icon="mdi-close-thick" color="pink" @click="closeSnackbar()">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
import { ref } from "@vue/reactivity";
export default {
  name: "alertSnackbar",
  setup(props, context) {
    let flagSnackbar = ref(false);
    let position = ref({ top: true, left: true, right: false });
    let duration = ref(10000);
    let message = ref("");
    let type = ref()

    let openSnackbar = () => {
      flagSnackbar.value = true;
    };
    let closeSnackbar = () => {
      flagSnackbar.value = false;
    };
    return {
      flagSnackbar,
      position,
      duration,
      message, type,
      openSnackbar,
      closeSnackbar,
    };
  },
  data: () => ({
  }),
};
</script>
<style >
.snack-bar-success .v-snackbar--variant-contained {
  color: #192c5f;
  font-weight: 700;
  background: #91eed5;
  border: solid 0.5px;
  border-color: #4f8a10;
  border-radius: 10px !important;
}

.snack-bar-warning .v-snackbar--variant-contained {
  color: #ca9c06;
  font-weight: 700;
  background: #feefb3;
  border: solid 0.5px;
  border-color: #9f6000;
  border-radius: 10px !important;
}

.snack-bar-error .v-snackbar--variant-contained {
  color: #d8000c;
  font-weight: 700;
  background: #ffbaba;
  border-color: #d8000c;
  border: solid 0.5px;
  border-radius: 10px !important;
}
</style>