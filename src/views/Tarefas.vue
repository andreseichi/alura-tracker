<template>
  <Formulario @aoSalvarTarefa="salvarTarefa" />
  <div class="lista">
    <Box v-if="isListaTarefaVazia"> Nenhuma tarefa realizada hoje :( </Box>

    <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import Formulario from '../components/Formulario.vue';
import Tarefa from '../components/Tarefa.vue';
import Box from '../components/Box.vue';

import { ITarefa } from '../interfaces/ITarefa';
import { useStore } from '@/store';
import { OBTER_TAREFAS } from '@/store/tipo-acoes';

export default defineComponent({
  name: 'TarefasView',
  components: { Formulario, Tarefa, Box },
  computed: {
    isListaTarefaVazia(): boolean {
      return this.tarefas.length === 0;
    },
  },
  methods: {
    salvarTarefa(tarefa: ITarefa) {
      console.log(tarefa);
      this.tarefas.push(tarefa);
    },
  },
  setup() {
    const store = useStore();
    store.dispatch(OBTER_TAREFAS);

    return {
      store,
      tarefas: computed(() => store.state.tarefas),
    };
  },
});
</script>
