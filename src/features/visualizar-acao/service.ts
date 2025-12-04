import type { Acao, VisualizarAcaoService } from "./types";

const acaoMock: Acao = {
  id: "101",
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
    {
      nome: "ASAS dsada",
      presente: true,
      outrosDados: {
        Email: "asas.dsada@exemplo.com",
        Telefone: "(31) 97777-9999",
      },
    },
    {
      nome: "Carlos Santos",
      presente: true,
      outrosDados: {
        Email: "carlos.santos@exemplo.com",
        Telefone: "(41) 99999-1111",
      },
    },
    {
      nome: "Marina Oliveira",
      presente: false,
      outrosDados: {
        Email: "marina.oliveira@exemplo.com",
        Telefone: "(51) 98765-4321",
      },
    },
    {
      nome: "Pedro Alves",
      presente: true,
      outrosDados: {
        Email: "pedro.alves@exemplo.com",
        Telefone: "(61) 97654-3210",
      },
    },
    {
      nome: "Beatriz Ferreira",
      presente: true,
      outrosDados: {
        Email: "beatriz.ferreira@exemplo.com",
        Telefone: "(71) 96543-2109",
      },
    },
    {
      nome: "Lucas Martins",
      presente: false,
      outrosDados: {
        Email: "lucas.martins@exemplo.com",
        Telefone: "(81) 95432-1098",
      },
    },
    {
      nome: "Camila Rocha",
      presente: true,
      outrosDados: {
        Email: "camila.rocha@exemplo.com",
        Telefone: "(85) 94321-0987",
      },
    },
    {
      nome: "Felipe Gomes",
      presente: true,
      outrosDados: {
        Email: "felipe.gomes@exemplo.com",
        Telefone: "(92) 93210-9876",
      },
    },
    {
      nome: "Gabriela Mendes",
      presente: false,
      outrosDados: {
        Email: "gabriela.mendes@exemplo.com",
        Telefone: "(31) 92109-8765",
      },
    },
    {
      nome: "Hugo Tavares",
      presente: true,
      outrosDados: {
        Email: "hugo.tavares@exemplo.com",
        Telefone: "(11) 91098-7654",
      },
    },
    {
      nome: "Iris Cunha",
      presente: true,
      outrosDados: {
        Email: "iris.cunha@exemplo.com",
        Telefone: "(21) 90987-6543",
      },
    },
    {
      nome: "Jefferson Dias",
      presente: true,
      outrosDados: {
        Email: "jefferson.dias@exemplo.com",
        Telefone: "(41) 89876-5432",
      },
    },
    {
      nome: "Karina Ribeiro",
      presente: false,
      outrosDados: {
        Email: "karina.ribeiro@exemplo.com",
        Telefone: "(51) 88765-4321",
      },
    },
    {
      nome: "Leonardo Sousa",
      presente: true,
      outrosDados: {
        Email: "leonardo.sousa@exemplo.com",
        Telefone: "(61) 87654-3210",
      },
    },
    {
      nome: "Monica Pires",
      presente: true,
      outrosDados: {
        Email: "monica.pires@exemplo.com",
        Telefone: "(71) 86543-2109",
      },
    },
    {
      nome: "Nathan Costa",
      presente: false,
      outrosDados: {
        Email: "nathan.costa@exemplo.com",
        Telefone: "(81) 85432-1098",
      },
    },
    {
      nome: "Olivia Barbosa",
      presente: true,
      outrosDados: {
        Email: "olivia.barbosa@exemplo.com",
        Telefone: "(85) 84321-0987",
      },
    },
  ],
};

class MockVisualizarAcaoService implements VisualizarAcaoService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getAcao(id: number): Promise<Acao | null> {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return {
      ...acaoMock,
      inscritos: acaoMock.inscritos.sort((a, b) =>
        a.nome.localeCompare(b.nome)
      ),
    };
  }
}

export const visualizarAcaoService = new MockVisualizarAcaoService();
