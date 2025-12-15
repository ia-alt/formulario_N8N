import type { Acao } from "../../shared/types";
import type { IListarAcoesService } from "./types";

class ListarAcoesService implements IListarAcoesService {
  async listarAcoes() {
    const url =
      "https://n8n.atomotriz.com/webhook/658b9bb1-f7c5-4588-9ae5-f4a1e32576b0";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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
}

export const listarAcoesService = new ListarAcoesService();
