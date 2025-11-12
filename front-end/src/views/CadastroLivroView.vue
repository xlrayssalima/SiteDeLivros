<template>
  <div>
    <header>
      <h1>Cadastro de Livro</h1>
    </header>

    <main>
      <form @submit.prevent="cadastrarLivro" class="form-container">
        <!-- O v-model agora aponta para os refs dentro do objeto 'livro' -->
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
          {{ isLoading ? 'Enviando...' : 'Cadastrar' }}
        </button>
      </form>

      <!-- Mensagem de Feedback -->
      <div id="mensagem" v-if="mensagem" :style="{ color: mensagemCor }" v-html="mensagem"></div>

    </main>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
// Importação opcional do useRouter se você quiser redirecionar
// import { useRouter } from 'vue-router'; 

// const router = useRouter(); 

// Estado reativo usando ref e reactive (Composition API)
const livro = reactive({
  titulo: '',
  autor: '',
  preco: null,
  descricao: '',
  capa: ''
});

const mensagem = ref('');
const mensagemCor = ref('black');
const isLoading = ref(false); // Adicionado para controle do botão

async function cadastrarLivro() {
  isLoading.value = true;
  mensagem.value = ''; // Limpa mensagens anteriores
  
  const { titulo, autor, preco, descricao, capa } = livro;

  // Validação
  if (!titulo || !autor || !descricao || isNaN(preco) || preco <= 0 || !capa) {
    mensagem.value = 'Preencha todos os campos corretamente (Preço deve ser maior que zero).';
    mensagemCor.value = 'red';
    isLoading.value = false;
    return;
  }

  // CORREÇÃO ESSENCIAL: Carregar o token do localStorage
  const token = localStorage.getItem('token'); 
  
  if (!token) {
    mensagem.value = 'Erro: Token de autenticação não encontrado. Faça login novamente.';
    mensagemCor.value = 'red';
    isLoading.value = false;
    return;
  }

  try {
    // CORRIGIDO AQUI: A rota correta que o backend espera é /livros/admin/livros
    const res = await fetch('http://localhost:3000/livros/admin/livros', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify(livro)
    });

    if (!res.ok) {
      // Tenta ler a mensagem de erro do servidor
      const errorData = await res.json().catch(() => ({ mensagem: `Erro ${res.status}: Falha desconhecida no servidor.` }));
      
      let errorMsg = errorData.mensagem || `Erro no servidor (${res.status}). Verifique a rota e permissões.`;
      
      // Se for 403 ou 401, o token pode ser inválido/expirado
      if (res.status === 403 || res.status === 401) {
          errorMsg = `Acesso Negado (${res.status}). Verifique se você está logado como administrador.`;
      }
      // Se for 404, a URL está errada
      if (res.status === 404) {
          errorMsg = `Rota de cadastro não encontrada. A URL correta é /livros/admin/livros.`;
      }

      throw new Error(errorMsg);
    }

    const data = await res.json();
    
    // Sucesso
    mensagem.value = `Livro <strong>${data.titulo || data.nome}</strong> cadastrado com sucesso!`;
    mensagemCor.value = 'green';
    
    // Limpar o formulário após sucesso
    livro.titulo = '';
    livro.autor = '';
    livro.preco = null;
    livro.descricao = '';
    livro.capa = '';

    // Remove a mensagem após 5 segundos
    setTimeout(() => {
      mensagem.value = '';
    }, 5000);

  } catch (error) {
    mensagem.value = `<p>${error.message}</p>`;
    mensagemCor.value = 'red';
    console.error("Erro no cadastro:", error);
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