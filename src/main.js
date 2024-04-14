import { createApp } from 'vue'
import App from './App.vue';
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import TableofList from './components/tablaofList/TableofList.vue';
//import FilterSection from './components/filterSection/filterSection.vue';
import addFilters from './components/AddFilters/addFilters.vue';
import AttachedSection from './components/attachedSection/AttachedSection.vue';
import SelectInput from './components/selecInput/SelectInput.vue';
import DialogConfirmation from './components/dialogConfirmation/DialogConfirmation.vue';
import alertSnackbar from './components/alert-snackbar/alert-snackbar.vue';
import connectionVisor from './components/connectionVisor/connectionVisor.vue';

import { CatalogService } from './_services/Catalog.service';
import { LoginService } from './_services/Login.service';
import { WSClientMPFN } from './plugins/ws/wsClientMPFN';
import { CapitalLettersDirective } from './_directives/onlyCapitalLetters';
import { OnlyDigitsDirective } from './_directives/onlyDigits';
import { MaxLengthDirective } from './_directives/maxLength';
import { ref } from '@vue/reactivity';
import { AlphabeticDirective } from './_directives/onlyAlphabetic';


loadFonts()

const catalogService = new CatalogService();
const loginService = new LoginService();
const wsClientTramiteDoc = new WSClientMPFN();

let list_priority = ref([]);
let list_state = ref([]);
let list_dependencies =ref([]);
let list_locales = ref([]);
let theme_name = ref("light");
let objectSession = {
    coDependencia: "00002",
    coEmpleado: "00002",
    codUser: "cshuan",
};

(async ()=> {
    let intentos = 5;
    for(let i=0; i < intentos; i++){
        const response = await wsClientTramiteDoc.openConectionCliente();
        if(!response.conectado){
            setTimeout(function () {                
                wsClientTramiteDoc.abrirCliente()
            }, 2000);
        }else{
            wsClientTramiteDoc.setPCData();            
            return;
        }
    }
})();

(async ()=> {
    await loginService.getTokenSession().then(
        (data) => {
            if(data.status){
                sessionStorage.tokenSession = data.data;
            }
        }
    )
    await catalogService.getListPrioridad().then(
        (data) => {
            if (data.status) {
                list_priority.value = data.data;
            }
            else {
                console.log("error cargando lista de prioridades", data.mensaje);
            }
        }
    )
    await catalogService.getListEstados("recepcion").then(
        (data) => {
            if (data.status) {
                list_state.value = [{idEstado: '', deEstado: 'TODOS'}, ...data.data];
            }
            else {
                console.log("error cargando lista de Estados", data.mensaje);
            }
        }
    )    
    await catalogService.getLocalesDep().then(
        (data) => {
            if (data.status) {
                list_locales.value = data.data;
            }
            else {
                console.log("error cargando lista de locales", data.mensaje);
            }
        }
    )
})()

const app = createApp(App)
app.component('tableof-list', TableofList)
app.component('add-filters', addFilters)
app.component('attached-section', AttachedSection)
app.component('select-input', SelectInput)
app.component('dialog-confirmation',DialogConfirmation)
app.component('snackbar-alert',alertSnackbar)
app.component('connection-visor', connectionVisor)
app.directive('uppercase-only', CapitalLettersDirective)
app.directive('digits-only', OnlyDigitsDirective)
app.directive('max-length', MaxLengthDirective)
app.directive('alphabetic-only', AlphabeticDirective)
app.config.globalProperties.$list_priority = list_priority;
app.config.globalProperties.$list_state = list_state;
app.config.globalProperties.$list_dependencies = list_dependencies;
app.config.globalProperties.$list_locales = list_locales;
app.config.globalProperties.$objectSession = objectSession;
app.config.globalProperties.$theme_name = theme_name;

app.use(router)
    .use(vuetify)
    .mount('#app')
