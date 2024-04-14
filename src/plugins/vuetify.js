// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'
import colors from 'vuetify/lib/util/colors'

export default createVuetify(
  {
    theme: {
      themes: {
        light: {
          dark: false,
          colors: {            
            header: "#0f2c52",                        
            header_text: "#ffffff",
            footer: "#0f2c52",            
            footer_text: "#ffffff",
            header_edit: "#ffffff",
            remite_edit: "#ffffff",
            datdoc_edit: "#ffffff",
            expedi_edit: "#ffffff",
            attach_edit: "#ffffff",
            attach_edit__title: "#2196f3",
            attach_edit__add: "2196f3",
            attach_edit__body: "62768f",
            attach_edit__expansion:"2196f3",
            input_text: "#000000",
            input_label: "#0F2C52",
            btn_header_right: "#0F2C52",
            btn_header_left: "#003bb3",             
            btn_add: "#4caf50",
            btn_open_destinos: "#2196f3",          
            error: "#FF0000",
          }
        },
        otro1: {
          colors: {
            header: "#0f2c52",
            footer: "#0f2c52",
            footer_text: "#ffffff",
            header_edit: "#0c84e4",
            remite_edit: "#0073b7",
            datdoc_edit: "#555299",
            expedi_edit: "#0073b7",
            attach_edit: "#555299",
            input_text: "#ffffff",
          }
        },
        otro2: {
          colors: {
            header: "#1f384f",
            footer: "#1f384f",
            footer_text: "#ffffff",
            header_edit: "#20123b",
            remite_edit: "#1F7087",
            datdoc_edit: "#3d7a85",
            expedi_edit: "#385F73",
            attach_edit: "#1F7087",
            input_text: "#ffffff",
          }
        }
      },
    }
  }
  // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
)
