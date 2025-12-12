import type { DadosCadastroAcao, ICadastrarAcaoService } from "./types";

class MockCadastrarAcaoService implements ICadastrarAcaoService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async cadastrarAcao(dados: DadosCadastroAcao): Promise<{ id: string }> {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return { id: "123" };
  }
}

export const cadastrarAcaoService = new MockCadastrarAcaoService();
