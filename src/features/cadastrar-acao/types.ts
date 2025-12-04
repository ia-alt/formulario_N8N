export type DadosCadstroAcao = {
  eixo: string;
  titulo: string;
  descricao: string;
  local: string;
  tipo: string; // palestra, oficina, minicurso, roda de conversa
  cargaHoraria: number;
  data: string; // YYYY-MM-DD
  horarioInicio: string; // HH:MM
  horarioFim: string; // HH:MM

  formularioDeInscricao: {
    secoes: Secao[];
  };
};

export interface Campo {
  id: string;
  nome: string;
  tipo: string;
  obrigatorio: boolean;
  opcoes?: string[];
  placeholder?: string;
}

export interface Secao {
  id: string;
  titulo: string;
  descricao: string;
  campos: Campo[];
  condicional?: {
    campoId: string;
    valor: string;
  };
}
