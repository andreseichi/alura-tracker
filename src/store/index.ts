import { createStore, Store, useStore as VueStore } from "vuex";

import { IProjeto } from "@/interfaces/IProjeto";
import { InjectionKey } from "vue";
import {
  ADICIONA_PROJETO,
  ADICIONA_TAREFA,
  ALTERA_PROJETO,
  ALTERA_TAREFA,
  DEFINIR_PROJETOS,
  DEFINIR_TAREFAS,
  EXCLUIR_PROJETO,
  NOTIFICAR,
} from "./tipo-mutacoes";
import { INotificacao } from "@/interfaces/INotificacao";
import {
  ALTERAR_PROJETO,
  ALTERAR_TAREFA,
  CADASTRAR_PROJETO,
  CADASTRAR_TAREFA,
  OBTER_PROJETOS,
  OBTER_TAREFAS,
  REMOVER_PROJETO,
} from "./tipo-acoes";
import { api } from "@/http";
import { ITarefa } from "@/interfaces/ITarefa";

interface Estado {
  projetos: IProjeto[];
  tarefas: ITarefa[];
  notificacoes: INotificacao[];
}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
  actions: {
    [OBTER_PROJETOS]({ commit }) {
      api.get("projetos").then(({ data }) => commit(DEFINIR_PROJETOS, data));
    },
    [CADASTRAR_PROJETO](store, nomeDoProjeto: string) {
      const projeto = {
        id: new Date().toISOString(),
        nome: nomeDoProjeto,
      } as IProjeto;

      return api.post("projetos", projeto);
    },
    [ALTERAR_PROJETO](store, projeto: IProjeto) {
      return api.put(`projetos/${projeto.id}`, projeto);
    },
    [REMOVER_PROJETO]({ commit }, id: string) {
      return api
        .delete(`projetos/${id}`)
        .then(() => commit(EXCLUIR_PROJETO, id));
    },
    [OBTER_TAREFAS]({ commit }, filtro: string) {
      let url = "tarefas";

      if (filtro) {
        url += "?descricao=" + filtro;
      }

      api.get(url).then(({ data }) => commit(DEFINIR_TAREFAS, data));
    },
    [CADASTRAR_TAREFA]({ commit }, tarefa: ITarefa) {
      return api
        .post("tarefas", tarefa)
        .then(({ data }) => commit(ADICIONA_TAREFA, data));
    },
    [ALTERAR_TAREFA](store, tarefa: ITarefa) {
      return api.put(`tarefas/${tarefa.id}`, tarefa);
    },
  },
  state: {
    projetos: [],
    tarefas: [],
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
    [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
      state.tarefas = tarefas;
    },
    [ADICIONA_TAREFA](state, tarefa: ITarefa) {
      state.tarefas.push(tarefa);
    },
    [ALTERA_TAREFA](state, tarefa: ITarefa) {
      const index = state.tarefas.findIndex((tar) => tar.id === tarefa.id);
      state.tarefas[index] = tarefa;
    },
  },
});

export function useStore(): Store<Estado> {
  return VueStore(key);
}
