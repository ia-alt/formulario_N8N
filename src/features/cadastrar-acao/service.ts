import type { DadosCadastroAcao, ICadastrarAcaoService } from "./types";

class CadastrarAcaoService implements ICadastrarAcaoService {
  async cadastrarAcao(dados: DadosCadastroAcao): Promise<{ id: string }> {
    const url =
      "https://n8n.atomotriz.com/webhook/ddbe0724-6073-448a-8f07-71a4e5ede1cf";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    });
    if (!response.ok) throw new Error("Erro ao cadastrar ação");

    const data = (await response.json()) as { id: string };
    return data;
  }
}

export const cadastrarAcaoService = new CadastrarAcaoService();
