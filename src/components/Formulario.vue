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
        />
      </div>
      <div class="column">
        <div
          class="is-flex is-align-items-center is-justify-content-space-between"
        >
          <Cronometro :tempoEmSegundos="tempoEmSegundos" />

          <button class="button" @click="iniciar">
            <span class="icon">
              <i class="fas fa-play"></i>
            </span>
            <span>Play</span>
          </button>

          <button class="button" @click="finalizar">
            <span class="icon">
              <i class="fas fa-stop"></i>
            </span>
            <span>Stop</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Cronometro from "./Cronometro.vue";

export default defineComponent({
  name: "FormularioComponent",
  components: { Cronometro },
  data: () => {
    return {
      tempoEmSegundos: 0,
      cronometroId: 0,
    };
  },
  methods: {
    iniciar() {
      this.cronometroId = setInterval(() => {
        this.tempoEmSegundos += 1;
      }, 1000);
    },
    finalizar() {
      clearInterval(this.cronometroId);
    },
  },
});
</script>
