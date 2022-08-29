export enum TipoNotificacao {
  SUCESSO,
  FALHA,
  ATENÇÃO,
}

export interface INotificacao {
  titulo: string;
  texto: string;
  tipo: TipoNotificacao;
  id: number;
}
