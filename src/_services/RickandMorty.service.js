const BASE_URL = "https://rickandmortyapi.com/api";

export class RickandMortyService{
    async getAllEpisodes(){
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            }
        }
        return await fetch(BASE_URL+`/episode`, options)
        .then( (response) => response.json() )
    }

    async getEpisode(id){
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            }
        }

        return await fetch(BASE_URL+`/episode/${id}`, options)
        .then((response)=> response.json())
    }
}