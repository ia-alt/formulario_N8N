import { useContext } from "react";
import { ListarAcoesContext } from "./context";

export function useListarAcoes() {
  return useContext(ListarAcoesContext);
}
