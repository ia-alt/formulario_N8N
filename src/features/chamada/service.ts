import type { IChamadaService } from "./types";

class MockChamadaService implements IChamadaService {
  async setPresentes(acaoId: string, presentes: string[]): Promise<void> {
    console.log(
      `[MockChamadaService] setPresentes called with acaoId: ${acaoId}, presentes:`,
      presentes
    );
    return new Promise((resolve) => setTimeout(resolve, 3000));
  }
}

export const chamadaService: IChamadaService = new MockChamadaService();
