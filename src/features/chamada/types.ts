export interface IChamadaService {
  setPresentes: (acaoId: string, presentes: string[]) => Promise<void>;
}
