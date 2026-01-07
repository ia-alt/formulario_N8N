import { createContext } from "react";
import type { IMapaContext } from "./types";

const defaultValue: IMapaContext = {
  map: null,
  listaVerde: [],
};

export const MapaContext = createContext<IMapaContext>(defaultValue);
