<template>
  <div class="container mt-5">
    <h2 class="fw-bold mb-4">Cadastro de Livros - Bibliocat</h2>

    <!-- Formulário de cadastro -->
    <div class="card mb-4 p-4 shadow-sm">
      <form @submit.prevent="handleAddBook">
        <div class="mb-3">
          <label class="form-label">Título</label>
          <input v-model="title" type="text" class="form-control" placeholder="Digite o título do livro" required />
        </div>

        <div class="mb-3">
          <label class="form-label">Autor</label>
          <input v-model="author" type="text" class="form-control" placeholder="Digite o autor" required />
        </div>

        <div class="mb-3">
          <label class="form-label">Ano</label>
          <input v-model="year" type="number" class="form-control" placeholder="Ano de publicação" required />
        </div>

        <div class="d-grid">
          <button type="submit" class="btn btn-success">Adicionar Livro</button>
        </div>
      </form>
    </div>

    <!-- Lista de livros cadastrados -->
    <div v-if="books.length === 0" class="alert alert-info">
      Nenhum livro cadastrado ainda.
    </div>

    <div class="row">
      <div class="col-md-4 mb-3" v-for="book in books" :key="book.id">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">{{ book.title }}</h5>
            <p class="card-text"><strong>Autor:</strong> {{ book.author }}</p>
            <p class="card-text"><strong>Ano:</strong> {{ book.year }}</p>
            <button class="btn btn-danger btn-sm" @click="handleDeleteBook(book.id)">Excluir</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Campos do formulário
const title = ref('')
const author = ref('')
const year = ref('')

// Lista de livros (mock)
const books = ref([])

// Mock: Carrega livros do localStorage
onMounted(() => {
  const savedBooks = localStorage.getItem('bibliocat_books')
  if (savedBooks) {
    books.value = JSON.parse(savedBooks)
  }
})

// Função para adicionar livro
function handleAddBook() {
  const newBook = {
    id: Date.now(), // ID simples
    title: title.value,
    author: author.value,
    year: year.value,
  }

  books.value.push(newBook)
  localStorage.setItem('bibliocat_books', JSON.stringify(books.value))

  // Limpa campos
  title.value = ''
  author.value = ''
  year.value = ''

  alert('Livro adicionado com sucesso!')
}

// Função para excluir livro
function handleDeleteBook(id) {
  books.value = books.value.filter(book => book.id !== id)
  localStorage.setItem('bibliocat_books', JSON.stringify(books.value))
}
</script>
