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
import { TipoNotificacao } from '@/interfaces/INotificacao';
import { defineComponent, ref } from 'vue';
import { useStore } from '../../store/index';
import { useNotificador } from '@/hooks/notificador';
import { CADASTRAR_PROJETO, ALTERAR_PROJETO } from '@/store/tipo-acoes';

export default defineComponent({
  name: 'FormularioProjeto',
  methods: {
    salvarProjeto() {
      if (this.id) {
        const projeto = {
          id: this.id,
          nome: this.nomeDoProjeto,
        };
        this.store.dispatch(ALTERAR_PROJETO, projeto).then(() => {
          this.nomeDoProjeto = '';
          this.notificar(
            TipoNotificacao.SUCESSO,
            'Editado',
            'Projeto foi editado com sucesso'
          );
          this.$router.push('/projetos');
        });
      } else {
        this.store
          .dispatch(CADASTRAR_PROJETO, this.nomeDoProjeto)
          .then(() => this.lidarComSucesso());
      }
    },
    lidarComSucesso() {
      this.nomeDoProjeto = '';
      this.notificar(
        TipoNotificacao.SUCESSO,
        'Excelente',
        'O projeto foi criado com sucesso'
      );

      this.$router.push('/projetos');
    },
  },
  props: {
    id: {
      type: String,
    },
  },
  setup(props) {
    const store = useStore();
    const { notificar } = useNotificador();

    const nomeDoProjeto = ref('');

    if (props.id) {
      const projeto = store.state.projetos.find(
        (projeto) => projeto.id === props.id
      );
      nomeDoProjeto.value = projeto?.nome || '';
    }

    return {
      store,
      notificar,
      nomeDoProjeto,
    };
  },
});
</script>
