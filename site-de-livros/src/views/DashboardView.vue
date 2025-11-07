<template>
  <div class="container mt-5">
    <h2 class="fw-bold mb-4">Dashboard - Bibliocat</h2>

    <div class="row">
      <div class="col-md-4 mb-3">
        <div class="card shadow p-4 text-center">
          <h5>Total de Livros</h5>
          <p class="display-6">{{ totalBooks }}</p>
        </div>
      </div>

      <div class="col-md-4 mb-3">
        <div class="card shadow p-4 text-center">
          <h5>Total de Usuários</h5>
          <p class="display-6">{{ totalUsers }}</p>
        </div>
      </div>

      <div class="col-md-4 mb-3">
        <div class="card shadow p-4 text-center">
          <h5>Livros Recentes</h5>
          <ul class="list-unstyled">
            <li v-for="book in recentBooks" :key="book.id">{{ book.title }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { mockBooks } from '../mocks/books.js'

// Mock de usuários
const mockUsers = [
  { id: 1, name: 'Jaaziel' },
  { id: 2, name: 'Maria' },
]

const books = ref([])
const users = ref([])

onMounted(() => {
  books.value = mockBooks
  users.value = mockUsers
})

const totalBooks = computed(() => books.value.length)
const totalUsers = computed(() => users.value.length)
const recentBooks = computed(() => books.value.slice(-5).reverse())
</script>
