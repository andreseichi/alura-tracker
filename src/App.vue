<template>
  <main
    class="columns is-gapless is-multiline"
    :class="{ 'modo-escuro': modoEscuroAtivo }"
  >
    <div class="column is-one-quarter">
      <BarraLateral @aoTemaAlterado="toggleTema" />
    </div>

    <div class="column is-three-quarter conteudo">
      <router-view />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BarraLateral from "./components/BarraLateral.vue";

export default defineComponent({
  name: "App",
  components: { BarraLateral },
  data: () => {
    return {
      modoEscuroAtivo: false,
    };
  },
  methods: {
    toggleTema(isDarkMode: boolean) {
      this.modoEscuroAtivo = isDarkMode;
    },
  },
});
</script>

<style>
.lista {
  padding: 1.5rem;
}

main {
  --bg-primary: #fff;
  --text-primary: #000;
}

main.modo-escuro {
  --bg-primary: #2b2d42;
  --text-primary: #ddd;
}

.conteudo {
  background-color: var(--bg-primary);
}
</style>
