import { createStore, Store, useStore as VueStore } from 'vuex';

import { IProjeto } from '@/interfaces/IProjeto';
import { InjectionKey } from 'vue';

interface Estado {
  projetos: IProjeto[];
}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
  state: {
    projetos: [],
  },
  mutations: {
    ADICIONA_PROJETO(state, nomeDoProjeto: string) {
      const projeto = {
        id: new Date().toISOString(),
        nome: nomeDoProjeto,
      } as IProjeto;

      state.projetos.push(projeto);
    },
    ALTERA_PROJETO(state, projeto: IProjeto) {
      const index = state.projetos.findIndex((proj) => proj.id === projeto.id);
      state.projetos[index] = projeto;
    },
  },
});

export function useStore(): Store<Estado> {
  return VueStore(key);
}
