<template>
  <Box>
    <div class="columns">
      <div class="column is-4">
        {{ tarefa.descricao || 'Tarefa sem descrição' }}
      </div>
      <div class="column is-3">
        {{ tarefa.projeto?.nome || 'N/D' }}
      </div>
      <div class="column">
        <Cronometro :tempoEmSegundos="tarefa.duracao" />
      </div>
    </div>
  </Box>
</template>

<script lang="ts">
import { ITarefa } from '@/interfaces/ITarefa';
import { defineComponent, PropType } from 'vue';
import Box from './Box.vue';
import Cronometro from './Cronometro.vue';

export default defineComponent({
  name: 'TarefaItem',
  components: {
    Cronometro,
    Box,
  },
  props: {
    tarefa: {
      type: Object as PropType<ITarefa>,
      required: true,
    },
  },
});
</script>
