<template>
  <!--Verifica a quantidade de ncm, caso seja 0 a mensagem no v-card é exibida--->
  <div v-if="ncm.length === 0" style="display: grid; justify-items: center">
    <v-card>
      <v-card-text>Não há NCM cadastrado!</v-card-text>
    </v-card>
  </div>

  <div style="display: grid; justify-items: center">
    <v-list max-width="500" width="100%">
      <v-list-item v-for="ncm in ncm" :key="ncm.id">
        <v-list-item-title>Nome: {{ ncm.name }}</v-list-item-title>
        <v-list-item-title>Código: {{ ncm.code }}</v-list-item-title>

        <v-list-item-action class="d-flex flex-row pr-4">
          <v-btn icon @click="atualizarNcm(ncm)">
            <v-icon color="primary">mdi-pencil</v-icon>
          </v-btn>

          <v-btn icon @click="deletarNcm(ncm)">
            <v-icon color="error">mdi-delete</v-icon>
          </v-btn>
        </v-list-item-action>
        <v-divider />
      </v-list-item>
    </v-list>

    <v-btn
      fab
      @click="adicionarNcm()"
      color="orange"
      dark
      bottom
      class="ma-4 fixed-btn"
      ><v-icon>mdi-plus</v-icon></v-btn
    >

    <modal-confirmation
      :dialogExterno="dialogDeletar"
      @change="dialogDeletar = $event"
      @sim="confimaDeletarNcm()"
      :texto="`Tem certeza que deseja excluir o NCM ${ncmSelecionado.name}?`"
    />

    <modal-success
      :dialogExterno="dialogSuccess"
      @change="dialogSuccess = $event"
      :texto="`O NCM ${ncmSelecionado.name} foi cadastrado com sucesso!`"
    />

     <modal-error
      :dialogExterno="dialogError"
      @change="dialogError = $event"
      :texto="`Erro ao cadastrar o NCM ${ncmSelecionado.name}!`"
      :errormessage="`${error}`"
    />

    <modal-ncm
      :dialogExterno="dialogAtualizar"
      @change="dialogAtualizar = $event"
      @salvar="salvar()"
    >
      <v-text-field label="Descrição" v-model="ncmSelecionado.name" />
      <v-text-field
        label="Codigo"
        type="number"
        v-model="ncmSelecionado.code"
      />
    </modal-ncm>
  </div>
</template>

<script>
import ModalNcm from "@/components/ModalNcm.vue";
import ModalConfirmation from "@/components/ModalConfirmation.vue";
import ModalSuccess from "@/components/ModalSuccess.vue";
import ModalError from "@/components/ModalError.vue";

import { api } from "../service/api.js";


export default {
  components: {
    ModalNcm,
    ModalConfirmation,
    ModalSuccess,
    ModalError,
  },

  data() {
    return {
      ncm: [],
      ncmSelecionado: {},
      dialogDeletar: false,
      dialogAtualizar: false,
      dialogSuccess: false,
      dialogError: false,
      error: null,
    };
  },

  methods: {
    deletarNcm(ncm) {
      this.ncmSelecionado = { ...ncm };
      this.dialogDeletar = true;
    },

    async confimaDeletarNcm() {
      try {
        await api.delete(`ncm/${this.ncmSelecionado.id}`);
        this.ncm = this.ncm.filter((c) => c.id !== this.ncmSelecionado.id);
        this.dialogDeletar = false;
      } catch (error) {
        console.log(error);
      }
    },

    atualizarNcm(ncm) {
      this.ncmSelecionado = { ...ncm };
      this.dialogAtualizar = true;
    },

    adicionarNcm() {
      this.ncmSelecionado = {};
      this.dialogAtualizar = true;
    },

    async salvar() {
      try {
        let ncm;
        if (this.ncmSelecionado.id) {
          ncm = await api.put(
            `ncm/${this.ncmSelecionado.id}`,
            this.ncmSelecionado
          );
          this.ncm = this.ncm.map((c) =>
            c.id === this.ncmSelecionado.id ? ncm.data : c
          );
        } else {
          ncm = await api.post("ncm", this.ncmSelecionado);
          this.ncm.push(ncm.data);
        }
        this.dialogAtualizar = false;
        this.dialogSuccess = true;
      } catch (error) {
        console.log(error);
        this.error = error
        this.dialogError = true; 
      }
    },
  },

  async mounted() {
    try {
      const response = await api.get("ncm");
      this.ncm = response.data;
    } catch (error) {
      alert("Falha ao conectar com o servidor!")
      console.error("Erro ao carregar a lista de NCMs:", error);
    }
  },
};
</script>

<style>
.fixed-btn {
  position: fixed;
  bottom: 16px;
  right: 16px;
}
</style>