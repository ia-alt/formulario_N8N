import type { Acao, VisualizarAcaoService } from "./types";

const acaoMock: Acao = {
  id: 101,
  status: "ATIVA",
  eixo: "Eixo Social",
  titulo: "Oficina de Lançamento de Foguetes",
  descricao:
    "Oficina prática destinadas a alunos do ensino fundamental para a confecção de foguetes a base de garrafas PET.",
  local: "Estação Tech Santa Rita-MA",
  tipo: "oficina",
  cargaHoraria: 4,
  data: "2024-12-15",
  horarioInicio: "14:00",
  horarioFim: "18:00",
  linkFormularioInscricao: "https://forms.exemplo.com/inscricao-ia-2024",
  inscritos: [
    {
      nome: "Ana Clara Silva",
      presente: true,
      outrosDados: {
        Email: "ana.silva@exemplo.com",
        Telefone: "(11) 99876-5432",
      },
    },
    {
      nome: "Roberto Mendes",
      presente: false,
      outrosDados: {
        Email: "roberto.mendes@exemplo.com",
        Telefone: "(21) 98888-1234",
      },
    },
    {
      nome: "Juliana Costa",
      presente: true,
      outrosDados: {
        Email: "juju.costa@exemplo.com",
        Telefone: "(31) 97777-9999",
      },
    },
  ],
};

class MockVisualizarAcaoService implements VisualizarAcaoService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getAcao(id: number): Promise<Acao | null> {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return acaoMock;
  }
}

export const visualizarAcaoService = new MockVisualizarAcaoService();
