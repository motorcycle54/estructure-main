const BASE_URL = "http://cea-desa-backend1.mpfn.gob.pe/ws_back2";

const body = {
    "nuDni": "42424933",
    "coUsuario": "42424933",
    "dePrenombres": "DAVID",
    "deApellidoPaterno": "LEON",
    "deApellidoMaterno": "VILCA",
    "cempCodemp": "33951",
    "tiIdentificacion": 0,
    "dePassword": "123456789",
    "inicioId": "login",
    "coDep": "06406",
    "coLocal": "006",
    "ipPC": "172.25.241.31",
    "nombrePC": "DESKTOP-SFB3UHV",
    "usuPc": "Usuario",
    "sessionId": "534DFB4F581A343F11247B6432E284FF",
    "inAdmin": "0",
    "diasAntesExpiraClave": 0,
    "token": "7f0bfce9-927c-44a5-ba7e-6c887cf35bc0",
    "idUserRest": "29146",
    "coDepEqui": "3803",
    "ivEncript": [
      -29,
      -94,
      27,
      112,
      -56,
      -124,
      -33,
      -80
    ],
    "keyEncript": [
      -5,
      114,
      125,
      -62,
      -101,
      -98,
      -82,
      4,
      -38,
      114,
      48,
      125,
      59,
      123,
      12,
      35
    ],
    "usuarioAccesos": [
      {
        "coOpcion": "M02"
      },
      {
        "coOpcion": "M04"
      },
      {
        "coOpcion": "M10"
      },
      {
        "coOpcion": "M0111"
      },
      {
        "coOpcion": "M0114"
      },
      {
        "coOpcion": "M1002"
      },
      {
        "coOpcion": "M1004"
      },
      {
        "coOpcion": "M1017"
      },
      {
        "coOpcion": "M0201"
      },
      {
        "coOpcion": "M0202"
      },
      {
        "coOpcion": "M0203"
      },
      {
        "coOpcion": "M0204"
      },
      {
        "coOpcion": "M0401"
      },
      {
        "coOpcion": "M0402"
      },
      {
        "coOpcion": "M0403"
      },
      {
        "coOpcion": "M0404"
      },
      {
        "coOpcion": "M0405"
      },
      {
        "coOpcion": "M0406"
      },
      {
        "coOpcion": "M1021"
      },
      {
        "coOpcion": "M1022"
      },
      {
        "coOpcion": "M0128"
      },
      {
        "coOpcion": "M0134"
      },
      {
        "coOpcion": "M0135"
      },
      {
        "coOpcion": "M03"
      },
      {
        "coOpcion": "M10"
      },
      {
        "coOpcion": "M1006"
      },
      {
        "coOpcion": "M1008"
      },
      {
        "coOpcion": "M1020"
      },
      {
        "coOpcion": "M0301"
      },
      {
        "coOpcion": "M0302"
      },
      {
        "coOpcion": "M0303"
      },
      {
        "coOpcion": "M0304"
      }
    ],
    "coDepCea": "04818",
    "inProveedor": "0"
  }

export class LoginService {
    async getTokenSession(idRecepcion, list) {
        const options = {
          method: "POST",
          headers: {"Content-Type": "application/json;charset=UTF-8"},
          body: JSON.stringify(body)
        }
        return await fetch(BASE_URL + `/tokensecurity/login`, options)
        .then((response) => response.json())
    }
}

