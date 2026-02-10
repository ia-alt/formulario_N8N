import { createContext } from "react";
import type { IListarAcoesContext } from "./types";

const defaultValue: IListarAcoesContext = {
  acoes: [],
  carregando: true,
  filtroEixo: null,
  setFiltroEixo: () => {},
};

export const ListarAcoesContext = createContext(defaultValue);
