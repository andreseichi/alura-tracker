<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <Cronometro :tempoEmSegundos="tempoEmSegundos" />

    <button class="button" @click="iniciar" :disabled="isCronometroRodando">
      <span class="icon">
        <i class="fas fa-play"></i>
      </span>
      <span>Play</span>
    </button>

    <button class="button" @click="finalizar" :disabled="!isCronometroRodando">
      <span class="icon">
        <i class="fas fa-stop"></i>
      </span>
      <span>Stop</span>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Cronometro from "./Cronometro.vue";

export default defineComponent({
  name: "TemporizadorComponent",
  components: {
    Cronometro,
  },
  data: () => {
    return {
      tempoEmSegundos: 0,
      cronometroId: 0,
      isCronometroRodando: false,
    };
  },
  emits: ["aoTemporizadorFinalizado"],
  methods: {
    iniciar() {
      this.isCronometroRodando = true;
      this.cronometroId = setInterval(() => {
        this.tempoEmSegundos += 1;
      }, 1000);
    },
    finalizar() {
      this.isCronometroRodando = false;
      clearInterval(this.cronometroId);
      this.$emit("aoTemporizadorFinalizado", this.tempoEmSegundos);
      this.tempoEmSegundos = 0;
    },
  },
});
</script>
