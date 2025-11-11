<template>
  <div class="container d-flex align-items-center justify-content-center min-vh-100 bg-light">
    <div class="card shadow p-4" style="max-width: 400px; width: 100%;">
      <h3 class="fw-bold text-center mb-3">Cadastro - Bibliocat</h3>
      
      <form @submit.prevent="handleRegister">
        <div class="mb-3">
          <label class="form-label">Nome</label>
          <input v-model="name" type="text" class="form-control" placeholder="Seu nome" required />
        </div>

        <div class="mb-3">
          <label class="form-label">E-mail</label>
          <input v-model="email" type="email" class="form-control" placeholder="Seu e-mail" required />
        </div>

        <div class="mb-3">
          <label class="form-label">Senha</label>
          <input v-model="password" type="password" class="form-control" placeholder="Senha" required />
        </div>

        <div class="d-grid">
          <button type="submit" class="btn btn-success">Cadastrar</button>
        </div>
      </form>
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

// Mock: simula cadastro no backend
function handleRegister() {
  const user = {
    name: name.value,
    email: email.value,
    password: password.value,
  }

  console.log('Usuário cadastrado (mock):', user)
  alert(`Usuário ${name.value} cadastrado com sucesso!`)

  // Redireciona para login
  router.push('/login')
}
</script>
