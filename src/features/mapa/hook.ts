import { useContext } from "react";
import { MapaContext } from "./context";

export function useMapaContext() {
  return useContext(MapaContext);
}
