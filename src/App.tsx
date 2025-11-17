import React, { useState } from 'react';
import { Plus, Trash2, AlertCircle, CheckCircle, Loader2, Calendar, Clock, MapPin, Users, Eye, Copy } from 'lucide-react';

interface Campo {
  id: string;
  nome: string;
  tipo: string;
  obrigatorio: boolean;
  opcoes?: string[];
  placeholder?: string;
}

interface Secao {
  id: string;
  titulo: string;
  descricao: string;
  campos: Campo[];
  condicional?: {
    campoId: string;
    valor: string;
  };
}

interface FormData {
  nomeEvento: string;
  departamento: string;
  dataEvento: string;
  horaInicio: string;
  horaFim: string;
  descricao: string;
  localEvento: string;
  cargaHoraria: string;
  vagas: string;
  secoes: Secao[];
}

export default function EventForm() {
  const [formData, setFormData] = useState<FormData>({
    nomeEvento: '',
    departamento: '',
    dataEvento: '',
    horaInicio: '',
    horaFim: '',
    descricao: '',
    localEvento: '',
    cargaHoraria: '',
    vagas: '',
    secoes: []
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [showSectionModal, setShowSectionModal] = useState(false);
  const [currentSection, setCurrentSection] = useState<Secao>({
    id: '',
    titulo: '',
    descricao: '',
    campos: []
  });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const departamentos = [
    'Eixo IA',
    'Eixo Educação',
    'Eixo Ecossistema',
    'Eixo Startups',
    'Eixo Social',
    'Eixo Universidade'
  ];

  const tiposCampo = [
    { value: 'text', label: 'Texto curto' },
    { value: 'textarea', label: 'Texto longo' },
    { value: 'email', label: 'Email' },
    { value: 'tel', label: 'Telefone' },
    { value: 'date', label: 'Data' },
    { value: 'number', label: 'Número' },
    { value: 'radio', label: 'Múltipla escolha (Rádio)' },
    { value: 'checkbox', label: 'Checkbox único' },
    { value: 'checkbox-multiple', label: 'Múltipla seleção' },
    { value: 'select', label: 'Lista suspensa' }
  ];

  const secoesPredefinidas = [
    {
      id: 'info-pessoais',
      titulo: 'Informações Pessoais',
      descricao: 'Dados básicos do participante',
      campos: [
        { id: 'nome', nome: 'Nome Completo', tipo: 'text', obrigatorio: true },
        { id: 'cpf', nome: 'CPF', tipo: 'text', obrigatorio: true },
        { id: 'email', nome: 'Email', tipo: 'email', obrigatorio: true },
        { id: 'telefone', nome: 'Telefone', tipo: 'tel', obrigatorio: false }
      ]
    },
    {
      id: 'menor-idade',
      titulo: 'Para menores de idade',
      descricao: 'Informações do responsável (se aplicável)',
      campos: [
        { id: 'nome-responsavel', nome: 'Nome completo do responsável', tipo: 'text', obrigatorio: false },
        { id: 'cpf-responsavel', nome: 'CPF do responsável', tipo: 'text', obrigatorio: false }
      ],
      condicional: { campoId: 'idade', valor: 'menor' }
    },
    {
      id: 'info-adicionais',
      titulo: 'Informações Adicionais',
      descricao: 'Dados complementares',
      campos: [
        { 
          id: 'deficiencia', 
          nome: 'É pessoa com deficiência?', 
          tipo: 'radio', 
          obrigatorio: true,
          opcoes: ['Não', 'Auditiva', 'Intelectual', 'Motora', 'Psicossocial', 'Visual', 'Outra']
        },
        { 
          id: 'neurodesenvolvimento', 
          nome: 'Possui algum transtorno do neurodesenvolvimento?', 
          tipo: 'checkbox-multiple', 
          obrigatorio: false,
          opcoes: ['Não', 'TEA', 'TDAH', 'Outro']
        }
      ]
    },
    {
      id: 'termos',
      titulo: 'Termos e Consentimentos',
      descricao: 'Leia e aceite os termos',
      campos: [
        { 
          id: 'termo-imagem', 
          nome: 'Termo de Consentimento para Uso de Imagem', 
          tipo: 'textarea', 
          obrigatorio: true,
          placeholder: 'Ao concluir esta inscrição, você declara estar ciente e concordar...'
        },
        { 
          id: 'concordo-termo', 
          nome: 'Concordo com o termo de uso de imagem', 
          tipo: 'checkbox', 
          obrigatorio: true 
        }
      ]
    }
  ];

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addSecaoPredefinida = (secao: Secao) => {
    const novaSecao = {
      ...secao,
      id: generateId(),
      campos: secao.campos.map(campo => ({
        ...campo,
        id: generateId()
      }))
    };

    setFormData(prev => ({
      ...prev,
      secoes: [...prev.secoes, novaSecao]
    }));
  };

  const addCampoToSection = () => {
    setCurrentSection(prev => ({
      ...prev,
      campos: [...prev.campos, { 
        id: generateId(),
        nome: '', 
        tipo: 'text', 
        obrigatorio: false 
      }]
    }));
  };

  const removeCampoFromSection = (index: number) => {
    setCurrentSection(prev => ({
      ...prev,
      campos: prev.campos.filter((_, i) => i !== index)
    }));
  };

  const updateCampo = (index: number, field: keyof Campo, value: any) => {
    setCurrentSection(prev => ({
      ...prev,
      campos: prev.campos.map((campo, i) => 
        i === index ? { ...campo, [field]: value } : campo
      )
    }));
  };

  const addOpcaoCampo = (campoIndex: number, opcao: string) => {
    if (!opcao.trim()) return;
    
    setCurrentSection(prev => ({
      ...prev,
      campos: prev.campos.map((campo, i) => 
        i === campoIndex 
          ? { 
              ...campo, 
              opcoes: [...(campo.opcoes || []), opcao.trim()] 
            } 
          : campo
      )
    }));
  };

  const removeOpcaoCampo = (campoIndex: number, opcaoIndex: number) => {
    setCurrentSection(prev => ({
      ...prev,
      campos: prev.campos.map((campo, i) => 
        i === campoIndex 
          ? { 
              ...campo, 
              opcoes: campo.opcoes?.filter((_, j) => j !== opcaoIndex) 
            } 
          : campo
      )
    }));
  };

  const saveSection = () => {
    if (!currentSection.titulo.trim()) {
      alert('O título da seção é obrigatório!');
      return;
    }

    const secaoParaSalvar = {
      ...currentSection,
      id: currentSection.id || generateId()
    };

    if (editingIndex !== null) {
      setFormData(prev => ({
        ...prev,
        secoes: prev.secoes.map((sec, i) => 
          i === editingIndex ? secaoParaSalvar : sec
        )
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        secoes: [...prev.secoes, secaoParaSalvar]
      }));
    }

    setCurrentSection({ id: '', titulo: '', descricao: '', campos: [] });
    setShowSectionModal(false);
    setEditingIndex(null);
  };

  const editSection = (index: number) => {
    setCurrentSection(formData.secoes[index]);
    setEditingIndex(index);
    setShowSectionModal(true);
  };

  const deleteSection = (index: number) => {
    if (confirm('Tem certeza que deseja excluir esta seção?')) {
      setFormData(prev => ({
        ...prev,
        secoes: prev.secoes.filter((_, i) => i !== index)
      }));
    }
  };

  const moverSecao = (index: number, direcao: 'up' | 'down') => {
    const novasSecoes = [...formData.secoes];
    if (direcao === 'up' && index > 0) {
      [novasSecoes[index - 1], novasSecoes[index]] = [novasSecoes[index], novasSecoes[index - 1]];
    } else if (direcao === 'down' && index < novasSecoes.length - 1) {
      [novasSecoes[index], novasSecoes[index + 1]] = [novasSecoes[index + 1], novasSecoes[index]];
    }
    setFormData(prev => ({ ...prev, secoes: novasSecoes }));
  };

  const handleSubmit = async () => {
    if (!formData.nomeEvento || !formData.departamento || !formData.dataEvento || 
        !formData.horaInicio || !formData.horaFim || !formData.descricao || !formData.localEvento) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      return;
    }

    setMessage({ type: '', text: '' });
    setLoading(true);

    try {
      const webhookUrl = 'https://n8n.atomotriz.com/webhook/ddbe0724-6073-448a-8f07-71a4e5ede1cf';
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      setLoading(false);

      if (response.ok) {
        setMessage({
          type: 'success',
          text: 'Evento criado com sucesso! O formulário será gerado em breve.'
        });
        
        setTimeout(() => {
          setMessage({ type: '', text: '' });
        }, 5000);
      } else {
        throw new Error('Erro ao enviar os dados');
      }
    } catch (error) {
      setLoading(false);
      setMessage({
        type: 'error',
        text: 'Erro ao criar evento. Tente novamente.'
      });
      console.error('Erro:', error);
    }
  };

  const PreviewFormulario = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800">Pré-visualização do Formulário</h3>
            <button
              onClick={() => setShowPreview(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-bold text-lg text-blue-800 mb-2">{formData.nomeEvento}</h4>
              <p className="text-blue-700 text-sm">{formData.descricao}</p>
            </div>

            {formData.secoes.map((secao, secaoIndex) => (
              <div key={secao.id} className="border border-gray-200 rounded-lg p-6">
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      Seção {secaoIndex + 1} de {formData.secoes.length}
                    </span>
                    {secao.condicional && (
                      <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                        Condicional
                      </span>
                    )}
                  </div>
                  <h5 className="font-bold text-lg text-gray-800">{secao.titulo}</h5>
                  {secao.descricao && (
                    <p className="text-gray-600 text-sm mt-1">{secao.descricao}</p>
                  )}
                </div>

                <div className="space-y-4">
                  {secao.campos.map((campo) => (
                    <div key={campo.id} className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        {campo.nome} {campo.obrigatorio && <span className="text-red-500">*</span>}
                      </label>
                      
                      {campo.tipo === 'text' && (
                        <input
                          type="text"
                          placeholder={campo.placeholder || `Digite ${campo.nome.toLowerCase()}...`}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      )}
                      
                      {campo.tipo === 'textarea' && (
                        <textarea
                          placeholder={campo.placeholder || `Digite ${campo.nome.toLowerCase()}...`}
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
                        />
                      )}
                      
                      {campo.tipo === 'radio' && campo.opcoes && (
                        <div className="space-y-2">
                          {campo.opcoes.map((opcao, idx) => (
                            <label key={idx} className="flex items-center gap-2">
                              <input type="radio" name={campo.id} className="text-blue-600" />
                              <span>{opcao}</span>
                            </label>
                          ))}
                        </div>
                      )}
                      
                      {campo.tipo === 'checkbox-multiple' && campo.opcoes && (
                        <div className="space-y-2">
                          {campo.opcoes.map((opcao, idx) => (
                            <label key={idx} className="flex items-center gap-2">
                              <input type="checkbox" className="text-blue-600 rounded" />
                              <span>{opcao}</span>
                            </label>
                          ))}
                        </div>
                      )}
                      
                      {campo.tipo === 'select' && campo.opcoes && (
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                          <option value="">Selecione uma opção</option>
                          {campo.opcoes.map((opcao, idx) => (
                            <option key={idx} value={opcao}>{opcao}</option>
                          ))}
                        </select>
                      )}
                    </div>
                  ))}
                </div>

                {secaoIndex < formData.secoes.length - 1 && (
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <button className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                      Continuar para a próxima seção →
                    </button>
                  </div>
                )}
              </div>
            ))}

            {formData.secoes.length > 0 && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <p className="text-green-800 font-medium">Formulário completo! Todas as seções foram configuradas.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Criar Novo Evento</h1>
            <p className="text-gray-600 text-lg">
              Configure o formulário de inscrição com seções/páginas exclusivas
            </p>
          </div>

          <div className="space-y-8">
            {/* Informações do Evento */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center mb-6">
                <div className="w-2 h-8 bg-indigo-600 rounded-full mr-3"></div>
                <h2 className="text-2xl font-bold text-gray-800">Informações do Evento</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nome do Evento <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="nomeEvento"
                    value={formData.nomeEvento}
                    onChange={handleInputChange}
                    placeholder="ex: Oficina de Robótica - Nina Rodrigues"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Departamento <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="departamento"
                    value={formData.departamento}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  >
                    <option value="">-- Selecione um departamento --</option>
                    {departamentos.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Data do Evento <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3.5 text-gray-400" size={20} />
                    <input
                      type="date"
                      name="dataEvento"
                      value={formData.dataEvento}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Hora de Início <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3.5 text-gray-400" size={20} />
                    <input
                      type="time"
                      name="horaInicio"
                      value={formData.horaInicio}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Hora de Fim <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3.5 text-gray-400" size={20} />
                    <input
                      type="time"
                      name="horaFim"
                      value={formData.horaFim}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Carga Horária
                  </label>
                  <input
                    type="text"
                    name="cargaHoraria"
                    value={formData.cargaHoraria}
                    onChange={handleInputChange}
                    placeholder="ex: 4 horas"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Vagas Disponíveis
                  </label>
                  <input
                    type="number"
                    name="vagas"
                    value={formData.vagas}
                    onChange={handleInputChange}
                    placeholder="ex: 25"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Descrição do Evento <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="descricao"
                    value={formData.descricao}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Descreva o evento, objetivos, público-alvo, requisitos..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-y"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Local do Evento <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3.5 text-gray-400" size={20} />
                    <input
                      type="text"
                      name="localEvento"
                      value={formData.localEvento}
                      onChange={handleInputChange}
                      placeholder="ex: Estação Tech de Nina Rodrigues, Rua 13 de dezembro, S/N"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Seções Personalizadas */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-2 h-8 bg-indigo-600 rounded-full mr-3"></div>
                  <h2 className="text-2xl font-bold text-gray-800">Seções do Formulário</h2>
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowPreview(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Eye size={20} />
                    Pré-visualizar
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowSectionModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Plus size={20} />
                    Nova Seção
                  </button>
                </div>
              </div>

              <p className="text-gray-600 mb-6">
                Cada seção será uma página exclusiva no formulário final. Adicione seções predefinidas ou crie customizadas.
              </p>

              {/* Seções Predefinidas */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Seções Predefinidas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {secoesPredefinidas.map((secao) => (
                    <div key={secao.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h4 className="font-semibold text-gray-800 mb-2">{secao.titulo}</h4>
                      <p className="text-sm text-gray-600 mb-3">{secao.descricao}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">
                          {secao.campos.length} campo(s)
                        </span>
                        <button
                          type="button"
                          onClick={() => addSecaoPredefinida(secao)}
                          className="flex items-center gap-1 px-3 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
                        >
                          <Copy size={14} />
                          Adicionar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Seções Configuradas */}
              {formData.secoes.length === 0 ? (
                <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
                  <Users className="mx-auto text-gray-400 mb-4" size={48} />
                  <p className="text-gray-500 text-lg">
                    Nenhuma seção configurada ainda.
                  </p>
                  <p className="text-gray-500">
                    Adicione seções predefinidas ou crie uma nova seção personalizada.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {formData.secoes.map((secao, index) => (
                    <div key={secao.id} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="inline-flex items-center justify-center w-8 h-8 bg-indigo-100 text-indigo-800 rounded-full text-sm font-semibold">
                              {index + 1}
                            </span>
                            <div>
                              <h3 className="font-semibold text-gray-800 text-lg">
                                {secao.titulo}
                              </h3>
                              {secao.descricao && (
                                <p className="text-gray-600 text-sm mt-1">{secao.descricao}</p>
                              )}
                            </div>
                          </div>
                          
                          <div className="ml-11">
                            <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                              <span className="inline-flex items-center">
                                <Users size={16} className="mr-1" />
                                {secao.campos.length} campo(s)
                              </span>
                              {secao.condicional && (
                                <span className="inline-flex items-center px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">
                                  Condicional
                                </span>
                              )}
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {secao.campos.slice(0, 4).map((campo) => (
                                <div key={campo.id} className="bg-gray-50 rounded-lg px-3 py-2 text-sm">
                                  <span className="font-medium text-gray-700">{campo.nome}</span>
                                  <span className="text-gray-500 ml-2">({campo.tipo})</span>
                                  {campo.obrigatorio && (
                                    <span className="text-red-500 ml-1">*</span>
                                  )}
                                </div>
                              ))}
                              {secao.campos.length > 4 && (
                                <div className="bg-gray-50 rounded-lg px-3 py-2 text-sm text-gray-500">
                                  +{secao.campos.length - 4} mais campos...
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-2 ml-4">
                          <div className="flex gap-1">
                            <button
                              type="button"
                              onClick={() => moverSecao(index, 'up')}
                              disabled={index === 0}
                              className="p-2 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              ↑
                            </button>
                            <button
                              type="button"
                              onClick={() => moverSecao(index, 'down')}
                              disabled={index === formData.secoes.length - 1}
                              className="p-2 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              ↓
                            </button>
                          </div>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => editSection(index)}
                              className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-medium"
                            >
                              Editar
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteSection(index)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Botão de Submissão */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading || formData.secoes.length === 0}
                className="w-full py-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Criando evento e formulário...
                  </>
                ) : (
                  `Criar Evento com ${formData.secoes.length} Seção${formData.secoes.length !== 1 ? 's' : ''}`
                )}
              </button>

              {formData.secoes.length === 0 && (
                <p className="text-center text-red-600 mt-3">
                  Adicione pelo menos uma seção ao formulário antes de criar o evento.
                </p>
              )}

              {/* Mensagens */}
              {message.text && (
                <div
                  className={`mt-4 p-4 rounded-lg flex items-center gap-3 ${
                    message.type === 'success'
                      ? 'bg-green-50 text-green-800 border border-green-200'
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}
                >
                  {message.type === 'success' ? (
                    <CheckCircle size={24} className="text-green-500" />
                  ) : (
                    <AlertCircle size={24} className="text-red-500" />
                  )}
                  <span className="font-semibold">{message.text}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Seção */}
      {showSectionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {editingIndex !== null ? 'Editar Seção' : 'Nova Seção Personalizada'}
              </h3>
              <p className="text-gray-600 mb-6">
                Configure os detalhes da seção e seus campos. Cada seção será uma página exclusiva no formulário.
              </p>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Título da Seção <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={currentSection.titulo}
                      onChange={(e) => setCurrentSection(prev => ({ ...prev, titulo: e.target.value }))}
                      placeholder="ex: Informações Pessoais"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Descrição da Seção (opcional)
                    </label>
                    <input
                      type="text"
                      value={currentSection.descricao}
                      onChange={(e) => setCurrentSection(prev => ({ ...prev, descricao: e.target.value }))}
                      placeholder="ex: Dados básicos do participante"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700">
                        Campos da Seção
                      </label>
                      <p className="text-sm text-gray-500 mt-1">
                        Configure os campos que aparecerão nesta página do formulário
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={addCampoToSection}
                      className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      <Plus size={16} />
                      Adicionar Campo
                    </button>
                  </div>

                  {currentSection.campos.length === 0 ? (
                    <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                      <Plus className="mx-auto text-gray-400 mb-2" size={32} />
                      <p className="text-gray-500">
                        Nenhum campo adicionado.
                      </p>
                      <p className="text-gray-500 text-sm">
                        Clique em "Adicionar Campo" para começar.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {currentSection.campos.map((campo, idx) => (
                        <div key={campo.id} className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                          <div className="flex items-start gap-4">
                            <div className="flex-1 space-y-3">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div>
                                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Nome do Campo
                                  </label>
                                  <input
                                    type="text"
                                    value={campo.nome}
                                    onChange={(e) => updateCampo(idx, 'nome', e.target.value)}
                                    placeholder="ex: Nome Completo"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                  />
                                </div>
                                
                                <div>
                                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Tipo de Campo
                                  </label>
                                  <select
                                    value={campo.tipo}
                                    onChange={(e) => updateCampo(idx, 'tipo', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                  >
                                    {tiposCampo.map(tipo => (
                                      <option key={tipo.value} value={tipo.value}>
                                        {tipo.label}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>

                              {/* Opções para campos de múltipla escolha */}
                              {(campo.tipo === 'radio' || campo.tipo === 'checkbox-multiple' || campo.tipo === 'select') && (
                                <div>
                                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Opções {campo.obrigatorio && <span className="text-red-500">*</span>}
                                  </label>
                                  <div className="space-y-2">
                                    {campo.opcoes?.map((opcao, opcaoIdx) => (
                                      <div key={opcaoIdx} className="flex items-center gap-2">
                                        <input
                                          type="text"
                                          value={opcao}
                                          onChange={(e) => {
                                            const novasOpcoes = [...(campo.opcoes || [])];
                                            novasOpcoes[opcaoIdx] = e.target.value;
                                            updateCampo(idx, 'opcoes', novasOpcoes);
                                          }}
                                          className="flex-1 px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                        <button
                                          type="button"
                                          onClick={() => removeOpcaoCampo(idx, opcaoIdx)}
                                          className="p-1 text-red-600 hover:bg-red-50 rounded"
                                        >
                                          <Trash2 size={16} />
                                        </button>
                                      </div>
                                    ))}
                                    <button
                                      type="button"
                                      onClick={() => addOpcaoCampo(idx, 'Nova opção')}
                                      className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
                                    >
                                      <Plus size={14} />
                                      Adicionar Opção
                                    </button>
                                  </div>
                                </div>
                              )}

                              <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={campo.obrigatorio}
                                    onChange={(e) => updateCampo(idx, 'obrigatorio', e.target.checked)}
                                    className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <span className="font-medium">Campo obrigatório</span>
                                </label>
                                
                                <button
                                  type="button"
                                  onClick={() => removeCampoFromSection(idx)}
                                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentSection({ id: '', titulo: '', descricao: '', campos: [] });
                    setShowSectionModal(false);
                    setEditingIndex(null);
                  }}
                  className="flex-1 px-4 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={saveSection}
                  className="flex-1 px-4 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  {editingIndex !== null ? 'Atualizar Seção' : 'Salvar Seção'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pré-visualização */}
      {showPreview && <PreviewFormulario />}
    </div>
  );
}