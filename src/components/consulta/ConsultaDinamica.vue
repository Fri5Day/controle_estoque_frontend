<template>
  <v-row>
    <v-dialog v-model="exibirDialog" :fullscreen="true" :scrim="true">
      <v-toolbar :dark="true" :color="'primary'">
        <v-btn :icon="true" @click="onClickFechar">
          <v-icon>mdi-close</v-icon>
        </v-btn>

        <v-toolbar-title>{{ props.titulo }}</v-toolbar-title>
      </v-toolbar>

      <v-window v-model="abaSelecionada">
        <v-window-item>
          <AbaFiltro
            :titulo="titulo"
            :controller="consultaController"
            @onBuscarRegistros="buscarRegistros($event)"
          />
        </v-window-item>

        <v-window-item>
          <AbaResultado :registros="registros" />
        </v-window-item>
      </v-window>
    </v-dialog>
  </v-row>
</template>

<script lang="js" setup>
//Vue
import {ref} from "vue"
import { useRouter } from "vue-router";

//Components
import AbaFiltro from './AbaFiltro.vue';
import AbaResultado from "./AbaResultado.vue";

//Service
import Controller from "@/services/Controller"

const props = defineProps({
  controller: Controller,
  titulo: String,
})

// Variaveis
const router = useRouter()
const exibirDialog = ref(true)
const abaSelecionada = ref()
const consultaController = ref(props.controller)
const registros = ref()

//------------------------
// Eventos
//------------------------
function onClickFechar(){
  if(abaSelecionada.value = 0){
    router.back();
  }else{
    abaSelecionada.value -= 1
  }
}


//------------------------
// Funções
//------------------------
async function buscarRegistros(filtro){
  try {
    registros.value = await props.controller.BuscarRegistro(filtro)

    abaSelecionada.value = 1
  } catch (error) {
    console.error(error)
    //Modal de erro
  }
}
</script>
