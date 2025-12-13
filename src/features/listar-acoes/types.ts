import type { Acao } from "../../shared/types";

export interface IListarAcoesService {
  listarAcoes(): Promise<Acao[]>;
}

export interface IListarAcoesContext {
  carregando: boolean;
  acoes: Acao[];
}
