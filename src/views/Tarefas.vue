<template>
  <Formulario @aoSalvarTarefa="salvarTarefa" />
  <div class="lista">
    <Box v-if="isListaTarefaVazia"> Nenhuma tarefa realizada hoje :( </Box>

    <Tarefa
      v-for="(tarefa, index) in tarefas"
      :key="index"
      :tarefa="tarefa"
      @aoTarefaClicada="selecionarTarefa"
    />

    <div
      class="modal"
      :class="{ 'is-active': tarefaSelecionada }"
      v-if="tarefaSelecionada"
    >
      <div class="modal-background" @click="fecharModal"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Editar Tarefa</p>
          <button
            class="delete"
            aria-label="close"
            @click="fecharModal"
          ></button>
        </header>
        <section class="modal-card-body">
          <label for="descricaoDaTarefa" class="label"
            >Descrição da tarefa</label
          >

          <input
            type="text"
            class="input"
            v-model="tarefaSelecionada.descricao"
            id="descricaoDaTarefa"
          />
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="editarTarefa">
            Salvar Alterações
          </button>
          <button @click="fecharModal" class="button">Cancelar</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import Formulario from '../components/Formulario.vue';
import Tarefa from '../components/Tarefa.vue';
import Box from '../components/Box.vue';

import { ITarefa } from '../interfaces/ITarefa';
import { useStore } from '@/store';
import {
  CADASTRAR_TAREFA,
  OBTER_PROJETOS,
  OBTER_TAREFAS,
  ALTERAR_TAREFA,
} from '@/store/tipo-acoes';

export default defineComponent({
  name: 'TarefasView',
  components: { Formulario, Tarefa, Box },
  computed: {
    isListaTarefaVazia(): boolean {
      return this.tarefas.length === 0;
    },
  },
  data: () => {
    return {
      tarefaSelecionada: null as ITarefa | null,
    };
  },
  methods: {
    salvarTarefa(tarefa: ITarefa) {
      this.store.dispatch(CADASTRAR_TAREFA, tarefa);
    },
    selecionarTarefa(tarefa: ITarefa) {
      this.tarefaSelecionada = tarefa;
    },
    fecharModal() {
      this.tarefaSelecionada = null;
    },
    editarTarefa() {
      this.store.dispatch(ALTERAR_TAREFA, this.tarefaSelecionada).then(() => {
        this.fecharModal();
      });
    },
  },
  setup() {
    const store = useStore();
    store.dispatch(OBTER_TAREFAS);
    store.dispatch(OBTER_PROJETOS);

    return {
      store,
      tarefas: computed(() => store.state.tarefas),
    };
  },
});
</script>
