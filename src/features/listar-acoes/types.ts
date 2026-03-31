import type { Acao } from "../../shared/types";

export interface IListarAcoesService {
  listarAcoes(): Promise<Acao[]>;
}

export interface IListarAcoesContext {
  carregando: boolean;
  acoes: Acao[];
  filtroEixo: string | null;
  setFiltroEixo: (eixo: string | null) => void;
  filtroDataInicio: string | null;
  filtroDataFim: string | null;
  setFiltroData: (inicio: string | null, fim: string | null) => void;
}
