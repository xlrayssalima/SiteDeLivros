<<<<<<< HEAD
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
=======
<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
        <a class="navbar-brand" href="/">Bibliocat</a>
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item"><router-link class="nav-link" to="/">Home</router-link></li>
            <li class="nav-item"><router-link class="nav-link" to="/cadastroLivro">Cadastro Novo Livros</router-link></li>
            <li class="nav-item"><router-link class="nav-link" to="/cadastroUsuario">Cadastro Novo Usuário</router-link></li>
            <li class="nav-item"><router-link class="nav-link" to="/login">Login</router-link></li>
          </ul>
        </div>
      </div>
    </nav>

    <router-view />
  </div>
</template>


<script setup>
// Nenhuma lógica extra necessária aqui para o router funcionar
</script>

<style>
/* Se quiser um estilo global, pode colocar aqui */
</style>
>>>>>>> f7cd4a716f8ddfef5e1db62eb7f66dab274c8287
