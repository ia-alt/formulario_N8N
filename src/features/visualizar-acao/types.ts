import { createContext } from "react";

export type StatusAcao = "ATIVA" | "CONCLUIDA" | "CANCELADA";

export type Acao = {
  id: number;
  status: StatusAcao;
  eixo: string;
  titulo: string;
  descricao: string;
  local: string;
  tipo: string;
  cargaHoraria: number;
  data: string; // YYYY-MM-DD
  horarioInicio: string; // HH:MM
  horarioFim: string; // HH:MM

  linkFormularioInscricao: string;

  inscritos: Inscrito[];
};

export type Inscrito = {
  nome: string;
  presente: boolean;
  outrosDados: object;
};

export interface VisualizarAcaoService {
  getAcao(id: number): Promise<Acao | null>;
}

export interface IVisualizarAcaoContext {
  carregando: boolean;
  acao: Acao | null;
}

const defaultValue: IVisualizarAcaoContext = {
  acao: null,
  carregando: false,
};

export const VisualizarAcaoContext = createContext(defaultValue);
