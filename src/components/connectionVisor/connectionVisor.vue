<template src="./connectionVisor.html"> </template>

<script>
import { inject, onMounted } from "@vue/runtime-core";
export default {
  name: "HelloWorld",
  setup() {
    let openConexion = inject("open_conexion");
    let lista_dialog = inject("lista_dialog")
    
    onMounted(() => {
      createConnection();
    });
    const createConnection = () => {
      let channel = new MessageChannel();
      let conexionModule = document.getElementById("conexionVisor");
      conexionModule.src = "http://localhost:8081/pdf-visor";

      let onLoad = () => {
        let obj = JSON.parse(JSON.stringify(lista_dialog.value))
        conexionModule.contentWindow.postMessage(obj, "*", [channel.port2]);
        channel.port1.onmessage = onMessage;
      };

      let onMessage = (e) => {
        switch (e.data.type) {
          case "getService":
            console.log("servicio para completar arbol", e.data.data);
            break;
          case "closeVisor":
            if (!e.data.data) {
              // let node = document.getElementById("conexionVisor");
              if (conexionModule.parentNode) {
                //node.parentNode.removeChild(node);
                window.localStorage.clear();
                //conexionModule.contentWindow.location.reload();
                conexionModule.remove();
                openConexion.value = false;
                
           
              } 
              lista_dialog.value.splice(0,lista_dialog.value.length) 
              
            }
            break;
        }
      };
      conexionVisor.addEventListener("load", onLoad);
    };
  },
};
</script>
