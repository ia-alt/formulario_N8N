import { createContext } from "react";
import type { IMapaContext } from "./types";

const defaultValue: IMapaContext = {
  map: null,
  listaVerde: [],
  filtroOptions: {
    eixo_responsavel: [],
    tipo_acao: [],
    publico_alvo: [],
    Modalidade: [],
  },
};

export const MapaContext = createContext<IMapaContext>(defaultValue);
