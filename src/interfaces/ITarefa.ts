import { IProjeto } from './IProjeto';

export interface ITarefa {
  id: number;
  duracao: number;
  descricao: string;
  projeto: IProjeto;
}
