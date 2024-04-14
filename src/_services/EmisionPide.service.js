import { BASE_URL } from "./Globales.service";

export class EmisionPideService {

  async getEditEmisionPide(id) {
    const options = {
      method: "GET",
      headers: { 
        "Content-Type": "application/json;charset=UTF-8",
        "Authorization": `Bearer ${sessionStorage.tokenSession}`
      },      
    }
    return await fetch(BASE_URL + `/emision/${id}`,options)
    .then((response) => response.json())
  }

  async getListaEmisionPide(data) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Authorization": `Bearer ${sessionStorage.tokenSession}`
      },
      body: data
    }
    return await fetch(BASE_URL + `/emision/search`, options)
      .then((response) => {
        return response.json()
      })
  }
}