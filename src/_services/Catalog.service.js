import { BASE_URL } from "./Globales.service";

export class CatalogService{

    async getListPrioridad(){
        const options = {
            method: "GET",
            header: { "Content-Type": "application/json;charset=UTF-8"}
        }

        return await fetch(`${BASE_URL}/prioridad`)
        .then((response)=> response.json())

    }
    
    async getListEstados(tipo){        
        const options = {
            method: "GET",
            header: { "Content-Type": "application/json;charset=UTF-8"}
        }

        return await fetch(`${BASE_URL}/estado/search?tipo=${tipo}`)
        .then((response)=> response.json())
    }

    async getLocalesDep(){
        const options = {
            method: "GET",
            headers: { 
                "Content-Type": "application/json;charset=UTF-8", 
                "Authorization": `Bearer ${sessionStorage.tokenSession}`
            }
        }

        return await fetch(`${BASE_URL}/local`, options)
        .then((response)=> response.json())
    }
}