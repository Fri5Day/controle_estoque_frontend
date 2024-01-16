<template>
  <div>
    <v-card border="md" class="pa-6 mx-auto mt-10" max-width="900">
      <form @submit.prevent="submit">
        <v-card-title>Requisição de saída</v-card-title>
        <v-text-field
          label="Emissão"
          v-model="saidaSelecionada.date"
          type="date"
        ></v-text-field>
        <v-select
          v-model="saidaSelecionada.product_id"
          :items="productList"
          item-title="name"
          item-value="id"
          @click="loadProductList"
          label="Item"
        ></v-select>
        <v-text-field
          label="Quantidade"
          v-model="saidaSelecionada.balance"
          type="number"
        ></v-text-field>

        <v-btn class="me-4" color="green" @click.prevent="salvar">Gravar</v-btn>

        <v-btn>Cancelar</v-btn>
      </form>
    </v-card>

    <modal-success
      :dialogExterno="dialogSuccess"
      :texto="`A requisição de saída foi cadastrada com sucesso!`"
      @change="dialogSuccess = $event"
    />

    <modal-error
      :dialogExterno="dialogError"
      @change="dialogError = $event"
      :texto="`Erro ao cadastrar a requisição de saída!`"
      :errormessage="`${error}`"
    />
  </div>
</template>

<script>
import ModalSuccess from "@/components/ModalSuccess.vue";
import ModalError from "@/components/ModalError.vue";
import { api } from "@/service/api.js";


export default {
  components: {
    ModalSuccess,
    ModalError
  },

  data() {
    return {
      saidaSelecionada: {
        date: null,
        product_id: null,
        balance: null
      },
      productList: [],
      dialogSuccess: false,
      dialogError: false,
      error: null,

    };
  },

  methods: {
    async loadProductList() {
      try {
        const response = await api.get("product");
        if (response.data && Array.isArray(response.data)) {
          // Ajuste para usar o id do Produto como valor
          this.productList = response.data.map((item) => ({
            name: item.name,
            id: item.id,
          }));
        } else {
          console.error("Resposta inválida da API para 'produto'.", response);
        }
      } catch (error) {
        this.error = error;
        console.error("Erro ao carregar a lista de Produtos:", error);
      }
    },

    async salvar() {
      try {
        const sainda = await api.post("output", this.saidaSelecionada);

        this.dialogSuccess = true;
        //this.limparFormulario();
      } catch (error) {
        console.error(error);
        this.error = error;
        this.dialogError = true;
      }
    },
  },
};
</script>

<style>
</style>