<template>
  <v-dialog v-model="dialog">
    <v-sheet
      elevation="12"
      max-width="600"
      rounded="lg"
      width="100%"
      class="pa-4 text-center mx-auto"
    >
      <v-icon
        class="mb-5"
        color="success"
        icon="mdi-check-circle"
        size="112"
      ></v-icon>

      <h2 class="text-h5 mb-6">{{ texto }}</h2>

      <v-divider class="mb-4"></v-divider>

      <div class="text-end">
        <v-btn
          color="success"
          rounded
          variant="flat"
          width="90"
          @click="dialog = false"
        >
          Fechar
        </v-btn>
      </div>
    </v-sheet>
  </v-dialog>
</template>

<script>
export default {
  props: {
    texto: {
      type: String,
      default: "Item cadastrado com sucesso!",
    },
    dialogExterno: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dialog: false,
    };
  },

  watch: {
    dialogExterno: {
      handler(newVal) {
        this.dialog = newVal;
      },
      immediate: true,
    },
    dialog: {
      handler(newVal) {
        this.$emit("change", newVal);
      },
    },
  },
};
</script>