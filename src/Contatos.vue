<template>
  <div class="contato-container">
    <h2>Fale com a Livraria</h2>
    <form @submit.prevent="enviarFormulario">
      <label for="nome">Nome:</label>
      <input type="text" id="nome" v-model="nome" required />

      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required />

      <label for="mensagem">Mensagem:</label>
      <textarea id="mensagem" v-model="mensagem" required></textarea>

      <button type="submit">Enviar</button>
    </form>

    <p v-if="enviado" class="sucesso">Mensagem enviada com sucesso!</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const nome = ref('')
const email = ref('')
const mensagem = ref('')
const enviado = ref(false)

function enviarFormulario() {
  // Aqui você pode integrar com backend futuramente
  console.log('Nome:', nome.value)
  console.log('Email:', email.value)
  console.log('Mensagem:', mensagem.value)

  enviado.value = true

  // Limpa os campos
  nome.value = ''
  email.value = ''
  mensagem.value = ''
}
</script>

<style scoped>
.contato-container {
  max-width: 500px;
  margin: 2rem auto;
  padding: 1rem;
  background-color: #fdf6f0;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #6b4c3b;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-top: 1rem;
  font-weight: bold;
}

input,
textarea {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
}

button {
  margin-top: 1.5rem;
  padding: 0.7rem;
  background-color: #6b4c3b;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #8c5e4a;
}

.sucesso {
  margin-top: 1rem;
  color: green;
  text-align: center;
}
</style>