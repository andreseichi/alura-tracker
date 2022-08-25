<template>
  <header>
    <h1>
      <img src="../assets/logo.png" alt="" />
    </h1>

    <button class="button" @click="alterarTema">{{ textoBotao }}</button>
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

@media only screen and (max-width: 768px) {
  header {
    padding: 2.5rem;
    height: auto;
  }
}
</style>
