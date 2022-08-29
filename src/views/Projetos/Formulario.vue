<template>
  <section>
    <form @submit.prevent="salvarProjeto">
      <div class="field">
        <label for="nomeDoProjeto" class="label">Nome do Projeto</label>
        <input
          type="text"
          class="input"
          v-model="nomeDoProjeto"
          id="nomeDoProjeto"
        />
      </div>
      <div class="field">
        <button class="button" type="submit">Salvar</button>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import { ADICIONA_PROJETO, ALTERA_PROJETO } from "@/store/tipo-mutacoes";
import { defineComponent } from "vue";
import { useStore } from "../../store/index";

export default defineComponent({
  name: "FormularioProjeto",
  data: () => {
    return {
      nomeDoProjeto: "",
    };
  },
  methods: {
    salvarProjeto() {
      if (this.id) {
        const projeto = {
          id: this.id,
          nome: this.nomeDoProjeto,
        };
        this.store.commit(ALTERA_PROJETO, projeto);
      } else {
        this.store.commit(ADICIONA_PROJETO, this.nomeDoProjeto);
      }

      this.nomeDoProjeto = "";
      this.$router.push("/projetos");
    },
  },
  mounted() {
    if (this.id) {
      const projeto = this.store.state.projetos.find(
        (projeto) => projeto.id === this.id
      );
      this.nomeDoProjeto = projeto?.nome || "";
    }
  },
  props: {
    id: {
      type: String,
    },
  },
  setup() {
    const store = useStore();

    return {
      store,
    };
  },
});
</script>
