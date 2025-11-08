// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// Importa as views
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/loginView.vue'
import CadastroUsuarioView from '../views/CadastroUsuarioView.vue'
import CadastroLivroView from '../views/CadastroLivroView.vue'
import LivroView from '../views/LivroView.vue'
import DashboardView from '../views/DashboardView.vue'
import LivrosAdminView from '../views/LivrosAdminView.vue'

// Função simples para simular "usuário logado"
function isLoggedIn() {
  return localStorage.getItem('bibliocat_logged_in') === 'true'
}

// Define as rotas
const routes = [
  { path: '/', name: 'home', component: HomeView, meta: { requiresAuth: true }},
  { path: '/login', name: 'login', component: LoginView},
  { path: '/cadastroUsuario', name: 'cadastroUsuario', component: CadastroUsuarioView },
  { path: '/cadastroLivro', name: 'cadastroLivro', component: CadastroLivroView, meta: { requiresAuth: true } },
  { path: '/livro/:id', name: 'livro', component: LivroView},
  { path: '/dashboard', name: 'dashboard', component: DashboardView},
  { path: '/livros-admin', name: 'livros-admin', component: LivrosAdminView, meta: { requiresAuth: true, requiresAdmin: true } }
]

// Cria o roteador
const router = createRouter({
  history: createWebHistory(), // usa o modo de histórico do navegador
  routes
})

// Guard global de rota para proteção
router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user'))

  if (to.meta.requiresAuth && !user) {
    return next('/login')
  }

  if (to.meta.requiresAdmin && (!user || user.role !== 'admin')) {
    return next('/')
  }

  next()
})


export default router
