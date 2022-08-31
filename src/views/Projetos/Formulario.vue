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
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'FormularioProjeto',
  props: {
    id: {
      type: String,
    },
  },
  setup(props) {
    const store = useStore();
    const { notificar } = useNotificador();
    const router = useRouter();

    const nomeDoProjeto = ref('');

    if (props.id) {
      const projeto = store.state.projetos.find(
        (projeto) => projeto.id === props.id
      );
      nomeDoProjeto.value = projeto?.nome || '';
    }

    const salvarProjeto = () => {
      if (props.id) {
        const projeto = {
          id: props.id,
          nome: nomeDoProjeto.value,
        };
        store.dispatch(ALTERAR_PROJETO, projeto).then(() => {
          nomeDoProjeto.value = '';
          notificar(
            TipoNotificacao.SUCESSO,
            'Editado',
            'Projeto foi editado com sucesso'
          );
          router.push('/projetos');
        });
      } else {
        store
          .dispatch(CADASTRAR_PROJETO, nomeDoProjeto.value)
          .then(() => lidarComSucesso());
      }
    };

    const lidarComSucesso = () => {
      nomeDoProjeto.value = '';
      notificar(
        TipoNotificacao.SUCESSO,
        'Excelente',
        'O projeto foi criado com sucesso'
      );

      router.push('/projetos');
    };

    return {
      nomeDoProjeto,
      salvarProjeto,
    };
  },
});
</script>
