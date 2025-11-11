<template>
  <div>
    <header>
      <h1>Cadastro de Produto</h1>
      <nav>
        <ul>
          <li><a href="/">Início</a></li>
          <li><a href="#">Produtos</a></li>
          <li><a href="#">Contatos</a></li>
          <li><a href="/cadastro">Cadastro</a></li>
        </ul>
      </nav>
    </header>

    <main>
      <form @submit.prevent="cadastrarProduto" class="form-container">
        <label for="nome">Nome:</label>
        <input type="text" id="nome" v-model="produto.nome" required />

        <label for="preco">Preço:</label>
        <input type="number" id="preco" v-model.number="produto.preco" step="0.01" required />

        <label for="descricao">Descrição:</label>
        <textarea id="descricao" v-model="produto.descricao" required></textarea>

        <label for="imagem">URL da Imagem:</label>
        <input type="text" id="imagem" v-model="produto.imagem" required />

        <button type="submit">Cadastrar</button>
      </form>

      <div id="mensagem" v-if="mensagem" :style="{ color: mensagemCor }" v-html="mensagem"></div>

      <nav class="nav-voltar">
        <a href="/" class="btn-voltar">← Voltar para o Início</a>
      </nav>
    </main>
  </div>
</template>

<script>
export default {
  name: 'CadastroProduto',
  data() {
    return {
      produto: {
        nome: '',
        preco: null,
        descricao: '',
        imagem: ''
      },
      mensagem: '',
      mensagemCor: 'black'
    };
  },
  methods: {
    cadastrarProduto() {
      const { nome, preco, descricao, imagem } = this.produto;

      // Validação
      if (!nome || !descricao || isNaN(preco) || preco <= 0 || !imagem) {
        this.mensagem = 'Preencha todos os campos corretamente (Preço deve ser maior que zero).';
        this.mensagemCor = 'red';
        return;
      }

      this.mensagem = '';

      fetch('http://localhost:3000/produtos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.produto)
      })
        .then(res => {
          if (!res.ok) {
            throw new Error('Erro ao cadastrar produto. Verifique se o servidor Node.js está rodando.');
          }
          return res.json();
        })
        .then(data => {
          this.mensagem = `<p>Produto <strong>${data.nome}</strong> cadastrado com sucesso!</p>`;
          this.mensagemCor = 'green';
          this.produto = { nome: '', preco: null, descricao: '', imagem: '' };

          setTimeout(() => {
            this.mensagem = '';
          }, 18000);
        })
        .catch(error => {
          this.mensagem = `<p>${error.message}</p>`;
          this.mensagemCor = 'red';
        });
    }
  }
};
</script>

<style scoped>
@import "./style.css";
/* Ou copie o conteúdo de style.css para cá */
</style>