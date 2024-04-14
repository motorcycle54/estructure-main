const BASE_URL = "http://cea-desa-backend1.mpfn.gob.pe/ws_back2/tokensecurity/";

export class TokenSecurityService {
  async getRefreshToken() {
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Authorization": `Bearer ${sessionStorage.tokenSession}`
      }
    }
    return await fetch(`${BASE_URL}/refresh-token`,options).then(
      (response)=> response.json()
    )
  }
  async getSolicitudCarga() {
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8"
      },
      body: {
        "coModulo": "string",
        "usuario": {
          "cempCodemp": "string",
          "coDep": "string",
          "coDepCea": "string",
          "coLocal": "string",
          "coUsuario": "string",
          "deApellidoMaterno": "string",
          "deApellidoPaterno": "string",
          "deDep": "string",
          "deFullName": "string",
          "dePrenombres": "string",
          "idUserRest": "string",
          "inProveedor": "string",
          "ipPC": "string",
          "nombrePC": "string",
          "nuDni": "string",
          "sessionId": "string",
          "tiIdentificacion": 0,
          "usuPc": "string",
          "usuarioPerfiles": [
            {
              "coPerfil": 0,
              "dePerfil": "string"
            }
          ]
        }
      }
    }
    return await fetch(BASE_URL + "/goSolicitudCarga", options)
      .then((response) => response.json);
  }
}