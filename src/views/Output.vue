<template>
  <div>
    <v-card border="md" class="pa-6 mx-auto mt-10" max-width="900">
      <form @submit.prevent="submit">
        <v-card-title>Requisição de saída</v-card-title>
        <v-text-field label="Emissão" type="date"></v-text-field>
        <v-text-field label="Item"></v-text-field>
        <v-text-field label="Quantidade" type="number"></v-text-field>

        <v-btn class="me-4" color="green">Gravar</v-btn>

        <v-btn>Cancelar</v-btn>
      </form>
    </v-card>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>