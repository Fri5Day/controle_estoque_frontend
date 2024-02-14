import axios from "axios"

export default class Controller {
  baseURL = "http://localhost:4000"

  camposConsulta = [
    {
      campo: "id",
      descricao: "Codigo",
      tipo: "number"
    }
  ]

  constructor(url) {
    this.baseURL = url ?? this.baseURL
  }

  get api() {
    return axios.create({
      baseURL: this.baseURL,
      headers: {}
    })
  }

  async BuscarRegistros() {}
  async BuscarRegistro(arg) {}
}
