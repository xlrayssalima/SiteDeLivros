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
    </div>

    <div v-else-if="produto" class="produto-detalhe-wrapper">
      <div class="produto-detalhe-card shadow-sm">
        <div class="produto-img-wrapper">
          <img :src="produto.capa" :alt="produto.titulo" class="produto-img" />
        </div>

        <div class="produto-info">
          <h2>{{ produto.titulo }}</h2>
          
          <div class="meta-info">
            <p class="autor-info"><strong>Autor:</strong> {{ produto.autor }}</p>
            <p class="preco-destaque">
              <span>R$ {{ formatarPreco(produto.preco) }}</span>
            </p>
          </div>

          <p class="descricao"><strong>Descrição:</strong> {{ produto.descricao }}</p>
          
          <p v-if="produto.detalhes" class="detalhes"><strong>Detalhes:</strong> {{ produto.detalhes }}</p>

          <div class="action-buttons" v-if="usuario && usuario.role === 'admin'">
            <router-link :to="`/editar/${produto.id}`" class="btn-editar">Editar</router-link>
            <button @click="excluirProduto" class="btn-excluir">Excluir Produto</button>
          </div>
        </div>
      </div>
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
      removido: false,
      usuario: null, // usuário logado
    };
  },
  async mounted() {
    this.usuario = JSON.parse(localStorage.getItem('usuario')) || null;

    const id = this.$route.params.id;

    try {
      const res = await fetch(`http://localhost:3000/livros/${id}`);
      if (!res.ok) throw new Error(`Erro ${res.status}: Produto não encontrado`);
      this.produto = await res.json();
    } catch (err) {
      this.erro = err.message;
    }
  },
  methods: {
    formatarPreco(valor) {
      return parseFloat(valor).toFixed(2).replace('.', ',');
    },
    async excluirProduto() {
      if (!confirm(`Tem certeza que deseja excluir o produto com ID ${this.produto.id}?`)) return;

      try {
        const res = await fetch(`http://localhost:3000/livros/admin/${this.produto.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!res.ok) throw new Error('Erro ao tentar excluir o produto no servidor.');
        this.removido = true;
      } catch (err) {
        this.erro = err.message;
      }
    }
  }
};
</script>

<style scoped>
/* =======================================
   1. LAYOUT GERAL E CENTRALIZAÇÃO 
   ======================================= */
.produto-detalhe-wrapper {
  padding: 2rem 1rem;
  width: 100%; 
}

.produto-detalhe-card {
  /* Garante as duas colunas: Imagem | Texto */
  display: flex; 
  gap: 1.5rem;
  padding: 1.5rem;
  border-radius: 8px;
  
  /* Centralização e Largura */
  margin: 0 auto; 
  min-width: 900px; /* Largura mínima "gorda" */
  width: 90%; 
  max-width: 1400px;
  
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* =======================================
   2. IMAGEM (Tamanho Fixo 250x350px)
   ======================================= */
.produto-img-wrapper {
  /* Dimensões FIXAS */
  width: 250px; 
  height: 350px; 
  flex-shrink: 0; 
  overflow: hidden;
  border-radius: 4px;
}

.produto-img {
  width: 100%; 
  height: 100%; 
  object-fit: cover; /* Preenche a área fixa */
  display: block; 
}

/* =======================================
   3. CONTEÚDO À DIREITA (Texto)
   ======================================= */
.produto-info {
  flex: 1; /* Ocupa o espaço restante */
  display: flex; 
  flex-direction: column; /* Organiza o texto verticalmente */
}

/* Título: Centralizado */
.produto-info h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  line-height: 1.2;
}

/* Linha Autor/Preço (meta-info): Lados Opostos */
.meta-info {
  display: flex;
  justify-content: space-between; /* Empurra Autor e Preço para os lados */
  align-items: center;
  margin-bottom: 1.5rem; 
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee; 
}

/* Autor: Texto normal */
.autor-info {
    margin: 0;
    font-size: 1rem;
    color: #333; 
}

/* Preço: Destaque dentro da caixinha */
.preco-destaque {
    margin: 0;
}

.preco-destaque span {
    background-color: #d4edda; /* Fundo verde claro */
    color: #155724; /* Texto verde escuro */
    font-weight: bold;
    font-size: 1.1rem;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    border: 1px solid #c3e6cb;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

/* Descrição e Detalhes: Alinhamento à esquerda, cor preta/sem negrito */
.produto-info p {
  margin-bottom: 0.75rem; 
  text-align: left; 
  color: #333; 
  font-weight: normal; 
}

.descricao, .detalhes {
    line-height: 1.5;
    text-align: justify; /* Justifica o texto longo */
    margin-top: 1rem;
}

/* =======================================
   4. BOTÕES (Empurrados para o final)
   ======================================= */
.action-buttons {
  margin-top: auto; /* Empurra o bloco para o fundo do .produto-info */
  padding-top: 1rem; 
  border-top: 1px solid #eee;
  display: flex;
  gap: 0.5rem;
}

.btn-editar,
.btn-excluir,
.btn-voltar {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  cursor: pointer;
  border: none;
  font-weight: bold;
}

.btn-editar {
  background-color: #007bff;
  color: #fff;
}

.btn-excluir {
  background-color: #dc3545;
  color: #fff;
}

.btn-voltar {
  background-color: #6c757d;
  color: #fff;
  margin-top: 1rem;
  display: inline-block;
}
</style>