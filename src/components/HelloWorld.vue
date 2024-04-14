<template>
  <iframe id="seguimientoModule" class="body-seguimiento"
  >
  </iframe>
</template>

<script>
import { inject, onMounted } from "@vue/runtime-core";
export default {
  name: "HelloWorld",
  setup() {
    // let openSeguimiento = inject("open_seguimiento");
    let lista_dialog = inject("lista_dialog")
    onMounted(() => {
      console.log("se creaaaa")
      seguimiento();
    });
    const seguimiento = () => {
      let channel = new MessageChannel();
      let seguimientoModule = document.getElementById("seguimientoModule");
      seguimientoModule.src = "http://localhost:8084";

      let onLoad = () => {
        //seguimientoModule.contentWindow.postMessage("hola desde el CEA", '*', [channel.port2])
        console.log("lista con elem *****",lista_dialog)
        let obj = JSON.parse(JSON.stringify(lista_dialog.value))
        seguimientoModule.contentWindow.postMessage(obj, "*", [channel.port2]);
        //receibir mensajes
        channel.port1.onmessage = onMessage;
      };

      let onMessage = (e) => {
        switch (e.data.type) {
          case "getService":
            console.log("servicio para completar arbol", e.data.data);
            //getContinueArbolSeguimiento(e.data.data, seguimientoModule);
            break;
          case "closeSeguimiento":
            if (!e.data.data) {
              console.log("este es el mensaje q llega", e);
              let node = document.getElementById("seguimientoModule");
              if (node.parentNode) {
                node.parentNode.removeChild(node);
                openSeguimiento.value = false;
              }
            }
            break;
        }
      };
      seguimientoModule.addEventListener("load", onLoad);
    };
  },
};
</script>
