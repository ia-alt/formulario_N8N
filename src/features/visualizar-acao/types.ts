import { createContext } from "react";
import type { Inscrito } from "../../shared/types";

export type StatusAcao = "ATIVA" | "CONCLUIDA" | "CANCELADA";

export type Acao = {
  id: string;
  status: StatusAcao;
  eixo: string;
  titulo: string;
  descricao: string;
  local: string;
  tipo: string; // palestra, oficina, minicurso, roda de conversa
  cargaHoraria: number;
  data: string; // YYYY-MM-DD
  horarioInicio: string; // HH:MM
  horarioFim: string; // HH:MM

  linkFormularioInscricao: string;

  inscritos: Inscrito[];
};

export interface VisualizarAcaoService {
  getAcao(id: number): Promise<Acao | null>;
}

export interface IVisualizarAcaoContext {
  carregando: boolean;
  acao: Acao | null;
  updateInscritos: (inscritos: Inscrito[]) => void;
}

const defaultValue: IVisualizarAcaoContext = {
  acao: null,
  carregando: false,
  updateInscritos: () => {},
};

export const VisualizarAcaoContext = createContext(defaultValue);
