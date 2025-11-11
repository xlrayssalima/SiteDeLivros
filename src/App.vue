<script setup>
import { RouterLink} from 'vue-router';
</script>

<template>
  <div>
    <header>
      <div class="topo">
        <h1>Livraria<br>Capítulo Secreto</h1>
        <img src="/img/banner.png" alt="Livro" class="gatinho-banner" />
      </div>
      <nav>
        <ul>
         <router-link to="/">Início</router-link>
         <router-link to="/produtos">Produtos</router-link>
         <router-link to="/contatos">Contatos</router-link>
         <router-link to="/cadastro">Cadastro</router-link>

        </ul>
      </nav>
    </header>

    <main>
      <section class="card-container">
        <p>Bem-vinda a livraria!</p>
        <!-- Aqui você pode renderizar os produtos futuramente -->
      </section>
    </main>

    <footer>
      <p>&copy; 2025 Girls in code</p>
      <img src="/img/folha.jpg" class="footer-img" />
    </footer>
  </div>
</template>

<style scoped>
@import "./style.css";
</style>