import { createContext } from "react";
import type { Inscrito } from "../../shared/types";

export type StatusAcao = "ATIVA" | "CONCLUIDA" | "CANCELADA";

export type Acao = {
  id: string;
  status: StatusAcao;
  eixo: string;
  titulo: string;
  local: string;
  municipio: string;
  tipo: string; // palestra, oficina, minicurso, roda de conversa
  cargaHoraria: number;
  data: string; // YYYY-MM-DD
  horarioInicio: string; // HH:MM
  horarioFim: string; // HH:MM

  linkFormularioInscricao: string;
  linkEditarFormularioInscricao: string;
  linkPlanilhaInscritos: string;
  linkGoogleCalendar: string;

  inscritos: Inscrito[];
};

export interface IVisualizarAcaoService {
  getAcao(id: string): Promise<Acao | null>;
  cancelarAcao(id: string): Promise<void>;
  finalizarAcao(id: string): Promise<void>;
}

export interface IVisualizarAcaoContext {
  carregando: boolean;
  acao: Acao | null;
  updateInscritos: (inscritos: Inscrito[]) => void;
  cancelarAcao: () => void;
  finalizarAcao: () => void;
}

const defaultValue: IVisualizarAcaoContext = {
  acao: null,
  carregando: false,
  updateInscritos: () => {},
  cancelarAcao: () => {},
  finalizarAcao: () => {},
};

export const VisualizarAcaoContext = createContext(defaultValue);
