<template>
  <div class="container d-flex align-items-center justify-content-center" style="min-height: 50vh;">
    <div class="card shadow p-4" style="max-width: 400px; width: 100%;">
      <h3 class="text-center mb-4">Login</h3>

      <form @submit.prevent="handleLogin"> 
        <div class="mb-3">
          <label for="email" class="form-label">E-mail</label>
          <input
            type="email"
            id="email"
            v-model="email"
            autocomplete="off"
            class="form-control"
            placeholder="Digite seu e-mail"
            required
          />
        </div>

        <div class="mb-3">
          <label for="password" class="form-label">Senha</label>
          <input
            type="password"
            id="password"
            v-model="password"
            autocomplete="new-password"
            class="form-control"
            placeholder="Digite sua senha"
            required
          />
        </div>

        <div class="d-grid mb-3">
          <button type="submit" class="btn btn-primary">Entrar</button>
        </div>

        <p v-if="error" class="text-danger text-center">{{ error }}</p>
      </form>

      <div class="text-center mt-3">
        <router-link to="/cadastro" class="text-decoration-none">
          Ainda não tem conta? **Crie uma aqui.**
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref('')

async function handleLogin() {
  error.value = '' // Limpa erros anteriores
  
  try {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.value,
        senha: password.value // Atenção: o backend espera 'senha', não 'password'
      })
    });

    if (!response.ok) {
      // Se a resposta não for 2xx (ex: 401 Unauthorized ou 400 Bad Request)
      const data = await response.json();
      error.value = data.mensagem || 'Erro desconhecido ao tentar login.';
      return;
    }

    // Login bem-sucedido
    const data = await response.json();
    
    // Armazena o token para ser usado nos middlewares (como o POST de livros)
    localStorage.setItem('token', data.token); 
    
    // Armazena os dados do usuário, incluindo o role
    localStorage.setItem('user', JSON.stringify(data.usuario)); 

    // Redirecionamento
    if (data.usuario.role === 'admin') {
      router.push('/dashboard'); // Ou qualquer rota para admin
    } else {
      router.push('/');
    }

  } catch (err) {
    console.error('Falha na comunicação com o servidor:', err);
    error.value = 'Não foi possível conectar ao servidor. Tente novamente.';
  }
}
</script>

<style scoped>
body {
  background-color: #f8f9fa;
}
</style>
