<template>
  <div>
    <header>
      <div class="topo">
        <h1>Livraria<br>Bibliocat</h1>
        
        <nav>
          <ul>
            <li class="nav-item"><router-link class="nav-link" to="/">Home</router-link></li>
            
            <li class="nav-item" v-if="isAdmin">
              <router-link class="nav-link" to="/dashboard">Dashboard</router-link>
            </li>

            <li class="nav-item" v-if="isAdmin">
              <router-link class="nav-link" to="/admin/livros">Cadastro Novo Livro</router-link>
            </li>
            
            <li class="nav-item" v-if="isAdmin">
              <router-link class="nav-link" to="/cadastro">Cadastro Novo Usuário</router-link>
            </li>
            
            <template v-if="isLoggedIn">
              <li class="nav-item">
                <span class="nav-link user-name">Olá, {{ userName }}</span>
              </li>
              <li class="nav-item">
                <button @click="logout" class="nav-link btn-sair">Sair</button>
              </li>
            </template>
            
            <li class="nav-item" v-else>
              <router-link class="nav-link" to="/login">Login</router-link>
            </li>

          </ul>
        </nav>
        
        <img src="/img/banner.png" alt="Livro" class="gatinho-banner" />
      </div>
    </header>

    <main>
      <section class="card-container">
        <router-view />
      </section>
    </main>

    <footer>
      <p>&copy; 2025 Girls in code</p>
      <img src="/img/folha.jpg" class="footer-img" />
    </footer>
  </div>
</template>


<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
// const currentYear = ref(new Date().getFullYear()); // Não é usado no footer fornecido

// --- Variáveis de Estado de Autenticação ---
const user = ref(null); // Objeto completo do usuário
const isLoggedIn = computed(() => !!user.value);
// Use o nome do usuário ou 'Visitante'
const userName = computed(() => user.value ? user.value.nome : 'Visitante'); 
// Verifica se o role é 'admin'
const isAdmin = computed(() => user.value && user.value.role === 'admin');

// --- Funções de Lógica ---

function loadAuthState() {
  const userData = localStorage.getItem('usuario');
  if (userData) {
    try {
      user.value = JSON.parse(userData);
    } catch (e) {
      console.error("Erro ao carregar dados do usuário do localStorage:", e);
      user.value = null;
      localStorage.removeItem('usuario');
      localStorage.removeItem('token');
    }
  } else {
    user.value = null;
  }
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');
  user.value = null;
  
  // Redireciona para login após sair
  router.push('/login');
}

// --- Ciclo de Vida e Observadores ---

// 1. Carrega o estado de autenticação quando o componente é montado
onMounted(loadAuthState);

// 2. Garante que o estado seja recarregado a cada navegação (para login/logout)
watch(route, () => {
  loadAuthState();
}, { deep: true, immediate: true }); 
</script>

<style scoped>
@import "./style.css";

/* * Ajustes de estilo para que o nome de usuário e o botão Sair 
 * se pareçam com itens de navegação (nav-item / nav-link).
 *
 * NOTA: O 'nav-link' já garante que a cor e o espaçamento sejam herdados 
 * da folha de estilo './style.css'.
 */

.nav-link.user-name {
    /* Garante que o span se comporte como link e tenha o padding correto */
    cursor: default; /* Indica que não é clicável */
    font-weight: bold;
}

.btn-sair {
    /* O botão Sair deve ter aparência de link, mas com comportamento de botão */
    background: none;
    border: none;
    color: inherit; /* Herda a cor do nav-link */
    cursor: pointer;
    padding: 0; /* O padding será dado pela classe nav-link */
    font-size: 1em; /* Garante que o tamanho da fonte seja o mesmo */
    text-align: left; /* Alinha o texto do botão */
    
    /* Remove a cor de fundo e borda padrão do navegador */
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}

.btn-sair:hover {
    /* Adiciona um efeito hover para indicar interatividade, herdando o estilo do nav-link:hover */
    text-decoration: underline; 
    opacity: 0.8;
}

/* Garante que o botão Sair use o estilo do nav-link (que é o que está no template) */
.nav-item .btn-sair.nav-link {
    /* Ajusta o nav-link aplicado ao botão para garantir que o estilo do link seja prioritário */
    display: block; /* Ocupa o espaço correto dentro do li */
    line-height: inherit;
}
</style>