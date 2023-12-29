<template>
  <v-app>
    <v-app-bar color="primary" prominent>
      <v-app-bar-nav-icon
        variant="text"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <v-toolbar-title>Estoque</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn variant="text" icon="mdi-dots-vertical"></v-btn>
      
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" location="left" temporary>
      <v-list >
        <v-list-group
          v-for="category in $store.state.categories"
          :key="category.name"
          :value="category.name"
        >
          <template #activator="{ props }">
            <v-list-item v-bind="props" :title="category.name"></v-list-item>
          </template>
          <v-list-item v-for="item in category.items" :key="item.text">
            <v-btn
              variant="text"
              @click="navigateToPage(category.name, item.text)"
              >{{ item.text }}</v-btn
            >
          </v-list-item>
        </v-list-group>

         <v-list-item @click="navigateToNcm">
          <v-btn variant="text">NCM</v-btn>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main app>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
   
  }),

  methods: {
    navigateToPage(category, page) {
      if (page === "Novo") {
        // Redirecione para a rota correspondente ao componente 'Product' ou 'Transaction'
        const componentName =
          category === "Produto" ? "Product" : "Transaction";
        this.$router.push({ name: componentName });
      } else {
        console.log("Botão Consulta clicado");
      }
    },
    
    navigateToNcm() {
      this.$router.push({ name: "Ncm" });
    },
  },

  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>
