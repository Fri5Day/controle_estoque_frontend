<template>
  <div>
    <v-card border="md" class="pa-6 mx-auto mt-10" max-width="900">
      <v-card-title>Cadastro de produto</v-card-title>
      <form>
        <v-text-field
          v-model="produtoSelecionado.name"
          label="Nome"
          @input="onInputChange"
        ></v-text-field>
        <v-select
          v-model="produtoSelecionado.ncmId"
          :items="ncmList"
          item-value="id"
          item-title="name"
          label="NCM"
          @click="carregarNcmList"
        ></v-select>
        <v-text-field
          v-model="produtoSelecionado.salePrice"
          type="number"
          label="Preço de venda"
        ></v-text-field>
        <v-text-field
          v-model="produtoSelecionado.buyPrice"
          type="number"
          label="Preço de compra"
        ></v-text-field>
        <v-text-field
          v-model="produtoSelecionado.balance"
          type="number"
          label="Saldo"
          disabled
        ></v-text-field>

        <v-btn class="me-4" @click="salvar" color="green"> Gravar </v-btn>
        <v-btn @click="limparFormulario"> Cancelar </v-btn>
      </form>
    </v-card>

    <modal-success
      :dialogExterno="dialogSuccess"
      @change="dialogSuccess = $event"
      :texto="`O Produto ${produtoSelecionado.name} foi cadastrado com sucesso!`"
    />

    <modal-error
      :dialogExterno="dialogError"
      @change="dialogError = $event"
      :texto="`Erro ao cadastrar o Produto ${produtoSelecionado.name}!`"
      :errormessage="`${error}`"
    />
  </div>
</template>

<script>
import ModalSuccess from "@/components/ModalSuccess.vue";
import ModalError from "@/components/ModalError.vue";
import { api } from "@/services/api.js";

export default {
  components: {
    ModalError,
    ModalSuccess,
  },

  data() {
    return {
      produtoSelecionado: {},
      ncmList: [],
      dialogSuccess: false,
      dialogError: false,
      error: null,
    };
  },

  methods: {
    onInputChange() {
      this.produtoSelecionado.name = this.produtoSelecionado.name.toUpperCase();
    },

    async carregarNcmList() {
      try {
        const response = await api.get("ncm");
        if (response.data && Array.isArray(response.data)) {
          // Ajuste para usar o id do NCM como valor
          this.ncmList = response.data.map((item) => ({
            name: item.name,
            id: item.id,
          }));
        } else {
          console.error("Resposta inválida da API para 'ncm'.", response);
        }
      } catch (error) {
        this.error = error;
        console.error("Erro ao carregar a lista de NCMs:", error);
      }
    },

    async salvar() {
      try {
        if (!("balance" in this.produtoSelecionado)) {
          this.produtoSelecionado.balance = 0;
        }

        let produto;
        if (this.produtoSelecionado.id) {
          // Atualização de produto existente
          produto = await api.put(
            `product/${this.produtoSelecionado.id}`,
            this.produtoSelecionado
          );

          // Atualiza a lista de produtos localmente
          this.produto = this.produto.map((c) =>
            c.id === this.produtoSelecionado.id ? produto.data : c
          );
        } else {
          // Novo produto
          produto = await api.post("product", this.produtoSelecionado);
          this.dialogSuccess = true;
          this.limparFormulario();
        }
      } catch (error) {
        console.error(error);
        this.error = error;
        this.dialogError = true;
      }
    },

    limparFormulario() {
      this.produtoSelecionado = {};
    },
  },
};
</script>
