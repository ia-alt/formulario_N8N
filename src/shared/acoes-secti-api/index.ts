import { env } from "../../env";
import type { Acao, AcaoComInscritos, FormularioInfo } from "../types";
export type { FormularioInfo };

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
} & (
  | {
      camposFormularioInscricao: Campo[];
      formularioInscricaoUrl?: never;
    }
  | {
      formularioInscricaoUrl: string;
      camposFormularioInscricao?: never;
    }
);



export interface Campo {
  nome: string;
  tipo: string;
  obrigatorio: boolean;
}

export type DadosLogin = {
  usuario: string;
  senha: string;
};

export type RespostaLogin = {
  success: boolean;
  token: string;
  message: string;
};

class AcoesSectiApi {
  private env = env.appEnv;
  private getAuthHeaders(): Record<string, string> {
    const token = localStorage.getItem("token");
    const headers: Record<string, string> = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    return headers;
  }
  constructor() {}

  async login(dados: DadosLogin): Promise<RespostaLogin> {
    const url =
      "https://n8n.atomotriz.com/webhook/7df35919-0693-4443-98bc-bfc75569e2ab";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-env": this.env,
      },
      body: JSON.stringify(dados),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Acesso negado: Usuário ou senha incorretos.");
      }
      throw new Error("Erro ao realizar login");
    }

    const data = (await response.json()) as RespostaLogin;
    return data;
  }

  async cadastrarAcao(dados: DadosCadastroAcao): Promise<{ id: string }> {
    const url = "https://n8n.atomotriz.com/webhook/secti/acoes";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-env": this.env,
        ...this.getAuthHeaders(),
      },
      body: JSON.stringify(dados),
    });
    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
      throw new Error("Erro ao cadastrar ação");
    }

    const data = (await response.json()) as { id: string };
    return data;
  }

  async setInscritosPresentesEmAcao(
    acaoId: string,
    presentes: string[],
  ): Promise<void> {
    const url =
      "https://n8n.atomotriz.com/webhook/76fff530-decf-4c4b-a2ef-727e87623aa2/secti/acoes/:acaoId/chamada";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-env": this.env,
        ...this.getAuthHeaders(),
      },
      body: JSON.stringify({ idAcao: acaoId, presentes }),
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
      throw new Error("Erro ao cadastrar ação");
    }
  }

  async listarAcoes() {
    const url =
      "https://n8n.atomotriz.com/webhook/658b9bb1-f7c5-4588-9ae5-f4a1e32576b0";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-env": this.env,
        ...this.getAuthHeaders(),
      },
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
      throw new Error("Erro ao cadastrar ação");
    }

    const responseJson = (await response.json()) as { data: Acao[] };
    const data = responseJson.data;
    data.sort(
      (a, b) =>
        new Date(b.data + "T" + b.horarioInicio).getTime() -
        new Date(a.data + "T" + a.horarioInicio).getTime(),
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
        ...this.getAuthHeaders(),
      },
    });
    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
      throw new Error("Erro ao cadastrar ação");
    }

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
        ...this.getAuthHeaders(),
      },
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
      throw new Error("Erro ao cadastrar ação");
    }
  }

  async verificaGoogleForms(formUrl: string): Promise<FormularioInfo> {
    const url = `https://n8n.atomotriz.com/webhook/4ad5dea8-243f-4dcd-a944-7d8e3a73d1ec`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-env": this.env,
        ...this.getAuthHeaders(),
      },
      body: JSON.stringify({ formUrl }),
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
      throw new Error("Erro!");
    }

    const data = (await response.json()) as FormularioInfo;
    return data;
  }
}

export const acoesSectiApi = new AcoesSectiApi();
