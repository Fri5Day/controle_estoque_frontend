import { createStore } from 'vuex'

export default createStore({
  state: {
    categories: [
      {
        name: "Produto",
        items: [{ text: "Novo" }, { text: "Consulta" }],
      },
      {
        name: "Transacao",
        items: [{ text: "Novo" }, { text: "Consulta" }],
      },
      {
        name:"Requisicoes",
        items: [{text: "Entrada"}, {text: "Saida"}, {text: "Transferencia"}]
      },
    ],

  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
