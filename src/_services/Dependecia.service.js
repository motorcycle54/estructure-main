import { BASE_URL } from "./Globales.service";

export class DependenciaService{

    async getListaDependencias(){
        const options = {
            method: "GET",
            headers: { 
                "Content-Type": "application/json;charset=UTF-8", 
                "Authorization": `Bearer ${sessionStorage.tokenSession}`
            }
        }

        return await fetch(`${BASE_URL}/dependencia`, options)
        .then((response)=> response.json())

    }

    async searchDependencia(data)
    {
        const options = {
            method:"POST",
            headers: {
                "Content-Type": "application/json;charset=UTF-8", 
                "Authorization": `Bearer ${sessionStorage.tokenSession}`
            },
            body: data
        }
        return await fetch(`${BASE_URL}/dependencia/search`, options)
        .then((response) => {
            return response.json()
        })
    }
}