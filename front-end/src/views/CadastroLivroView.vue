<template>
  <div>
    <header>
      <h1>{{ isEditando ? 'Editar Livro' : 'Cadastro de Livro' }}</h1>
    </header>

    <main>
      <form @submit.prevent="cadastrarLivro" class="form-container">
        <label for="titulo">Titulo:</label>
        <input type="text" id="titulo" v-model="livro.titulo" required /> 
        
        <label for="autor">Autor:</label>
        <input type="text" id="autor" v-model="livro.autor" required />

        <label for="preco">Preço:</label>
        <input type="number" id="preco" v-model.number="livro.preco" step="0.01" required />

        <label for="descricao">Descrição:</label>
        <textarea id="descricao" v-model="livro.descricao" required></textarea>

        <label for="capa">URL da Imagem de Capa:</label>
        <input type="text" id="capa" v-model="livro.capa" required />

        <button type="submit" :disabled="isLoading">
          {{ isLoading ? 'Salvando...' : (isEditando ? 'Atualizar Livro' : 'Cadastrar') }}
        </button>
      </form>

      <div id="mensagem" v-if="mensagem" :style="{ color: mensagemCor }" v-html="mensagem"></div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const livro = reactive({
  titulo: '',
  autor: '',
  preco: null,
  descricao: '',
  capa: ''
});

const mensagem = ref('');
const mensagemCor = ref('black');
const isLoading = ref(false);
const isEditando = ref(false);

onMounted(async () => {
  const id = route.params.id;
  if (id) {
    isEditando.value = true;
    try {
      const res = await fetch(`http://localhost:3000/livros/${id}`);
      if (!res.ok) throw new Error('Livro não encontrado.');
      const data = await res.json();
      Object.assign(livro, data);
    } catch (err) {
      mensagem.value = err.message;
      mensagemCor.value = 'red';
    }
  }
});

async function cadastrarLivro() {
  isLoading.value = true;
  mensagem.value = '';

  const token = localStorage.getItem('token');
  if (!token) {
    mensagem.value = 'Erro: token de autenticação não encontrado.';
    mensagemCor.value = 'red';
    isLoading.value = false;
    return;
  }

  const metodo = isEditando.value ? 'PUT' : 'POST';
  const url = isEditando.value
    ? `http://localhost:3000/livros/admin/${route.params.id}`
    : 'http://localhost:3000/livros/admin/livros';

  try {
    const res = await fetch(url, {
      method: metodo,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(livro)
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.mensagem || 'Erro ao salvar o livro.');

    mensagem.value = isEditando.value
      ? `Livro <strong>${data.titulo}</strong> atualizado com sucesso!`
      : `Livro <strong>${data.titulo}</strong> cadastrado com sucesso!`;
    mensagemCor.value = 'green';

    // Após 2s, volta à lista de livros admin
    setTimeout(() => router.push('/'), 2000);
  } catch (err) {
    mensagem.value = err.message;
    mensagemCor.value = 'red';
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped>
/* Você pode manter o import ou copiar os estilos aqui */
.form-container {
    display: flex;
    flex-direction: column;
    max-width: 600px;
    margin: 2rem auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

label {
    margin-top: 10px;
    font-weight: bold;
}

input[type="text"],
input[type="number"],
textarea {
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

textarea {
    resize: vertical;
    min-height: 100px;
}

button {
    padding: 10px 15px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
}

button:hover:not(:disabled) {
    background-color: #218838;
}

button:disabled {
    background-color: #90ee90;
    cursor: not-allowed;
}

#mensagem {
    text-align: center;
    margin-top: 20px;
    font-weight: bold;
    padding: 10px;
    border-radius: 4px;
}
</style>