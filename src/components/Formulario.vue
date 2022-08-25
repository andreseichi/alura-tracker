<template>
  <div class="box">
    <div class="columns">
      <div
        class="column is-8"
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
      <div class="column">
        <Temporizador @aoTemporizadorFinalizado="finalizarTarefa" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Temporizador from "./Temporizador.vue";

export default defineComponent({
  name: "FormularioComponent",
  components: { Temporizador },
  data: () => {
    return {
      descricao: "",
    };
  },
  emits: ["aoSalvarTarefa"],
  methods: {
    finalizarTarefa(tempoDecorrido: number): void {
      const tarefa = {
        duracao: tempoDecorrido,
        descricao: this.descricao,
      };
      this.$emit("aoSalvarTarefa", tarefa);
      this.descricao = "";
    },
  },
});
</script>
