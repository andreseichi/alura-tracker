<template>
  <main
    class="columns is-gapless is-multiline"
    :class="{ 'modo-escuro': modoEscuroAtivo }"
  >
    <div class="column is-one-quarter">
      <BarraLateral @aoTemaAlterado="toggleTema" />
    </div>

    <div class="column is-three-quarter conteudo">
      <Formulario @aoSalvarTarefa="salvarTarefa" />
      <div class="lista">
        <Tarefa
          v-for="(tarefa, index) in tarefas"
          :key="index"
          :tarefa="tarefa"
        />

        <Box v-if="isListaTarefaVazia"> Nenhuma tarefa realizada hoje :( </Box>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BarraLateral from "./components/BarraLateral.vue";
import Formulario from "./components/Formulario.vue";
import Tarefa from "./components/Tarefa.vue";
import Box from "./components/Box.vue";

import { ITarefa } from "./interfaces/ITarefa";

export default defineComponent({
  name: "App",
  components: { BarraLateral, Formulario, Tarefa, Box },
  computed: {
    isListaTarefaVazia(): boolean {
      return this.tarefas.length === 0;
    },
  },
  data: () => {
    return {
      modoEscuroAtivo: false,
      tarefas: [] as Array<ITarefa>,
    };
  },
  methods: {
    salvarTarefa(tarefa: ITarefa) {
      this.tarefas.push(tarefa);
      console.log(tarefa);
    },
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
