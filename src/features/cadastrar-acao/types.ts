export type DadosCadastroAcao = {
  nome: string;
  tipo: string; // palestra, oficina, minicurso, roda de conversa
  publicoAlvo: string;
  cargaHoraria: number;
  eixo: string;
  local: string;
  cidade: string;
  data: string; // YYYY-MM-DD
  horarioInicio: string; // HH:MM
  horarioFim: string;
  camposFormularioInscricao: Campo[];
};

export interface Campo {
  nome: string;
  tipo: string;
  obrigatorio: boolean;
}

export interface ICadastrarAcaoService {
  cadastrarAcao(dados: DadosCadastroAcao): Promise<{ id: string }>;
}
