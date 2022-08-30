import { createStore, Store, useStore as VueStore } from 'vuex';

import { IProjeto } from '@/interfaces/IProjeto';
import { InjectionKey } from 'vue';
import {
  ADICIONA_PROJETO,
  ALTERA_PROJETO,
  DEFINIR_PROJETOS,
  EXCLUIR_PROJETO,
  NOTIFICAR,
} from './tipo-mutacoes';
import { INotificacao } from '@/interfaces/INotificacao';
import { OBTER_PROJETOS } from './tipo-acoes';
import { api } from '@/http';

interface Estado {
  projetos: IProjeto[];
  notificacoes: INotificacao[];
}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
  actions: {
    [OBTER_PROJETOS]({ commit }) {
      api.get('projetos').then(({ data }) => commit(DEFINIR_PROJETOS, data));
    },
  },
  state: {
    projetos: [],
    notificacoes: [],
  },
  mutations: {
    [ADICIONA_PROJETO](state, nomeDoProjeto: string) {
      const projeto = {
        id: new Date().toISOString(),
        nome: nomeDoProjeto,
      } as IProjeto;

      state.projetos.push(projeto);
    },
    [ALTERA_PROJETO](state, projeto: IProjeto) {
      const index = state.projetos.findIndex((proj) => proj.id === projeto.id);
      state.projetos[index] = projeto;
    },
    [EXCLUIR_PROJETO](state, id: string) {
      state.projetos = state.projetos.filter((proj) => proj.id !== id);
    },
    [NOTIFICAR](state, novaNotificacao: INotificacao) {
      novaNotificacao.id = new Date().getTime();
      state.notificacoes.push(novaNotificacao);

      setTimeout(() => {
        state.notificacoes = state.notificacoes.filter(
          (notificacao) => notificacao.id !== novaNotificacao.id
        );
      }, 2500);
    },
    [DEFINIR_PROJETOS](state, projetos: IProjeto[]) {
      state.projetos = projetos;
    },
  },
});

export function useStore(): Store<Estado> {
  return VueStore(key);
}
