<template>
  <div>
    <AdminMenu />
    <div class="container mt-5">
      <h2 class="fw-bold mb-4">Gerenciar Livros</h2>

      <!-- Formulário de cadastro/edição -->
      <form @submit.prevent="handleSubmit" class="mb-4">
        <div class="mb-3">
          <input v-model="form.title" type="text" class="form-control" placeholder="Título" required>
        </div>
        <div class="mb-3">
          <input v-model="form.author" type="text" class="form-control" placeholder="Autor" required>
        </div>
        <div class="mb-3">
          <input v-model="form.year" type="number" class="form-control" placeholder="Ano" required>
        </div>
        <button type="submit" class="btn btn-success">{{ editing ? 'Atualizar' : 'Adicionar' }}</button>
        <button type="button" class="btn btn-secondary ms-2" v-if="editing" @click="cancelEdit">Cancelar</button>
      </form>

      <!-- Lista de livros -->
      <div class="row">
        <div class="col-md-4 mb-3" v-for="book in books" :key="book.id">
          <div class="card h-100 shadow-sm">
            <div class="card-body">
              <h5 class="card-title">{{ book.title }}</h5>
              <p class="card-text"><strong>Autor:</strong> {{ book.author }}</p>
              <p class="card-text"><strong>Ano:</strong> {{ book.year }}</p>
              <button class="btn btn-warning btn-sm me-2" @click="editBook(book)">Editar</button>
              <button class="btn btn-danger btn-sm" @click="deleteBook(book.id)">Excluir</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import AdminMenu from '../components/AdminMenu.vue'
import { mockBooks } from '../mocks/books.js'

const books = ref([...mockBooks])

const form = reactive({ id: null, title: '', author: '', year: '' })
const editing = ref(false)

function handleSubmit() {
  if (editing.value) {
    const index = books.value.findIndex(b => b.id === form.id)
    if (index !== -1) books.value[index] = { ...form }
  } else {
    const newBook = { ...form, id: Date.now() }
    books.value.push(newBook)
  }
  cancelEdit()
}

function editBook(book) {
  form.id = book.id
  form.title = book.title
  form.author = book.author
  form.year = book.year
  editing.value = true
}

function cancelEdit() {
  form.id = null
  form.title = ''
  form.author = ''
  form.year = ''
  editing.value = false
}

function deleteBook(id) {
  books.value = books.value.filter(b => b.id !== id)
}
</script>
