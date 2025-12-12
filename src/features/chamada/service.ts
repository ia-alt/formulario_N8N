import type { IChamadaService } from "./types";

class MockChamadaService implements IChamadaService {
  async setPresentes(acaoId: string, presentes: string[]): Promise<void> {
    const url =
      "https://n8n.atomotriz.com/webhook/76fff530-decf-4c4b-a2ef-727e87623aa2";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idAcao: acaoId, presentes }),
    });

    if (!response.ok) throw new Error("Erro ao cadastrar ação");
  }
}

export const chamadaService: IChamadaService = new MockChamadaService();
