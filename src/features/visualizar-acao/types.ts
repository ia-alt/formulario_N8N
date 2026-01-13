import { createContext } from "react";
import type { AcaoComInscritos, Inscrito } from "../../shared/types";

export interface IVisualizarAcaoService {
  getAcao(id: string): Promise<AcaoComInscritos | null>;
  cancelarAcao(id: string): Promise<void>;
  concluirAcao(id: string): Promise<void>;
}

export interface IVisualizarAcaoContext {
  carregando: boolean;
  acao: AcaoComInscritos | null;
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
