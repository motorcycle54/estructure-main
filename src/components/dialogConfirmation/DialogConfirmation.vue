<template>
  <div class="text-center">
    <slot name="btnDialog"/>
    <v-dialog
      v-model="dialog"
      activator="parent"
      :retain-focus="false"
    >
      <v-card>
        <v-toolbar  color="yellow">
          <v-toolbar-title >Confirmacion de eliminacion</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
              <v-btn icon="mdi-close-thick" variant="outlined" @click="dialog = false">
                  close
              </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-container>
          <div align="center">
            <v-img
                  :width="width"
                  :height="height"
                  class="remove-bg"
                  src="https://www.kindpng.com/picc/m/179-1793422_warning-icon-png-transparent-png.png"
                  cover
            />
          </div>
          <br>
          <div align="center">
            {{ message }}
          </div>
          <br>
          <div align="center">
            <table WIDTH="500">
              <tr>
                <th colspan="2"></th>    
              </tr>
              <tr>
                <td align="center">
                  <v-btn color="yellow" @click="confirmar()" size="small">
                    Si
                  </v-btn>
                </td>
                <td align="center">
                  <v-btn color="yellow" @click="dialog = false" size="small">
                    No
                  </v-btn>
                </td>       
              </tr>
            </table>
          </div>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
export default {
  name: "DialogConfirmation",
  props:{
    message: String,
  },
  setup(props)
  {
    let message = ref(props.message);

    return { message }
    
  },
  data() {
    return {
      dialog: false,
      width: 50,
      height: 50
    };
  },
  methods:{
    confirmar()
    {
      this.$emit("confirmar")
    }
  }
}
</script>

<style >
  .remove-bg
  {
    filter: brightness(1.1);
    mix-blend-mode: multiply;
  }
</style>