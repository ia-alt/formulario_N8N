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
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import type { FC } from "react";
import {
  cidadesMaranhao,
  departamentos,
  camposPadroes,
  tiposCampo,
  tiposDeAcao,
  publicosAlvos,
} from "./constants";
import { removeDiacritics } from "../../helpers/remove-diacritics";

export const CadastrarAcaoPage: FC = () => {
  return (
    <Layout>
      <Layout.Content>
        <div style={{ padding: "24px", maxWidth: "900px", margin: "0 auto" }}>
          <Typography.Title>Cadastrar Ação</Typography.Title>

          <Form layout="vertical">
            <Space orientation="vertical" size={"large"}>
              <Card>
                <Row gutter={16}>
                  <Col md={24}>
                    <Form.Item
                      label="Nome da Ação"
                      rules={[{ required: true, message: "Obrigatório" }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col md={6}>
                    <Form.Item label="Tipo">
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
                    <Form.Item
                      label="Público Alvo"
                      help="Selecione ou digite um novo"
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
                    <Form.Item label="Eixo">
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
                    <Form.Item label="Carga Horária" help="Em horas">
                      <InputNumber precision={0} mode="spinner" />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>

              <Card title="Local, Data e Horário">
                <Row gutter={16}>
                  <Col md={18}>
                    <Form.Item label="Local">
                      <Input placeholder="Ex.: Estação Tech Nina Rodrigues, IEMA Tamancão" />
                    </Form.Item>
                  </Col>
                  <Col md={6}>
                    <Form.Item label="Cidade">
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
                    <Form.Item label="Data">
                      <DatePicker
                        style={{ width: "100%" }}
                        format={"DD/MM/YYYY"}
                      />
                    </Form.Item>
                  </Col>
                  <Col md={8}>
                    <Form.Item label="Horário de Início">
                      <TimePicker style={{ width: "100%" }} format={"HH:mm"} />
                    </Form.Item>
                  </Col>
                  <Col md={8}>
                    <Form.Item label="Horário de Término">
                      <TimePicker style={{ width: "100%" }} format={"HH:mm"} />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>

              <Card title={"Campos para o formulário de inscrição"}>
                <Form.List
                  name="campos"
                  initialValue={[
                    ...camposPadroes.obrigatorios,
                    ...camposPadroes.naoObrigatorios,
                  ]}
                >
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <Space
                          key={key}
                          style={{ display: "flex", marginBottom: 8 }}
                          align="baseline"
                        >
                          <Form.Item
                            {...restField}
                            name={[name, "nome"]}
                            rules={[{ required: true, message: "Obrigatório" }]}
                          >
                            <Input
                              placeholder="Nome do Campo"
                              disabled={key < camposPadroes.obrigatorios.length}
                            />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, "tipo"]}
                            rules={[{ required: true, message: "Obrigatório" }]}
                          >
                            <Select
                              style={{ minWidth: 200 }}
                              placeholder="Tipo"
                              options={tiposCampo}
                              disabled={key < camposPadroes.obrigatorios.length}
                            />
                          </Form.Item>
                          <Form.Item
                            name={[name, "obrigatorio"]}
                            valuePropName="checked"
                            label={""}
                          >
                            <Checkbox
                              disabled={key < camposPadroes.obrigatorios.length}
                            >
                              Obrigatório
                            </Checkbox>
                          </Form.Item>
                          <MinusCircleOutlined onClick={() => remove(name)} />
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
                <Button type="primary" htmlType="submit">
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
