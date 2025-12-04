import type { Secao } from "./types";

export const departamentos = [
  "Eixo Educação",
  "Eixo Ecossistema",
  "Eixo Inteligência Artificial",
  "Eixo Startups",
  "Eixo Social",
  "Eixo Universidade",
];

export const tiposCampo = [
  { value: "text", label: "Texto curto" },
  { value: "textarea", label: "Texto longo" },
  { value: "email", label: "Email" },
  { value: "tel", label: "Telefone" },
  { value: "date", label: "Data" },
  { value: "number", label: "Número" },
  { value: "radio", label: "Múltipla escolha (Rádio)" },
  { value: "checkbox", label: "Checkbox único" },
  { value: "checkbox-multiple", label: "Múltipla seleção" },
  { value: "select", label: "Lista suspensa" },
];

export const secoesObrigatorias: { primeira: Secao; ultima: Secao } = {
  primeira: {
    id: "info-pessoais",
    titulo: "Informações Pessoais",
    descricao: "Dados Pessoais do participante",
    campos: [
      { id: "nome", nome: "Nome Completo", tipo: "text", obrigatorio: true },
      { id: "cpf", nome: "CPF", tipo: "text", obrigatorio: true },
      { id: "email", nome: "Email", tipo: "email", obrigatorio: true },
      { id: "nascimento", nome: "Nascimento", tipo: "date", obrigatorio: true },
      { id: "telefone", nome: "Telefone", tipo: "tel", obrigatorio: false },
    ],
  },
  ultima: {
    id: "termos",
    titulo: "Termos e Consentimentos",
    descricao: "Leia e aceite os termos",
    campos: [
      {
        id: "termo-imagem",
        nome: "Termo de Consentimento para Uso de Imagem",
        tipo: "checkbox",
        obrigatorio: true,
        placeholder:
          "Ao concluir esta inscrição, você declara estar ciente e concordar...",
      },
      {
        id: "concordo-termo",
        nome: "Concordo com o termo de uso de imagem",
        tipo: "checkbox",
        obrigatorio: true,
      },
    ],
  },
};
