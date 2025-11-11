<template>
  <main id="produto-detalhe">
    <div v-if="erro" class="message-error">
      <h2>Erro ao Carregar Produto</h2>
      <p>{{ erro }}</p>
      <router-link to="/" class="btn-voltar error">← Voltar</router-link>
    </div>

    <div v-else-if="removido" class="message-success">
      <h2>Produto removido.</h2>
      <p>O registro foi excluído com sucesso.</p>
      <router-link to="/" class="btn-voltar">← Voltar para a lista</router-link>
    </div>

    <div v-else-if="produto" class="produto-detalhe-card">
      <img :src="produto.imagem" :alt="produto.nome" />
      <h2>{{ produto.nome }}</h2>
      <p><strong>Preço:</strong> R$ {{ formatarPreco(produto.preco) }}</p>
      <p><strong>Descrição:</strong> {{ produto.descricao }}</p>

      <div class="action-buttons">
        <router-link :to="`/editar/${produto.id}`" class="btn-editar">Editar</router-link>
        <button @click="excluirProduto" class="btn-excluir">Excluir Produto</button>
      </div>

      <router-link to="/" class="btn-voltar">← Voltar para a lista</router-link>
    </div>
  </main>
</template>

<script>
export default {
  name: 'DetalheProduto',
  data() {
    return {
      produto: null,
      erro: '',
      removido: false
    };
  },
  mounted() {
    const id = this.$route.params.id;
    fetch(`http://localhost:3000/produtos/${id}`)
      .then(res => {
        if (res.status === 404) throw new Error('Produto não encontrado');
        return res.json();
      })
      .then(data => {
        this.produto = data;
      })
      .catch(err => {
        this.erro = err.message;
      });
  },
  methods: {
    formatarPreco(valor) {
      return parseFloat(valor).toFixed(2).replace('.', ',');
    },
    excluirProduto() {
      if (!confirm(`Tem certeza que deseja excluir o produto com ID ${this.produto.id}?`)) return;

      fetch(`http://localhost:3000/produtos/${this.produto.id}`, {
        method: 'DELETE'
      })
        .then(res => {
          if (!res.ok) throw new Error('Erro ao tentar excluir o produto no servidor.');
          this.removido = true;
        })
        .catch(err => {
          this.erro = err.message;
        });
    }
  }
};
</script>