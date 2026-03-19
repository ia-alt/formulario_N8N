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
  Card,
  AutoComplete,
  Row,
  Col,
  Flex,
  App,
  Spin,
  Radio,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useState, type FC } from "react";
import {
  cidadesMaranhao,
  departamentos,
  tiposDeAcao,
  publicosAlvos,
} from "./constants";
import { removeDiacritics } from "../../helpers/remove-diacritics";
import dayjs from "dayjs";
import { cadastrarAcaoService } from "./service";
import { useNavigate } from "react-router";
import { type DadosCadastroAcao } from "../../shared/acoes-secti-api";
import { env } from "../../env";

type FormData = Omit<
  DadosCadastroAcao,
  "data" | "horarioInicio" | "horarioFim" | "cidade"
> & {
  data: dayjs.Dayjs;
  horarioInicio: dayjs.Dayjs;
  horarioFim: dayjs.Dayjs;
  cidade: string | string[];
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
  eixosAuxiliares: [],
};

export const CadastrarAcaoPage: FC = () => {
  const [form] = Form.useForm<FormData>();
  const [carregando, setCarregando] = useState(false);
  const { message } = App.useApp();
  const navigate = useNavigate();

  const eixoSelecionado = Form.useWatch("eixo", form);
  const modalidade = Form.useWatch("modalidade", form);

  function onFinish(values: FormData) {
    setCarregando(true);
    const dados: DadosCadastroAcao = {
      ...values,
      data: values.data.format("YYYY-MM-DD"),
      horarioInicio: values.horarioInicio.format("HH:mm"),
      horarioFim: values.horarioFim.format("HH:mm"),
      cidade: Array.isArray(values.cidade)
        ? values.cidade.join(",")
        : values.cidade,
    };
    cadastrarAcaoService
      .cadastrarAcao(dados)
      .then(({ id }) => {
        message.success("Ação registrada com sucesso!");
        setCarregando(false);
        window.open(`/acoes/${id}`, "_blank", "noopener,noreferrer");
        navigate("/");
      })
      .catch((e) => {
        message.error("Erro ao registrar ação!");
        console.log(e);
        setCarregando(false);
      });
  }

  return (
    <Layout>
      <Layout.Content>
        <div style={{ padding: "24px", maxWidth: "900px", margin: "0 auto" }}>
          <Flex orientation="horizontal" gap={"large"} align="center" style={{ marginBottom: "24px" }}>
            <Button type="text" onClick={() => navigate("/")}>
              <ArrowLeftOutlined />
            </Button>
            <Typography.Title style={{ margin: 0 }}>Registrar Ação</Typography.Title>
          </Flex>
          <Spin spinning={carregando} fullscreen tip="Registrando ação..." size="large" />
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
                      label="Eixo Responsável"
                      rules={[{ required: true, message: "Obrigatório" }]}
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
                  <Col md={18}>
                    <Form.Item<FormData>
                      name="eixosAuxiliares"
                      label="Eixos Auxiliares"
                    >
                      <Select
                        mode="multiple"
                        placeholder="Selecione os eixos que auxiliaram (opcional)"
                        options={departamentos
                          .filter((d) => d !== eixoSelecionado)
                          .map((d) => ({ label: d, value: d }))}
                      />
                    </Form.Item>
                  </Col>
                  <Col md={6}>
                    <Form.Item<FormData>
                      name="quantidadeImpactados"
                      label="Qtd. de Impactadas"
                      rules={[{ required: true, message: "Obrigatório" }]}
                    >
                      <InputNumber precision={0} min={0} style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>

              <Card title="Local, Data e Horário">
                <Row gutter={16}>
                  <Col md={24}>
                    <Form.Item name="modalidade" initialValue="presencial">
                      <Radio.Group
                        onChange={(e) => {
                          if (e.target.value === "remota") {
                            form.setFieldsValue({ local: "Remoto", cidade: [] });
                          } else {
                            form.setFieldsValue({ local: undefined, cidade: undefined });
                          }
                        }}
                      >
                        <Radio value="presencial">Presencial</Radio>
                        <Radio value="remota">Remota</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                  <Col md={modalidade === "remota" ? 8 : 18}>
                    <Form.Item<FormData>
                      name="local"
                      label="Local"
                      rules={[{ required: true }]}
                    >
                      <Input
                        disabled={modalidade === "remota"}
                        placeholder="Ex.: Estação Tech Nina Rodrigues, IEMA Tamancão"
                      />
                    </Form.Item>
                  </Col>
                  <Col md={modalidade === "remota" ? 16 : 6}>
                    <Form.Item<FormData>
                      name="cidade"
                      label={modalidade === "remota" ? "Municípios Abrangidos" : "Cidade"}
                      rules={[{ required: true, message: "Obrigatório" }]}
                    >
                      {modalidade === "remota" ? (
                        <Select
                          mode="multiple"
                          placeholder="Selecione os municípios"
                          showSearch={{
                            filterOption: (input, option) =>
                              removeDiacritics(
                                (option?.label ?? "").toLowerCase()
                              ).includes(removeDiacritics(input.toLowerCase())),
                          }}
                          options={cidadesMaranhao.map((c) => ({
                            label: c,
                            value: c,
                          }))}
                        />
                      ) : (
                        <Select
                          showSearch={{
                            filterOption: (input, option) =>
                              removeDiacritics(
                                (option?.label ?? "").toLowerCase()
                              ).includes(removeDiacritics(input.toLowerCase())),
                          }}
                          placeholder="Selecione uma cidade"
                          options={cidadesMaranhao.map((c) => ({
                            label: c,
                            value: c,
                          }))}
                        />
                      )}
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

              <Flex justify="center" align="center">
                <Button type="primary" htmlType="submit" loading={carregando}>
                  Registrar
                </Button>
              </Flex>
            </Space>
          </Form>
        </div>
      </Layout.Content>
    </Layout>
  );
};
