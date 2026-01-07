export interface IMapaContext {
  map: google.maps.Map | null;
  listaVerde: string[];
  filtroOptions: FiltroOptions;
}

export interface AcaoJson {
  eixo_responsavel: string;
  nome_responsavel: string;
  nome_acao: string;
  tipo_acao: string;
  data_acao: string;
  local_acao: string;
  municipio: string;
  publico_alvo: string;
  impactos_diretos: number;
  Modalidade: "Presencial" | "Remoto";
}

export type Acao = Omit<AcaoJson, "data_acao"> & {
  data_acao: Date;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type Filtro = {};
export type FiltroOptions = {
  eixo_responsavel: string[];
  tipo_acao: string[];
  publico_alvo: string[];
  Modalidade: string[];
};
