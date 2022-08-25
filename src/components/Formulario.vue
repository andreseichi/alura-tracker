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
        <Temporizador />
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
});
</script>
