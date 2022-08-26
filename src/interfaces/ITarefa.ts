import { IProjeto } from './IProjeto';

export interface ITarefa {
  duracao: number;
  descricao: string;
  projeto: IProjeto;
}
