<template>
  <v-app :theme="theme" @click="getClickEvent($event)">
    <v-main>
      <router-view>
        
      </router-view>
      
      
    </v-main>

    <snackbar-alert ref="alertSnackbarComponent"></snackbar-alert>
    <div id="contendSeguimiento">
      <connection-visor v-if="openConexion" />
    </div>
    
  </v-app>
</template>

<script>
import { ref } from "@vue/reactivity";
import { getCurrentInstance, onBeforeMount, onMounted, provide, watchEffect } from "@vue/runtime-core";
import { AlertSnackBarService } from "./_services/alert-snackBar.service";
import { TokenSecurityService } from "./_services/TokenSecurity.service";
import HelloWorld from './components/HelloWorld.vue';

export default {
  name: "App",
  components: {HelloWorld},
  setup() {
    const alertSnackBarService = new AlertSnackBarService();
    const tokenSecurityService = new TokenSecurityService();
    const { proxy } = getCurrentInstance();
    const theme = ref(proxy.$theme_name);
    let frame = null;
    let listDialog = ref([]);
    let mostrarVisor = ref(true)
    let count_refresh = 0;
    let each_time = 300000;
    let max_time_interval = 12;
    let openConexion = ref(false);

    provide("open_conexion", openConexion);
    provide("lista_dialog", listDialog);
    provide("mostrar_Visor", mostrarVisor);
    

    onMounted(() => {
      alertSnackBarService.setReference(proxy.$refs.alertSnackbarComponent);
    
    });

    watchEffect(() => {
      
      
    });

    const getClickEvent = (event) => {
      count_refresh = 0;
    };

    const updateToken = () => {
      if (count_refresh < max_time_interval) {
        tokenSecurityService.getRefreshToken().then(
          (data) => {
            if (data.status) {
              count_refresh++;
              console.log("****se pudo actualizar token", data.mensaje, "---", count_refresh);
              sessionStorage.tokenSession = data.data;
            } else {
              console.log("****no se pudo actualizar token", data.mensaje);
            }
          },
          (error)=>{
            console.log("****no se pudo token", error);
            clearInterval(myInterval);
          });
      }else{
        alertSnackBarService.showErrorAlert("SESION EXPIRADA", -1)
        clearInterval(myInterval);
      }
    };

    


    const myInterval = setInterval(updateToken, each_time);
      
    return { theme, listDialog, getClickEvent,mostrarVisor,frame, openConexion };
  },
  data: () => ({
  }),

};
</script>
<style >
.header {
  position: absolute;
  height: 70px;
  width: 100%;
  background-color: rgb(var(--v-theme-header));
  color: #ffffff;
  border-bottom: 0 solid transparent;
}
.footer {
  position: absolute;
  background-color: rgb(var(--v-theme-footer));
  height: 30px;
  width: 100%;
  bottom: 0px;
  padding: 6px 15px;
  font-size: 12px;
  color: rgb(var(--v-theme-footer_text));
}

.frame
{
    position: absolute;
    height: 50vh;
    width: 50vw;
    opacity: 1;
    
}

.body-conexion {
        position: fixed;
        top: 0;
        height: 100vh;
        width: 100vw;
        z-index: 1030;
    }

</style>