export type Inscrito = {
  nome: string;
  presente: boolean;
  outrosDados: object;
};

export type StatusAcao = "ATIVA" | "CONCLUIDA" | "CANCELADA";

export type Acao = {
  id: string;
  status: StatusAcao;
  eixo?: string;
  eixos_auxiliares?: string; // string separada por vírgulas
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

export type AcaoComInscritos = {
  inscritos: Inscrito[];
} & Acao;

export type FormularioInfo = {temAcessoForm: false} | {
  temAcessoForm: true;
  formItems: FormItem[];
  temPlanilhaVinculada: false;
} | {
  temAcessoForm: true;
  formItems: FormItem[];
  temPlanilhaVinculada: true;
  temAcessoPlanilhaRespostas: false;
} | {
  temAcessoForm: true;
  formItems: FormItem[];
  temPlanilhaVinculada: true;
  temAcessoPlanilhaRespostas: true;
  planilhaData: PlanilhaData;
}

export type FormItem = {
  itemId: string;
  title: string;
  questionItem: FormQuestionItem;
}

export type FormQuestionItem = {
  question: FormQuestion;
}

export type FormQuestion = {
  questionId: string;
  textQuestion: FormTextQuestion;
}

export type FormTextQuestion = {
  
}

export type PlanilhaData = {
  id: string;
  titulo: string;
  colunas: string[];
}
