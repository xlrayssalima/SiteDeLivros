import { createRouter, createWebHistory } from 'vue-router';
import ListaProdutos from '../components/ListaProdutos.vue';
import DetalheProduto from '../components/DetalheProduto.vue';

const routes = [
  { path: '/', component: ListaProdutos },
  { path: '/detalhe/:id', component: DetalheProduto }
];

export default createRouter({
  history: createWebHistory(),
  routes
});