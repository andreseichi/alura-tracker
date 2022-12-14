<template>
  <Formulario @aoSalvarTarefa="salvarTarefa" />
  <div class="lista">
    <Box v-if="isListaTarefaVazia"> Nenhuma tarefa realizada hoje :( </Box>
    <div class="field">
      <p class="control has-icons-left has-icons-right">
        <input
          class="input"
          type="text"
          placeholder="Filtrar as tarefas"
          v-model="filtro"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span>
      </p>
    </div>
    <Tarefa
      v-for="(tarefa, index) in tarefas"
      :key="index"
      :tarefa="tarefa"
      @aoTarefaClicada="selecionarTarefa"
    />

    <Modal
      :isShown="tarefaSelecionada != null"
      v-if="tarefaSelecionada"
      @fecharModal="fecharModal"
    >
      <template v-slot:header>
        <p class="modal-card-title">Editar Tarefa</p>
        <button class="delete" aria-label="close" @click="fecharModal"></button>
      </template>
      <template v-slot:default>
        <label for="descricaoDaTarefa" class="label">Descrição da tarefa</label>

        <input
          type="text"
          class="input"
          v-model="tarefaSelecionada.descricao"
          id="descricaoDaTarefa"
        />
      </template>
      <template v-slot:footer>
        <button class="button is-success" @click="editarTarefa">
          Salvar Alterações
        </button>
        <button @click="fecharModal" class="button">Cancelar</button>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from "vue";
import Formulario from "../components/Formulario.vue";
import Tarefa from "../components/Tarefa.vue";
import Box from "../components/Box.vue";

import { ITarefa } from "../interfaces/ITarefa";
import { useStore } from "@/store";
import {
  CADASTRAR_TAREFA,
  OBTER_PROJETOS,
  OBTER_TAREFAS,
  ALTERAR_TAREFA,
} from "@/store/tipo-acoes";
import Modal from "@/components/Modal.vue";

export default defineComponent({
  name: "TarefasView",
  components: { Formulario, Tarefa, Box, Modal },
  computed: {
    isListaTarefaVazia(): boolean {
      return this.tarefas.length === 0;
    },
  },
  setup() {
    const store = useStore();
    store.dispatch(OBTER_TAREFAS);
    store.dispatch(OBTER_PROJETOS);

    const tarefaSelecionada = ref<ITarefa | null>(null);

    const filtro = ref("");

    const salvarTarefa = (tarefa: ITarefa) => {
      store.dispatch(CADASTRAR_TAREFA, tarefa);
    };

    const selecionarTarefa = (tarefa: ITarefa) => {
      tarefaSelecionada.value = tarefa;
    };

    const fecharModal = () => {
      tarefaSelecionada.value = null;
    };

    const editarTarefa = () => {
      store.dispatch(ALTERAR_TAREFA, tarefaSelecionada.value).then(() => {
        fecharModal();
      });
    };

    watchEffect(() => {
      store.dispatch(OBTER_TAREFAS, filtro.value);
    });

    return {
      store,
      tarefas: computed(() => store.state.tarefas),
      tarefaSelecionada,
      salvarTarefa,
      selecionarTarefa,
      fecharModal,
      editarTarefa,
      filtro,
    };
  },
});
</script>
