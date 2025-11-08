<template>
  <div class="container mt-5">
    <h2 class="fw-bold mb-4">Biblioteca - Bibliocat</h2>

    <div class="row">
      <div class="col-md-4 mb-3" v-for="book in books" :key="book.id">
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <h5 class="card-title">{{ book.title }}</h5>
            <p class="card-text"><strong>Autor:</strong> {{ book.author }}</p>
            <p class="card-text"><strong>Ano:</strong> {{ book.year }}</p>
            <button class="btn btn-primary btn-sm" @click="$router.push(`/livro/${book.id}`)">
              Ver Detalhes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { mockBooks } from '../mocks/books.js'

const books = ref([])

onMounted(() => {
  // Inicializa com os dados mockados
  books.value = mockBooks
})
</script>
