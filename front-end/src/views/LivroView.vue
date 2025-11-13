<template>
  <main id="produto-detalhe">
    <!-- mensagens -->
    <div v-if="erro" class="message-error">
      <h2>Erro ao Carregar Produto</h2>
      <p>{{ erro }}</p>
      <router-link to="/" class="btn-voltar error">← Voltar</router-link>
    </div>

    <div v-else-if="removido" class="message-success">
      <h2>Produto removido.</h2>
      <p>O registro foi excluído com sucesso.</p>
    </div>

    <!-- detalhes -->
    <div v-else-if="produto" class="produto-detalhe-wrapper">
      <div class="produto-detalhe-card shadow-sm">
        <div class="produto-img-wrapper">
          <img :src="produto.capa" :alt="produto.titulo" class="produto-img" />
        </div>

        <div class="produto-info">
          <h2>{{ produto.titulo }}</h2>
          <div class="meta-info">
            <p class="autor-info"><strong>Autor:</strong> {{ produto.autor }}</p>
            <p class="preco-destaque">
              <span>R$ {{ formatarPreco(produto.preco) }}</span>
            </p>
          </div>
          <p class="descricao"><strong>Descrição:</strong> {{ produto.descricao }}</p>
          <p v-if="produto.detalhes" class="detalhes"><strong>Detalhes:</strong> {{ produto.detalhes }}</p>

          <div class="action-buttons" v-if="usuario && usuario.role === 'admin'">
            <router-link :to="`/editar/${produto.id}`" class="btn-editar">Editar</router-link>
            <button @click="abrirModalExclusao" class="btn-excluir">Excluir Produto</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de confirmação -->
    <div v-if="mostrarModal" class="modal-overlay">
      <div class="modal-container">
        <div class="modal-content">
          <h3>Confirmar exclusão</h3>
          <p>Tem certeza que deseja excluir o livro <strong>{{ produto.titulo }}</strong>?</p>

          <div class="modal-buttons">
            <button @click="confirmarExclusao" class="btn-excluir">Sim, excluir</button>
            <button @click="fecharModal" class="btn-voltar">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// Instâncias do roteador
const route = useRoute();
const router = useRouter();

// Estados reativos
const produto = ref(null);
const erro = ref('');
const removido = ref(false);
const usuario = ref(null);
const mostrarModal = ref(false);

// Função utilitária
function formatarPreco(valor) {
  return parseFloat(valor).toFixed(2).replace('.', ',');
}

// Funções do modal
function abrirModalExclusao() {
  mostrarModal.value = true;
}

function fecharModal() {
  mostrarModal.value = false;
}

// Confirma exclusão
async function confirmarExclusao() {
  try {
    const res = await fetch(`http://localhost:3000/livros/admin/${produto.value.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!res.ok) throw new Error('Erro ao tentar excluir o produto no servidor.');

    removido.value = true;
    mostrarModal.value = false;

    // Redireciona após 2 segundos
    setTimeout(() => router.push('/'), 2000);

  } catch (err) {
    erro.value = err.message;
    mostrarModal.value = false;
  }
}

// Montagem inicial
onMounted(async () => {
  usuario.value = JSON.parse(localStorage.getItem('user')) || null;
  const id = route.params.id;

  try {
    const res = await fetch(`http://localhost:3000/livros/${id}`);
    if (!res.ok) throw new Error(`Erro ${res.status}: Produto não encontrado`);
    produto.value = await res.json();
  } catch (err) {
    erro.value = err.message;
  }
});
</script>

<style scoped>
.produto-detalhe-wrapper {
  padding: 2rem 1rem;
  width: 100%; 
}

.produto-detalhe-card {
  display: flex; 
  gap: 1.5rem;
  padding: 1.5rem;
  border-radius: 8px;
  
  margin: 0 auto; 
  min-width: 900px;
  width: 90%; 
  max-width: 1400px;
  
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.produto-img-wrapper {
  width: 250px; 
  height: 350px; 
  flex-shrink: 0; 
  overflow: hidden;
  border-radius: 4px;
}

.produto-img {
  width: 100%; 
  height: 100%; 
  object-fit: cover;
  display: block; 
}

.produto-info {
  flex: 1; 
  display: flex; 
  flex-direction: column; 
}

.produto-info h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  line-height: 1.2;
}

.meta-info {
  display: flex;
  justify-content: space-between; 
  align-items: center;
  margin-bottom: 1.5rem; 
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee; 
}

.autor-info {
    margin: 0;
    font-size: 1rem;
    color: #333; 
}

.preco-destaque {
    margin: 0;
}

.preco-destaque span {
    background-color: #d4edda; 
    color: #155724; 
    font-weight: bold;
    font-size: 1.1rem;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    border: 1px solid #c3e6cb;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.produto-info p {
  margin-bottom: 0.75rem; 
  text-align: left; 
  color: #333; 
  font-weight: normal; 
}

.descricao, .detalhes {
    line-height: 1.5;
    text-align: justify; 
    margin-top: 1rem;
}

.action-buttons {
  margin-top: auto; 
  padding-top: 1rem; 
  border-top: 1px solid #eee;
  display: flex;
  gap: 0.5rem;
}

.btn-editar,
.btn-excluir,
.btn-voltar {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  cursor: pointer;
  border: none;
  font-weight: bold;
}

.btn-editar {
  background-color: #007bff;
  color: #fff;
}

.btn-excluir {
  background-color: #dc3545;
  color: #fff;
}

.btn-voltar {
  background-color: #6c757d;
  color: #fff;
  margin-top: 1rem;
  display: inline-block;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000; /* garantir que fique por cima de tudo */
}

.modal-container {
  width: 100%;
  max-width: 420px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
  padding: 1.5rem 2rem;
  text-align: center;
  animation: modalFadeIn 0.25s ease;
}

.modal-content h3 {
  margin-bottom: 0.5rem;
  color: #333;
}

.modal-content p {
  color: #555;
  margin-bottom: 1.5rem;
}

.modal-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.modal-buttons .btn-excluir,
.modal-buttons .btn-voltar {
  flex: 1; /* 🔹 ambos ocupam o mesmo espaço */
  max-width: 140px; /* limite de largura */
  padding: 0.6rem 1rem;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s;
}

/* Cores padronizadas dentro do modal */
.modal-buttons .btn-excluir {
  background-color: #dc3545;
  color: #fff;
}

.modal-buttons .btn-excluir:hover {
  background-color: #b52a38;
}

.modal-buttons .btn-voltar {
  background-color: #6c757d;
  color: #fff;
}

.modal-buttons .btn-voltar:hover {
  background-color: #5a6268;
}

@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: translateY(-15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>