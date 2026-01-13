import type { DadosCadastroAcao } from "../../shared/acoes-secti-api";

export interface ICadastrarAcaoService {
  cadastrarAcao(dados: DadosCadastroAcao): Promise<{ id: string }>;
}
