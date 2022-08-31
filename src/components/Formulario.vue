<template>
  <div class="box formulario">
    <div class="columns">
      <div
        class="column is-5"
        role="form"
        aria-label="Formulário de criação de nova tarefa"
      >
        <input
          type="text"
          class="input"
          name="input tarefa"
          id=""
          placeholder="Qual tarefa quer iniciar?"
          v-model="descricao"
        />
      </div>
      <div class="column is-3">
        <div class="select">
          <select v-model="idProjeto">
            <option value="">Selecione o projeto</option>
            <option
              :value="projeto.id"
              v-for="projeto in projetos"
              :key="projeto.id"
            >
              {{ projeto.nome }}
            </option>
          </select>
        </div>
      </div>
      <div class="column">
        <Temporizador @aoTemporizadorFinalizado="finalizarTarefa" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { key } from '@/store';
import { computed, defineComponent, ref } from 'vue';
import { useStore } from 'vuex';

import Temporizador from './Temporizador.vue';

export default defineComponent({
  name: 'FormularioComponent',
  components: { Temporizador },
  setup(props, { emit }) {
    const store = useStore(key);

    const descricao = ref('');
    const idProjeto = ref('');

    const projetos = computed(() => store.state.projetos);

    const finalizarTarefa = (tempoDecorrido: number): void => {
      const tarefa = {
        duracao: tempoDecorrido,
        descricao: descricao.value,
        projeto: projetos.value.find((proj) => proj.id === idProjeto.value),
      };

      emit('aoSalvarTarefa', tarefa);
      descricao.value = '';
    };

    return {
      descricao,
      idProjeto,
      finalizarTarefa,
      projetos,
    };
  },
});
</script>

<style>
.formulario {
  background-color: var(--bg-primary);
  color: var(--text-primary);
}
</style>
