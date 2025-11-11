<template>
  <section class="card-container">
    <div v-if="erro" class="message-error">{{ erro }}</div>
    <div v-else>
      <div v-for="produto in produtos" :key="produto.id" class="card">
        <img :src="produto.imagem" :alt="produto.nome" />
        <h2>{{ produto.nome }}</h2>
        <p>R$ {{ formatarPreco(produto.preco) }}</p>
        <router-link :to="`/detalhe/${produto.id}`">Ver detalhes</router-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ListaProdutos',
  data() {
    return {
      produtos: [],
      erro: ''
    };
  },
  mounted() {
    fetch('http://localhost:3000/produtos')
      .then(res => res.json())
      .then(data => {
        this.produtos = data;
      })
      .catch(err => {
        this.erro = 'Erro ao carregar produtos.';
      });
  },
  methods: {
    formatarPreco(valor) {
      return parseFloat(valor).toFixed(2).replace('.', ',');
    }
  }
};
</script>