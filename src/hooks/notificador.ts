import { TipoNotificacao } from "@/interfaces/INotificacao";
import { store } from "@/store";
import { NOTIFICAR } from "@/store/tipo-mutacoes";

type Notificador = {
  notificar: (tipo: TipoNotificacao, titulo: string, texto: string) => void;
};

export const useNotificador = (): Notificador => {
  const notificar = (tipo: TipoNotificacao, titulo: string, texto: string) => {
    store.commit(NOTIFICAR, {
      titulo,
      texto,
      tipo,
    });
  };

  return {
    notificar,
  };
};
