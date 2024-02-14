import { ConstantesEstoque } from "@/constantes/ConstantesModulo"
import ProdutoController from "@/services/ProdutoController"
import TransacaoController from "@/services/TransacaoController"

// Composables
import { createRouter, createWebHistory } from "vue-router"

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("@/views/Home.vue")
      },

      {
        path: "/produto",
        children: [
          {
            path: "novo",
            name: "Product",
            component: () => import("@/views/Product.vue")
          },
          {
            path: "consulta",
            name: "ProductConsult",
            component: () =>
              import("@/components/consulta/ConsultaDinamica.vue"),
            props: {
              titulo: "Consulta de Produtos",
              controller: new ProdutoController()
            }
          }
        ]
      },

      {
        path: "/transacao",
        children: [
          {
            path: "novo",
            name: "Transaction",
            component: () => import("@/views/Transaction.vue")
          },
          {
            path: "consulta",
            name: "TransactionConsult",
            component: () =>
              import("@/components/consulta/ConsultaDinamica.vue"),
            props: {
              titulo: "Consulta de Transações",
              controller: new TransacaoController()
            }
          }
        ]
      },

      {
        path: "/ncm",
        name: "Ncm",
        component: () => import("@/views/Ncm.vue")
      },

      {
        path: "/entrada",
        name: "Input",
        component: () => import("@/views/Input.vue")
      },

      {
        path: "/saida",
        name: "Output",
        component: () => import("@/views/Output.vue")
      },

      {
        path: "/:pathMatch(.*)*",
        redirect: { name: "Home" }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
