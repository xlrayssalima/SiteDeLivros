<template>
  <div>
    <header>
      <h1>Cadastro de Usuário</h1>
    </header>

    <main>
      <form @submit.prevent="handleRegister" class="container">
        <div class="mb-3">
          <label for="name">Nome</label>
          <input v-model="name" type="text" class="form-control" placeholder="Seu nome" required />
        </div>

        <div class="mb-3">
          <label for="email">E-mail</label>
          <input v-model="email" type="email" class="form-control" placeholder="Seu e-mail" required />
        </div>

        <div class="mb-3">
          <label for="password">Senha</label>
          <input v-model="password" type="password" class="form-control" placeholder="Mínimo 6 caracteres" required />
        </div>

        <div class="d-grid mt-4">
          <button type="submit" class="btn btn-success btn-cadastro" :disabled="isLoading">
            <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            {{ isLoading ? 'Cadastrando...' : 'Cadastrar' }}
          </button>
        </div>
      </form>
    </main>
      
    <div class="text-center mt-3">
      <router-link to="/login" class="link-login">Já tem conta? Faça Login</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const name = ref('')
const email = ref('')
const password = ref('')
const isLoading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')
const apiUrl = 'http://localhost:3000/cadastro'; 

async function handleRegister() {
  // Limpa mensagens anteriores
  successMessage.value = '';
  errorMessage.value = '';
  isLoading.value = true;
  
  // Verifica preenchimento básico
  if (!name.value || !email.value || !password.value) {
    errorMessage.value = 'Por favor, preencha todos os campos.';
    isLoading.value = false;
    return;
  }

  // Prepara o payload (o backend espera 'nome', 'email', e 'senha')
  const payload = {
    nome: name.value,
    email: email.value,
    senha: password.value, // Enviando a senha em texto puro para ser hasheada pelo backend
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    // Se a resposta não for OK (status 409 - Conflito, 400 - Bad Request, 500 - Server Error)
    if (!response.ok) {
      const data = await response.json();
      // Exibe a mensagem de erro específica do backend (ex: "E-mail já cadastrado.")
      errorMessage.value = data.mensagem || `Erro ${response.status}: Falha ao registrar usuário.`;
      return;
    }

    // Cadastro bem-sucedido (Status 201 Created)
    const data = await response.json();
    
    successMessage.value = data.mensagem || "Usuário cadastrado com sucesso!";
    
    // Opcional: Limpar campos após o sucesso
    name.value = '';
    email.value = '';
    password.value = '';
    
    // Redireciona para login após um pequeno atraso para o usuário ver a mensagem
    setTimeout(() => {
      router.push('/login');
    }, 1500);

  } catch (err) {
    console.error('Erro na comunicação:', err);
    errorMessage.value = 'Não foi possível conectar ao servidor. Verifique sua conexão ou o status do backend.';
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped>
@import "../style.css";
/* Ou copie o conteúdo de style.css para cá */
</style>