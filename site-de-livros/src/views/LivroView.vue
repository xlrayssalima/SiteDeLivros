<template>
  <div class="container mt-5">
    <button class="btn btn-secondary mb-3" @click="$router.back()">← Voltar</button>

    <div v-if="book" class="card shadow p-4">
      <h3 class="fw-bold mb-3">{{ book.title }}</h3>
      <p><strong>Autor:</strong> {{ book.author }}</p>
      <p><strong>Ano:</strong> {{ book.year }}</p>
    </div>

    <div v-else class="alert alert-warning">
      Livro não encontrado.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { mockBooks } from '../mocks/books.js' // Importa mock centralizado

const route = useRoute()
const book = ref(null)

onMounted(() => {
  const id = parseInt(route.params.id)
  book.value = mockBooks.find(b => b.id === id) || null
})
</script>
