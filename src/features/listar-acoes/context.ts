import { createContext } from "react";
import type { IListarAcoesContext } from "./types";

const defaultValue: IListarAcoesContext = {
  acoes: [],
  carregando: true,
  filtroEixo: null,
  setFiltroEixo: () => {},
  filtroDataInicio: null,
  filtroDataFim: null,
  setFiltroData: () => {},
};

export const ListarAcoesContext = createContext(defaultValue);
