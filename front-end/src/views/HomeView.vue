<template>
  <div class="container mt-5">

    <div v-if="erro" class="message-error text-danger text-center mb-4">
      {{ erro }}
    </div>

    <div v-else>
      <div class="row g-4">
        <!-- Cada card ocupa 1/3 da linha em telas médias pra cima -->
        <div
          v-for="produto in produtos"
          :key="produto.id"
          class="col-12 col-sm-6 col-md-4 d-flex justify-content-center"
        >
          <LivroCard :livro="produto" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LivroCard from '../components/LivroCard.vue'

export default {
  name: 'ListaProdutos',
  components: { LivroCard },
  data() {
    return {
      produtos: [],
      erro: ''
    }
  },
  mounted() {
    fetch('http://localhost:3000/livros')
      .then(res => res.json())
      .then(data => {
        this.produtos = data
      })
      .catch(() => {
        this.erro = 'Erro ao carregar os livros.'
      })
  }
}
</script>

<style scoped>
/* Apenas pra garantir um espaçamento visual */
.container {
  max-width: 1200px;
}

.row {
  justify-content: center;
}
</style>
