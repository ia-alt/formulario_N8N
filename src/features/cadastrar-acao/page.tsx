import {
  Layout,
  Typography,
  DatePicker,
  Form,
  TimePicker,
  Input,
  Select,
  InputNumber,
  Space,
  Button,
  Checkbox,
  Card,
  AutoComplete,
  Row,
  Col,
  Flex,
  App,
  Spin,
  Radio,
  Tooltip,
} from "antd";
import { ArrowLeftOutlined, MinusCircleOutlined, PlusOutlined, SearchOutlined, CheckCircleOutlined, CloseCircleOutlined, QuestionCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import { useState, type FC } from "react";
import {
  cidadesMaranhao,
  departamentos,
  camposPadroes,
  tiposCampo,
  tiposDeAcao,
  publicosAlvos,
} from "./constants";
import { removeDiacritics } from "../../helpers/remove-diacritics";
import dayjs from "dayjs";
import { cadastrarAcaoService } from "./service";
import { useNavigate } from "react-router";
import { acoesSectiApi, type DadosCadastroAcao, type FormularioInfo } from "../../shared/acoes-secti-api";
import { env } from "../../env";

type FormData = Omit<
  DadosCadastroAcao,
  "data" | "horarioInicio" | "horarioFim"
> & {
  data: dayjs.Dayjs;
  horarioInicio: dayjs.Dayjs;
  horarioFim: dayjs.Dayjs;
};

const initial: Partial<FormData> = {
  ...(env.appEnv === "dev"
    ? {
        nome: "Evento X",
        tipo: "Palestra",
        publicoAlvo: "Alunos",
        eixo: "Eixo Inteligência Artificial",
        cargaHoraria: 2,
        local: "Estação Tech Nina Rodrigues, IEMA Tamancão",
        cidade: "São Luís",
        data: dayjs(),
        horarioInicio: dayjs().set("hour", 10).set("minute", 0),
        horarioFim: dayjs().set("hour", 12).set("minute", 0),
      }
    : {}),

  camposFormularioInscricao: [
    ...camposPadroes.obrigatorios,
    ...camposPadroes.naoObrigatorios,
  ],
};

export const CadastrarAcaoPage: FC = () => {
  const [form] = Form.useForm<FormData>();
  const [carregando, setCarregando] = useState(false);
  const [verificandoUrl, setVerificandoUrl] = useState(false);
  const [verificationInfo, setVerificationInfo] = useState<FormularioInfo | null>(null);
  const [formularioInscricaoMode, setFormularioInscricaoMode] = useState<'url' | 'campos'>('campos');
  const { message } = App.useApp();
  const navigate = useNavigate();

  function onFinish(values: FormData) {
    setCarregando(true);
    const { camposFormularioInscricao, formularioInscricaoUrl, ...otherValues } = values;
    const dados: DadosCadastroAcao = {
      ...otherValues,
      data: values.data.format("YYYY-MM-DD"),
      horarioInicio: values.horarioInicio.format("HH:mm"),
      horarioFim: values.horarioFim.format("HH:mm"),
      ...(
        formularioInscricaoMode === 'url'
          ? { formularioInscricaoUrl: formularioInscricaoUrl! }
          : { camposFormularioInscricao: camposFormularioInscricao! }
      )
    };
    console.log(dados);
    cadastrarAcaoService
      .cadastrarAcao(dados)
      .then(({ id }) => {
        message.success("Ação cadastrada com sucesso!");
        console.log("Sucesso. Id:", id);
        setCarregando(false);
        window.open(`/acoes/${id}`, "_blank", "noopener,noreferrer");
        navigate("/");
      })
      .catch((e) => {
        message.error("Erro ao cadastrar ação!");
        console.log(e);
        setCarregando(false);
      });
  }

  function handleFormularioInscricaoModeChange(value: 'url' | 'campos') {
    setFormularioInscricaoMode(value);
    setVerificationInfo(null);
    form.resetFields(['formularioInscricaoUrl', 'camposFormularioInscricao']);
  }

  async function handleVerificarUrl() {
    const url = form.getFieldValue("formularioInscricaoUrl");
    if (!url) {
      message.warning("Por favor, insira a URL do formulário.");
      return;
    }

    setVerificandoUrl(true);
    setVerificationInfo(null);
    try {
      const info = await acoesSectiApi.verificaGoogleForms(url);
      setVerificationInfo(info);
      
      if (info.temAcessoForm && 'temPlanilhaVinculada' in info && info.temPlanilhaVinculada && 'temAcessoPlanilhaRespostas' in info && info.temAcessoPlanilhaRespostas) {
         message.success("Formulário verificado com sucesso!");
      } else {
         message.warning("Verifique os itens pendentes no checklist.");
      }

    } catch (error) {
      console.error(error);
      message.error("Erro ao verificar o formulário. Tente novamente.");
    } finally {
      setVerificandoUrl(false);
    }
  }

  const getChecklistIcon = (step: 1 | 2 | 3) => {
    if (verificandoUrl) return <LoadingOutlined />;
    
    let status: 'pending' | 'success' | 'error' | 'blocked' = 'pending';

    if (!verificationInfo) {
      status = 'pending';
    } else {
       if (step === 1) {
          status = verificationInfo.temAcessoForm ? 'success' : 'error';
       } else if (step === 2) {
          if (!verificationInfo.temAcessoForm) status = 'blocked';
          else status = verificationInfo.temPlanilhaVinculada ? 'success' : 'error';
       } else if (step === 3) {
          if (!verificationInfo.temAcessoForm || !('temPlanilhaVinculada' in verificationInfo) || !verificationInfo.temPlanilhaVinculada) status = 'blocked';
          else status = verificationInfo.temAcessoPlanilhaRespostas ? 'success' : 'error';
       }
    }

    switch (status) {
      case 'success': return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
      case 'error': return <CloseCircleOutlined style={{ color: '#ff4d4f' }} />;
      case 'blocked': return <MinusCircleOutlined style={{ color: '#d9d9d9' }} />;
      case 'pending': default: return <QuestionCircleOutlined style={{ color: '#d9d9d9' }} />;
    }
  };

  return (
    <Layout>
      <Layout.Content>
        <div style={{ padding: "24px", maxWidth: "900px", margin: "0 auto" }}>
          <Flex orientation="horizontal" gap={"large"} align="center"  style={{ marginBottom: "24px" }}>
            <Button type="text" onClick={() => navigate("/")}>
              <ArrowLeftOutlined />
            </Button>
            <Typography.Title style={{ margin: 0 }}>Cadastrar Ação</Typography.Title>
          </Flex>
          <Spin spinning={carregando} fullscreen tip="Cadastrando ação..." size="large" />
          <Form
            layout="vertical"
            form={form}
            onFinish={onFinish}
              initialValues={initial}
              onFinishFailed={(e) => console.log(e)}
            >
              <Space orientation="vertical" size={"large"}>
                <Card>
                  <Row gutter={16}>
                    <Col md={24}>
                      <Form.Item<FormData>
                        name="nome"
                        label="Nome da Ação"
                        rules={[{ required: true, message: "Obrigatório" }]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col md={6}>
                      <Form.Item<FormData>
                        name="tipo"
                        label="Tipo"
                        rules={[{ required: true, message: "Obrigatório" }]}
                      >
                        <Select>
                          {tiposDeAcao.map((tipo) => (
                            <Select.Option key={tipo} value={tipo}>
                              {tipo}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col md={6}>
                      <Form.Item<FormData>
                        name="publicoAlvo"
                        label="Público Alvo"
                        help="Selecione ou digite um novo"
                        rules={[{ required: true }]}
                      >
                        <AutoComplete
                          options={publicosAlvos}
                          placeholder=""
                          showSearch={{
                            filterOption: (inputValue, option) =>
                              option!.value
                                .toUpperCase()
                                .includes(inputValue.toUpperCase()),
                          }}
                        />
                      </Form.Item>
                    </Col>

                    <Col md={6}>
                      <Form.Item<FormData>
                        name="eixo"
                        label="Eixo"
                        rules={[{ required: true }]}
                      >
                        <Select>
                          {departamentos.map((eixo) => (
                            <Select.Option key={eixo} value={eixo}>
                              {eixo}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col md={6}>
                      <Form.Item<FormData>
                        name="cargaHoraria"
                        label="Carga Horária"
                        help="Em horas"
                        rules={[{ required: true }]}
                      >
                        <InputNumber precision={0} mode="spinner" min={1} />
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>

                <Card title="Local, Data e Horário">
                  <Row gutter={16}>
                    <Col md={18}>
                      <Form.Item<FormData>
                        name="local"
                        label="Local"
                        rules={[{ required: true }]}
                      >
                        <Input placeholder="Ex.: Estação Tech Nina Rodrigues, IEMA Tamancão" />
                      </Form.Item>
                    </Col>
                    <Col md={6}>
                      <Form.Item<FormData>
                        name="cidade"
                        label="Cidade"
                        rules={[{ required: true }]}
                      >
                        <Select
                          showSearch={{
                            filterOption: (input, option) =>
                              removeDiacritics(
                                (option?.label ?? "").toLowerCase()
                              ).includes(removeDiacritics(input.toLowerCase())),
                          }}
                          placeholder="Selecione uma cidade"
                          options={cidadesMaranhao.map((cidade) => ({
                            label: cidade,
                            value: cidade,
                          }))}
                        />
                      </Form.Item>
                    </Col>
                    <Col md={8}>
                      <Form.Item<FormData>
                        name="data"
                        label="Data"
                        rules={[{ required: true }]}
                      >
                        <DatePicker
                          style={{ width: "100%" }}
                          format={"DD/MM/YYYY"}
                        />
                      </Form.Item>
                    </Col>
                    <Col md={8}>
                      <Form.Item<FormData>
                        name="horarioInicio"
                        label="Horário de Início"
                        rules={[{ required: true }]}
                      >
                        <TimePicker
                          style={{ width: "100%" }}
                          format={"HH:mm"}
                        />
                      </Form.Item>
                    </Col>
                    <Col md={8}>
                      <Form.Item<FormData>
                        name="horarioFim"
                        label="Horário de Término"
                        rules={[{ required: true }]}
                      >
                        <TimePicker
                          style={{ width: "100%" }}
                          format={"HH:mm"}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>

                <Card title="Configuração da Inscrição">
                  <Form.Item label="Tipo de formulário de inscrição">
                    <Radio.Group
                      value={formularioInscricaoMode}
                      onChange={(e) => handleFormularioInscricaoModeChange(e.target.value)}
                      optionType="button"
                      buttonStyle="solid"
                    >
                      <Radio.Button value="campos">Criar Novo Formulário</Radio.Button>
                      <Radio.Button value="url">Usar Formulário Existente</Radio.Button>
                    </Radio.Group>
                  </Form.Item>
                </Card>
                
                
                {formularioInscricaoMode === 'url' && (
                  <Card title={"URL do formulário de inscrição"}>
                    
                    

                    <Form.Item<FormData>
                      name="formularioInscricaoUrl"
                      label="URL do formulário de inscrição"
                      rules={[{ required: true }]}
                    >
                      <Space.Compact style={{ width: "100%" }}>
                        <Input />
                        <Button type="default" icon={<SearchOutlined />} loading={verificandoUrl} onClick={handleVerificarUrl}>Verificar</Button>
                      </Space.Compact>
                    </Form.Item>
                      <strong>Verificações: </strong>
                    <Flex gap="small" vertical style={{paddingLeft: 12}}>
                      <Tooltip title="O formulário deve ser público ou compartilhado com ia@secti2.ma.gov.br">
                        <Space>
                          {getChecklistIcon(1)} <span>Acesso ao formulário</span>
                        </Space>
                      </Tooltip>
                      <Tooltip title="O formulário deve ter uma planilha de respostas associada">
                        <Space>
                          {getChecklistIcon(2)} <span>Planilha vinculada</span>
                        </Space>
                      </Tooltip>
                      <Tooltip title="A planilha deve ser pública ou compartilhada com ia@secti2.ma.gov.br">
                        <Space>
                          {getChecklistIcon(3)} <span>Acesso à planilha</span>
                        </Space>
                      </Tooltip>
                    </Flex>
                  </Card>
                )}

                {formularioInscricaoMode === 'campos' && (
                  <Card title={"Campos para o formulário de inscrição"}>
                  <Form.List name="camposFormularioInscricao">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...restField }) => (
                          <Space
                            key={key}
                            style={{ display: "flex", marginBottom: 8 }}
                            align="baseline"
                          >
                            <Form.Item<FormData["camposFormularioInscricao"]>
                              {...restField}
                              name={[name, "nome"]}
                              rules={[
                                { required: true, message: "Obrigatório" },
                              ]}
                            >
                              <Input
                                placeholder="Nome do Campo"
                                disabled={
                                  key < camposPadroes.obrigatorios.length
                                }
                              />
                            </Form.Item>
                            <Form.Item<FormData["camposFormularioInscricao"]>
                              {...restField}
                              name={[name, "tipo"]}
                              rules={[
                                { required: true, message: "Obrigatório" },
                              ]}
                            >
                              <Select
                                style={{ minWidth: 200 }}
                                placeholder="Tipo"
                                options={tiposCampo}
                                disabled={
                                  key < camposPadroes.obrigatorios.length
                                }
                              />
                            </Form.Item>
                            <Form.Item<FormData["camposFormularioInscricao"]>
                              name={[name, "obrigatorio"]}
                              valuePropName="checked"
                              label={""}
                            >
                              <Checkbox
                                disabled={
                                  key < camposPadroes.obrigatorios.length
                                }
                              >
                                Obrigatório
                              </Checkbox>
                            </Form.Item>
                            {key >= camposPadroes.obrigatorios.length && (
                              <MinusCircleOutlined
                                onClick={() => remove(name)}
                              />
                            )}
                          </Space>
                        ))}
                        <Form.Item>
                          <Button
                            type="dashed"
                            onClick={() => add()}
                            block
                            icon={<PlusOutlined />}
                          >
                            Adicionar Campo
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                </Card>
                )}
                <Flex justify="center" align="center">
                  <Button disabled={formularioInscricaoMode === 'url' && (!verificationInfo?.temAcessoForm || !verificationInfo?.temPlanilhaVinculada || !verificationInfo?.temAcessoPlanilhaRespostas)} type="primary" htmlType="submit" loading={carregando}>
                    Cadastrar
                  </Button>
                </Flex>
              </Space>
            </Form>
        </div>
      </Layout.Content>
    </Layout>
  );
};
