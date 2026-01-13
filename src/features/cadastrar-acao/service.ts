import {
  acoesSectiApi,
  type DadosCadastroAcao,
} from "../../shared/acoes-secti-api";
import type { ICadastrarAcaoService } from "./types";

class CadastrarAcaoService implements ICadastrarAcaoService {
  async cadastrarAcao(dados: DadosCadastroAcao): Promise<{ id: string }> {
    return await acoesSectiApi.cadastrarAcao(dados);
  }
}

export const cadastrarAcaoService = new CadastrarAcaoService();
