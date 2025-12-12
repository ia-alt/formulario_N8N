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
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
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
import type { DadosCadastroAcao } from "./types";
import { cadastrarAcaoService } from "./service";
import { useNavigate } from "react-router";

type FormData = Omit<
  DadosCadastroAcao,
  "data" | "horarioInicio" | "horarioFim"
> & {
  data: dayjs.Dayjs;
  horarioInicio: dayjs.Dayjs;
  horarioFim: dayjs.Dayjs;
};

const initial: Partial<FormData> = {
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

  camposFormularioInscricao: [
    ...camposPadroes.obrigatorios,
    ...camposPadroes.naoObrigatorios,
  ],
};

export const CadastrarAcaoPage: FC = () => {
  const [form] = Form.useForm<FormData>();
  const [carregando, setCarregando] = useState(false);
  const { message } = App.useApp();
  const navigate = useNavigate();

  function onFinish(values: FormData) {
    setCarregando(true);
    const dados: DadosCadastroAcao = {
      ...values,
      data: values.data.format("YYYY-MM-DD"),
      horarioInicio: values.horarioInicio.format("HH:mm"),
      horarioFim: values.horarioFim.format("HH:mm"),
    };
    console.log(dados);
    cadastrarAcaoService
      .cadastrarAcao(dados)
      .then(({ id }) => {
        message.success("Ação cadastrada com sucesso!");
        console.log("Sucesso. Id:", id);
        setCarregando(false);
        navigate("/acoes/" + id);
      })
      .catch((e) => {
        message.error("Erro ao cadastrar ação!");
        console.log(e);
        setCarregando(false);
      });
  }

  return (
    <Layout>
      <Layout.Content>
        <div style={{ padding: "24px", maxWidth: "900px", margin: "0 auto" }}>
          <Typography.Title>Cadastrar Ação</Typography.Title>

          <Spin spinning={carregando}>
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
                <Flex justify="center" align="center">
                  <Button type="primary" htmlType="submit" loading={carregando}>
                    Cadastrar
                  </Button>
                </Flex>
              </Space>
            </Form>
          </Spin>
        </div>
      </Layout.Content>
    </Layout>
  );
};
