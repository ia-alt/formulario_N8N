import { env } from "../../env";
import type { Acao, AcaoComInscritos } from "../types";

export type DadosCadastroAcao = {
  nome: string;
  tipo: string;
  publicoAlvo: string;
  cargaHoraria: number;
  eixo: string;
  local: string;
  cidade: string;
  data: string;
  horarioInicio: string;
  horarioFim: string;
  camposFormularioInscricao: Campo[];
};

export interface Campo {
  nome: string;
  tipo: string;
  obrigatorio: boolean;
}

class AcoesSectiApi {
  private env = env.appEnv;
  constructor() {}

  async cadastrarAcao(dados: DadosCadastroAcao): Promise<{ id: string }> {
    const url = "https://n8n.atomotriz.com/webhook/secti/acoes";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-env": this.env,
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21lIjoiR3VpbGhlcm1lIGRvcyByZWlzIGxpbWEiLCJjcGYiOiIxMjM0NTY3ODkwMCIsImV4cCI6MTc2OTAyNzExNiwiaWF0IjoxNzY4NDIyMzE2fQ.BuYxGH6gSROB9aAheFmV-omyamZMwJAwYEdkL3Bh2Mc'
      },
      body: JSON.stringify(dados),
    });
    if (!response.ok) throw new Error("Erro ao cadastrar ação");

    const data = (await response.json()) as { id: string };
    return data;
  }

  async setInscritosPresentesEmAcao(
    acaoId: string,
    presentes: string[]
  ): Promise<void> {
    const url =
      "https://n8n.atomotriz.com/webhook/76fff530-decf-4c4b-a2ef-727e87623aa2/secti/acoes/:acaoId/chamada";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-env": this.env,
      },
      body: JSON.stringify({ idAcao: acaoId, presentes }),
    });

    if (!response.ok) throw new Error("Erro ao cadastrar ação");
  }

  async listarAcoes() {
    const url =
      "https://n8n.atomotriz.com/webhook/658b9bb1-f7c5-4588-9ae5-f4a1e32576b0";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-env": this.env,
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21lIjoiR3VpbGhlcm1lIGRvcyByZWlzIGxpbWEiLCJjcGYiOiIxMjM0NTY3ODkwMCIsImV4cCI6MTc2OTAyNzExNiwiaWF0IjoxNzY4NDIyMzE2fQ.BuYxGH6gSROB9aAheFmV-omyamZMwJAwYEdkL3Bh2Mc'
      },
    });

    if (!response.ok) throw new Error("Erro ao cadastrar ação");

    const responseJson = (await response.json()) as { data: Acao[] };
    const data = responseJson.data;
    data.sort(
      (a, b) =>
        new Date(b.data + "T" + b.horarioInicio).getTime() -
        new Date(a.data + "T" + a.horarioInicio).getTime()
    );
    return data;
  }

  async detalharAcao(id: string): Promise<AcaoComInscritos | null> {
    const url = `https://n8n.atomotriz.com/webhook/cd91a1c4-6b8d-44b1-ab67-31fc8b1e7231/secti/acoes/${id}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-env": this.env,
      },
    });
    if (!response.ok) throw new Error("Erro ao cadastrar ação");

    const data = (await response.json()) as AcaoComInscritos;
    return {
      ...data,
      inscritos: data.inscritos.sort((a, b) => a.nome.localeCompare(b.nome)),
    };
  }

  async concluirAcao(id: string): Promise<void> {
    const url = `https://n8n.atomotriz.com/webhook/75236413-ad0e-47e4-9328-f783a8ab3382/secti/acoes/${id}/concluir`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-env": this.env,
      },
    });

    if (!response.ok) throw new Error("Erro ao cadastrar ação");
  }
}

export const acoesSectiApi = new AcoesSectiApi();
