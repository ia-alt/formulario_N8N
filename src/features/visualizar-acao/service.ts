import type { AcaoComInscritos, IVisualizarAcaoService } from "./types";

class VisualizarAcaoService implements IVisualizarAcaoService {
  cancelarAcao(id: string): Promise<void> {
    console.log("cancelar acao:", id);
    return Promise.resolve();
  }

  async finalizarAcao(id: string): Promise<void> {
    const url =
      "https://n8n.atomotriz.com/webhook/75236413-ad0e-47e4-9328-f783a8ab3382";
    const response = await fetch(url + "?eventoId=" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error("Erro ao cadastrar ação");
  }

  async getAcao(id: string): Promise<AcaoComInscritos | null> {
    const url =
      "https://n8n.atomotriz.com/webhook/cd91a1c4-6b8d-44b1-ab67-31fc8b1e7231";
    const response = await fetch(url + "?eventoId=" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error("Erro ao cadastrar ação");

    const data = (await response.json()) as AcaoComInscritos;
    return {
      ...data,
      inscritos: data.inscritos.sort((a, b) => a.nome.localeCompare(b.nome)),
    };
  }
}

export const visualizarAcaoService = new VisualizarAcaoService();
