<template>
  <div class="container d-flex align-items-center justify-content-center min-vh-100 bg-light">
    <div class="card shadow p-4" style="max-width: 400px; width: 100%;">
      <div class="text-center mb-4">
        <h3 class="fw-bold">Login - Bibliocat</h3>
        <p class="text-muted">Bem-vindo ao portal de livros 📚</p>
      </div>

      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label for="email" class="form-label">E-mail</label>
          <input
            type="email"
            id="email"
            v-model="email"
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
            class="form-control"
            placeholder="Digite sua senha"
            required
          />
        </div>

        <div class="d-grid mb-3">
          <button type="submit" class="btn btn-primary">Entrar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const password = ref('')
const error = ref('')

function handleLogin() {
  if (username.value === 'admin' && password.value === 'admin') {
    localStorage.setItem('user', JSON.stringify({ username: 'admin', role: 'admin' }))
    router.push('/dashboard')
  } else if (username.value && password.value) {
    // usuário normal
    localStorage.setItem('user', JSON.stringify({ username: username.value, role: 'user' }))
    router.push('/')
  } else {
    error.value = 'Credenciais inválidas.'
  }
}
</script>
