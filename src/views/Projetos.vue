<template>
  <section class="projetos">
    <h1 class="title">Projetos</h1>

    <router-link to="/projetos/novo" class="button">
      <span class="icon is-small">
        <i class="fas fa-plus"></i>
      </span>
      <span>Novo Projeto</span>
    </router-link>

    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="projeto in projetos" :key="projeto.id">
          <td>{{ projeto.id }}</td>
          <td>{{ projeto.nome }}</td>
          <td>
            <router-link :to="`/projetos/${projeto.id}`" class="button">
              <span class="icon is-small">
                <i class="fas fa-pencil-alt"></i>
              </span>
              <span>Editar</span></router-link
            >
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from '../store/index';

export default defineComponent({
  name: 'ProjetosView',
  setup() {
    const store = useStore();

    return {
      projetos: store.state.projetos,
    };
  },
});
</script>

<style scoped>
.projetos {
  padding: 1.25rem;
}
</style>
