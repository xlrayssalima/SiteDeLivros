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
