<template>
  <HelloWorld />
</template>

<script>
import { defineComponent } from 'vue';

// Components
import HelloWorld from '../components/HelloWorld.vue';
import { TokenSecurityService } from '../_services/TokenSecurity.service';

export default defineComponent({
  name: 'HomeView',

  components: {
    HelloWorld,
  },
  setup(){
    const tokenSecurity = new TokenSecurityService();

    tokenSecurity.getSolicitudCarga()
    .then((data)=> {
      
    })

  }
});
</script>
