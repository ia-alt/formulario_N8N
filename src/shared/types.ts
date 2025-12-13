export type Inscrito = {
  nome: string;
  presente: boolean;
  outrosDados: object;
};

export type StatusAcao = "ATIVA" | "CONCLUIDA" | "CANCELADA";

export type Acao = {
  id: string;
  status: StatusAcao;
  eixo: string;
  titulo: string;
  local: string;
  municipio: string;
  tipo: string; // palestra, oficina, minicurso, roda de conversa
  cargaHoraria: number;
  data: string; // YYYY-MM-DD
  horarioInicio: string; // HH:MM
  horarioFim: string; // HH:MM

  linkFormularioInscricao: string;
  linkEditarFormularioInscricao: string;
  linkPlanilhaInscritos: string;
  linkGoogleCalendar: string;
};
