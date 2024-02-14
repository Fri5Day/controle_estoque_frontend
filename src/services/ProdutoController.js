import Controller from "./Controller";

export default class ProdutoController extends Controller {
  camposConsulta = [
    {
      campo: "id",
      descricao: "Codigo",
      tipo: "number",
    },
    {
      campo: "descricao",
      descricao: "Descrição",
      tipo: "string",
    },
  ];

  constructor() {
    super();
  }

  async BuscarRegistros(filtro) {
    try {
      const { data } = await this.api.get(`/produtos`,filtro);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async BuscarRegistro(id) {
    try {
      const { data } = await this.api.get(`/produtos/${id}`);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
