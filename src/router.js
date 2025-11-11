// src/router.js
import { createRouter, createWebHistory } from 'vue-router'
import Index from './Index.vue'
import ListaProdutos from './ListaProdutos.vue'
import Contatos from './Contatos.vue'
import Cadastro from './Cadastro.vue'

const routes = [
  { path: '/', component: Index },
  { path: '/produtos', component: ListaProdutos },
  { path: '/contatos', component: Contatos },
  { path: '/cadastro', component: Cadastro }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router