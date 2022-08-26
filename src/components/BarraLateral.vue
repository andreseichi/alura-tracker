<template>
  <header>
    <h1>
      <img src="../assets/logo.png" alt="" />
    </h1>
    <div class="has-text-centered">
      <button class="button" @click="alterarTema">{{ textoBotao }}</button>
    </div>
    <nav class="panel mt-5">
      <ul>
        <li>
          <router-link to="/" class="link">
            <i class="fas fa-tasks"></i>
            Tarefas
          </router-link>
        </li>
        <li>
          <router-link to="/projetos" class="link">
            <i class="fas fa-project-diagram"></i>
            Projetos
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  computed: {
    textoBotao() {
      if (this.modoEscuroAtivo) {
        return "Modo Light";
      }
      return "Modo Escuro";
    },
  },
  data: () => {
    return {
      modoEscuroAtivo: false,
    };
  },
  name: "BarraLateral",
  emits: ["aoTemaAlterado"],
  methods: {
    alterarTema() {
      this.modoEscuroAtivo = !this.modoEscuroAtivo;
      this.$emit("aoTemaAlterado", this.modoEscuroAtivo);
    },
  },
});
</script>

<style scoped>
header {
  padding: 1rem;
  background-color: #0d3b66;
  width: 100%;
  height: 100vh;
  text-align: center;
}

.panel li {
  margin: 8px 0;
}

.link {
  color: #fff;
}

.link:hover {
  color: #faf0ca;
}

.link.router-link-active {
  color: #faf0ca;
}

@media only screen and (max-width: 768px) {
  header {
    padding: 2.5rem;
    height: auto;
  }
}
</style>
