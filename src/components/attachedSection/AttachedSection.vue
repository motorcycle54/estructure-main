<template src="./attachedSection.html"></template>
<script>
import { ref } from "@vue/reactivity";
import moment from "moment";
export default {
  name: "AttachedSection",
  props: {
    files_set: Array,
    object_file: Object,
    title: String,
    accepted: String,
    neverShow: Boolean
  },
  emits: ['files', 'openAttach', 'updateList'],
  setup(props, { emit }) {

    let dialog = ref(false);
    let files_set = ref(props.files_set);
    let object_file = props.object_file;
    let filesTemp = ref([]);
    let filesUpload = ref();
    let accepted = props.accepted;
    let title = props.title;

    function chooseFiles() {
      document.getElementById("fileUpload").accept = accepted;
      document.getElementById("fileUpload").click();
    }

    function loadedFile(event) {
      filesUpload.value = [...event.target.files];
      filesUpload.value.forEach((file) => {
        
        let emptyObj = {[object_file.att1]: file.name, [object_file.att2]:file.name};        
        emptyObj.file = file;
        filesTemp.value.push(emptyObj);
      });
    }

    function sendFormData() {
      let sentFiles = [...filesTemp.value];
      emit("files", sentFiles);
      filesTemp.value = [];
      dialog.value = false;
    }

    function openFile(file) {
      emit("openAttach", file);
    }

    function deleteFile(file) {
      files_set.value.map((item)=> { 
        if(item == file){
          item.accion = "D";
        }
        else
          item.accion = "X";
      })
      emit("updateList", files_set.value);     
      
    }

    let cerrarDialog = () => {
      filesTemp.value = [];
      dialog.value = false
    }

    return {
      files_set,
      object_file,
      dialog,
      filesTemp,
      filesUpload,
      accepted,
      title,
      chooseFiles,
      loadedFile,
      sendFormData,
      openFile,
      deleteFile,
      cerrarDialog
    };
  },
  data: () => ({
    show: false,
  }),
};
</script>
<style scoped>
  .title_section{
    color: rgb(var(--v-theme-attach_edit__title));
  }
  .v-list {
    padding: 0;
  }
  .v-list-item {
    padding: 0 9px !important;
  }

  .dialog-title {
    background: rgb(var(--v-theme-header));
    color: rgb(var(--v-theme-header_text));
  }

  .upload-file {
    color: rgb(var(--v-theme-header));
  }
</style>