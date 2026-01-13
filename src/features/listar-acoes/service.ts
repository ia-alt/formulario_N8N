import { acoesSectiApi } from "../../shared/acoes-secti-api";
import type { IListarAcoesService } from "./types";

class ListarAcoesService implements IListarAcoesService {
  async listarAcoes() {
    return await acoesSectiApi.listarAcoes();
  }
}

export const listarAcoesService = new ListarAcoesService();
