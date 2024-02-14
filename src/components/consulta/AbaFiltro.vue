<template>
  <v-card>
    <v-container class="container" :fluid="true">
      <v-col :cols="6">
        <!--Campo-->
        <v-row>
          <v-select
            :label="'Campo'"
            :items="items"
            :item-title="(item) => item.descricao"
            :item-value="(item) => item"
            v-model="campoSelecionado"
          />
        </v-row>

        <!--Operador-->
        <v-row>
          <v-select
            :label="'Operador'"
            :items="operadoresPorCampo(campoSelecionado.tipo)"
            :item-title="(item) => item.descricao"
            :item-value="(item) => item"
            v-model="operadorSelecioanado"
          />
        </v-row>

        <!--Valor do Filtro-->
        <v-row>
          <v-text-field :label="'Valor'" v-model="valorFiltro" />
        </v-row>

        <v-row>
          <v-btn @click="onClickBuscarRegistros">Buscar</v-btn>
        </v-row>
      </v-col>
    </v-container>
  </v-card>
</template>

<script lang="js" setup>
//Vue
import {ref, onMounted} from  "vue"
const emit = defineEmits(["onBuscarRegistros"])

//Services
import Controller from "@/services/Controller";

const props = defineProps({
  titulo: String,
  controller: Controller
})

// Propriedades reativas
const items = ref(props.controller.camposConsulta)
const valorFiltro = ref("")
const operadorSelecioanado = ref()
const campoSelecionado = ref({
  campo: "",
  descricao: "",
  tipo: "",
})

//------------------------
// Eventos
//------------------------
function onClickBuscarRegistros(){
  try {
    const filtro = {
      campo: campoSelecionado.value.campo,
      operador: operadorSelecioanado.value.operador,
      valor: valorFiltro.value
    }

    console.log(filtro)
    emit('onBuscarRegistros', filtro)
  } catch (error) {
    console.error(error)
    throw error;
  }
}

function MontarQuery(filtro){
  let query = {}
  switch(filtro.operador){
    case "=":
      query = {
        where : {
          campo: filtro.valor,
        }
      }
    case ">":
      query = {
        where : {

        }
      }
  }
}


//------------------------
// Funções
//------------------------
onMounted(() => {
  campoSelecionado.value = props.controller.camposConsulta[0]
  operadorSelecioanado.value = operadoresPorCampo(campoSelecionado.value.tipo)[0]
})




function operadoresPorCampo(tipo){
  switch(tipo){
    case "string":
      return[
        {descricao: "Contém", operador: "like"},
        {descricao: "Não Contém", operador: "not like"},
        {descricao: "Igual", operador: "="},
        {descricao: "Diferente", operador: "<>"},
        {descricao: "Inicia com", operador: "%like"},
        {descricao: "Termina com", operador: "like%"},
      ]



    case "number":
      return[
      { descricao: "Igual", operador: "=" },
      { descricao: "Diferente", operador: "<>" },
      { descricao: "Maior que", operador: ">" },
      { descricao: "Menor que", operador: "<" },
      { descricao: "Maior ou igual", operador: ">=" },
      { descricao: "Menor ou igual", operador: "<=" }
      ]

    case "date":
      return [
      { descricao: "Igual", operador: "=" },
      { descricao: "Diferente", operador: "<>" },
      { descricao: "Maior que", operador: ">" },
      { descricao: "Menor que", operador: "<" },
      { descricao: "Maior ou igual", operador: ">=" },
      { descricao: "Menor ou igual", operador: "<=" }
      ]

    default:
      return []
  }
}
</script>

<style>
.card-content {
  margin-top: 10%;
  display: flex;
  justify-content: center;
}

.container {
  display: flex;
  justify-content: center;
}
</style>
