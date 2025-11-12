<template>
  <div
    class="card livro-card shadow-sm d-flex flex-row align-items-stretch"
    @click="irParaDetalhes"
  >
    <!-- Imagem à esquerda -->
    <div class="livro-card-img-wrapper">
      <img
        :src="livro.capa"
        :alt="livro.titulo"
        class="livro-card-img"
      />
    </div>

    <!-- Conteúdo à direita -->
    <div class="card-body d-flex flex-column justify-content-between">
      <div>
        <h5 class="card-title fw-bold">{{ livro.titulo }}</h5>
        <p class="text-muted mb-2">{{ livro.autor }}</p>
      </div>

      <div>
        <p class="fw-bold text-success mb-2">
          R$ {{ formatarPreco(livro.preco) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LivroCard',
  props: {
    livro: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatarPreco(valor) {
      return parseFloat(valor).toFixed(2).replace('.', ',')
    },
    irParaDetalhes() {
      // Certifique-se de que o router está acessível via this.$router
      this.$router.push(`/livro/${this.livro.id}`)
    }
  }
}
</script>

<style scoped>
.livro-card {
  width: 100%;
  height: 180px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.livro-card:hover {
  transform: scale(1.02);
}

.livro-card-img-wrapper {
  width: 40%;
  height: 100%;
  overflow: hidden;
}

.livro-card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-body {
  flex: 1;
  padding: 1rem;
}
</style>
