<template>
  <div>
    <v-card border="md" class="pa-6 mx-auto mt-10" max-width="900">
      <v-card-title>Cadastro de transação</v-card-title>
      <v-text-field v-model="transacaoSelecionada.name" label="Nome"></v-text-field>
      <v-select v-model="transacaoSelecionada.type" :items="items" label="Tipo"></v-select>
      <v-btn color="green" @click="salvar">Gravar</v-btn>
    </v-card>

    <modal-success
      :dialogExterno="dialogSuccess"
      @change="dialogSuccess = $event"
      :texto="`A transação ${transacaoSelecionada.name} foi cadastrada com sucesso!`"
    />

    <modal-error
      :dialogExterno="dialogError"
      @change="dialogError = $event"
      :texto="`Erro ao cadastrar a transação ${transacaoSelecionada.name}!`"
    />

  </div>
</template>

<script>
import ModalConfirmation from "@/components/ModalConfirmation.vue";
import ModalSuccess from "@/components/ModalSuccess.vue";
import ModalError from "@/components/ModalError.vue";
import { api } from "@/service/api.js";

export default {
  components: {
    ModalConfirmation,
    ModalSuccess,
    ModalError,
  },

  data: () => ({
    items: ["Entrada", "Saida"],

    transacao: [], 
    transacaoSelecionada: {}, 
    dialogSuccess: false, 
    dialogError: false,
  }),

  

  methods: {
    async salvar() {
  try {
    let transacao;

    // Se há um ID, isso significa que é uma atualização
    if (this.transacaoSelecionada.id) {
      transacao = await api.put(
        `transaction/${this.transacaoSelecionada.id}`,
        this.transacaoSelecionada
      );

      // Atualize a lista de transações
      this.transacao = this.transacao.map((c) =>
        c.id === this.transacaoSelecionada.id ? transacao.data : c
      );
    } else {
      // Caso contrário, é uma nova transação, então use o método POST
      transacao = await api.post("transaction", this.transacaoSelecionada);

      // Adicione a nova transação à lista
      this.transacao.push(transacao.data);
      this.dialogSuccess = true;
    }

  } catch (error) {
    console.log(error);
    this.dialogError = true;
  }

},

  },
};
</script>

<style>
</style>