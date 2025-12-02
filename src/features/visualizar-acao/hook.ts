import { useContext } from "react";
import { VisualizarAcaoContext } from "./types";

export const useVisualizarAcao = () => {
  const context = useContext(VisualizarAcaoContext);
  return context;
};
