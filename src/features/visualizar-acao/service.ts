import type { Acao, IVisualizarAcaoService } from "./types";

class VisualizarAcaoService implements IVisualizarAcaoService {
  async getAcao(id: string): Promise<Acao | null> {
    const url =
      "https://n8n.atomotriz.com/webhook/cd91a1c4-6b8d-44b1-ab67-31fc8b1e7231";
    const response = await fetch(url + "?eventoId=" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error("Erro ao cadastrar ação");

    const data = (await response.json()) as Acao;
    return {
      ...data,
      inscritos: data.inscritos.sort((a, b) => a.nome.localeCompare(b.nome)),
    };
  }
}

export const visualizarAcaoService = new VisualizarAcaoService();
