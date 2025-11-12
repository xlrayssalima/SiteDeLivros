<template>
  <div class="container mt-5">
    <h2 class="fw-bold mb-4 text-center">Dashboard Administrativo</h2>

    <!-- Exibe mensagem de erro se o carregamento falhar -->
    <div v-if="loadingError" class="alert alert-danger" role="alert">
        Falha ao carregar dados do dashboard: {{ loadingError }}. Verifique sua conexão e, se necessário, o servidor.
    </div>

    <div class="row">
      <div class="col-md-4 mb-3">
        <div class="card shadow p-4 text-center bg-info text-white">
          <h5>Total de Livros</h5>
          <p v-if="isLoading" class="display-6"><i class="fas fa-spinner fa-spin"></i></p>
          <p v-else class="display-6">{{ totalBooks }}</p>
        </div>
      </div>

      <div class="col-md-4 mb-3">
        <div class="card shadow p-4 text-center bg-warning text-dark">
          <h5>Total de Usuários</h5>
          
          
          <p class="display-6">{{ totalUsers }}</p>
        </div>
      </div>

      <div class="col-md-4 mb-3">
        <div class="card shadow p-4 text-center bg-light">
          <h5>Livros Recentes (Título)</h5>
          <ul v-if="isLoading" class="list-unstyled">
              <li><i class="fas fa-spinner fa-spin"></i></li>
          </ul>
          <ul v-else-if="recentBooks.length" class="list-unstyled text-start small mt-3">
            <!-- O back retorna 'titulo' e não 'title' -->
            <li v-for="book in recentBooks" :key="book.id" class="border-bottom py-1 px-2">
                {{ book.titulo }} (ID: {{ book.id }})
            </li>
          </ul>
          <p v-else-if="!isLoading" class="text-muted">Nenhum livro recente encontrado.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// --- Variáveis de Estado ---
const totalBooks = ref(0);
// Definido como string para exibir "N/A"
const totalUsers = ref(0); 
const recentBooks = ref([]);
const isLoading = ref(true);
const loadingError = ref(null);

// Presume-se que o URL base do backend seja 'http://localhost:3000'
const API_URL = 'http://localhost:3000';

// --- Função de Carregamento ---

async function getTotalUsuarios() {
    isLoading.value = true;
    loadingError.value = null;
  
    
    try {
        const response = await fetch(`${API_URL}/usuarios`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const usuarios = await response.json();

        if (response.ok && Array.isArray(usuarios)) {
            totalUsers.value = usuarios.length;
        } else if (response.ok) {
            loadingError.value = "Resposta do servidor inesperada: A lista de usuarios não foi retornada.";
        } else {
            loadingError.value = `Erro ao carregar dados de usuarios: ${response.status} ${response.statusText}`;
        }
    } catch (error) {
        loadingError.value = `Erro de conexão: ${error.message}`;
    } finally {
        isLoading.value = false;
    }
}

async function fetchDashboardData() {
    isLoading.value = true;
    loadingError.value = null;
    
    try {
        const response = await fetch(`${API_URL}/livros`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const livros = await response.json();

        if (response.ok && Array.isArray(livros)) {
            totalBooks.value = livros.length;

            const livrosRecentes = livros
                .sort((a, b) => b.id - a.id)
                .slice(0, 5)
                .map(l => ({ id: l.id, titulo: l.titulo })); 

            recentBooks.value = livrosRecentes;


        } else if (response.ok) {
            loadingError.value = "Resposta do servidor inesperada: A lista de livros não foi retornada.";
        } else {
            loadingError.value = `Erro ao carregar dados de livros: ${response.status} ${response.statusText}`;
        }
    } catch (error) {
        loadingError.value = `Erro de conexão: ${error.message}`;
    } finally {
        isLoading.value = false;
    }
}

// --- Ciclo de Vida ---
onMounted(() => {
    getTotalUsuarios();
    fetchDashboardData();
});
</script>

<style scoped>
/* O style scoped original foi mantido e apenas a cor do card de Usuários foi alterada para refletir o status 'N/A' */
.container {
    max-width: 900px;
}
.card {
    border: none;
    border-radius: 12px;
    transition: transform 0.2s;
}
.card:hover {
    transform: translateY(-3px);
}

/* Cores Bootstrap para os cards */
.bg-info {
    background-color: #0d6efd !important;
}
.bg-success {
    background-color: #198754 !important;
}
/* Estilo para o card de Usuários indisponível */
.bg-warning {
    background-color: #ffc107 !important;
}
.bg-light {
    background-color: #f8f9fa !important;
    color: #212529;
}
.display-6 {
    font-size: 2.5rem;
    font-weight: 700;
}
.list-unstyled li {
    font-size: 0.9em;
    padding-left: 0;
    margin-left: 0;
}
.text-start {
    text-align: left;
}
</style>