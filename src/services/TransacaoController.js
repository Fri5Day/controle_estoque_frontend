import Controller from "./Controller"

export default class TransacaoController extends Controller {
  camposConsulta = [
    {
      campo: "id",
      descricao: "Codigo",
      tipo: "number"
    },
    {
      campo: "descricao",
      descricao: "Descrição",
      tipo: "string"
    }
  ]

  constructor() {
    super()
  }

  async BuscarRegistros() {
    try {
      const { data } = await this.api.get(`/transacoes`)
      return data
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async BuscarRegistro(id) {
    try {
      const { data } = await this.api.get(`/transacoes/${id}`)
      return data
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
