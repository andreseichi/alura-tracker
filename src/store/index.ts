import { createStore, Store, useStore as VueStore } from "vuex";

import { IProjeto } from "@/interfaces/IProjeto";
import { InjectionKey } from "vue";
import {
  ADICIONA_PROJETO,
  ALTERA_PROJETO,
  EXCLUIR_PROJETO,
} from "./tipo-mutacoes";
import { INotificacao, TipoNotificacao } from "@/interfaces/INotificacao";

interface Estado {
  projetos: IProjeto[];
  notificacoes: INotificacao[];
}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
  state: {
    projetos: [],
    notificacoes: [
      {
        id: 1,
        texto: "notificação de sucesso",
        titulo: "sucesso",
        tipo: TipoNotificacao.SUCESSO,
      },
      {
        id: 2,
        texto: "notificação de atenção",
        titulo: "atenção",
        tipo: TipoNotificacao.ATENÇÃO,
      },
      {
        id: 3,
        texto: "notificação de falha",
        titulo: "falha",
        tipo: TipoNotificacao.FALHA,
      },
    ],
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
  },
});

export function useStore(): Store<Estado> {
  return VueStore(key);
}
