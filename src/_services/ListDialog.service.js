export let listDialog = [];
export class ListDialogService {
    openPdf = (list_Dialog, item) => {
      if(this.searchPdf(list_Dialog, item.id,item.url)){
      }else{ 
        list_Dialog.splice(0, list_Dialog.length)
        list_Dialog.push({id: item.id, title: item.title, urlPdf: item.url, minimize: false})
        console.log("lista obje",list_Dialog)
      }      
    }

    searchPdf = (list_Dialog, itemID,url) => {
      const item = list_Dialog.find((item) => item.id == itemID)
      if(item)
      {
        item.urlPdf= url;
        item.minimize = false;
      }
        
      return !!item;
    }
}