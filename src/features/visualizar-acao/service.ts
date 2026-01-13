import { acoesSectiApi } from "../../shared/acoes-secti-api";
import type { IVisualizarAcaoService } from "./types";

class VisualizarAcaoService implements IVisualizarAcaoService {
  cancelarAcao(id: string): Promise<void> {
    console.log("cancelar acao:", id);
    return Promise.resolve();
  }

  async concluirAcao(id: string): Promise<void> {
    return await acoesSectiApi.concluirAcao(id);
  }

  async getAcao(id: string) {
    return await acoesSectiApi.detalharAcao(id);
  }
}

export const visualizarAcaoService = new VisualizarAcaoService();
