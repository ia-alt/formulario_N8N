import { acoesSectiApi } from "../../shared/acoes-secti-api";
import type { IChamadaService } from "./types";

class MockChamadaService implements IChamadaService {
  async setPresentes(acaoId: string, presentes: string[]): Promise<void> {
    return await acoesSectiApi.setInscritosPresentesEmAcao(acaoId, presentes);
  }
}

export const chamadaService: IChamadaService = new MockChamadaService();
