import {
  Layout,
  Form,
  Input,
  Button,
  Card,
  Typography,
  Flex,
  App,
} from "antd";
import { type FC, useState } from "react";
import { useNavigate } from "react-router";
import { loginService } from "./service";
import type { DadosLogin } from "../../shared/acoes-secti-api";

const { Title } = Typography;
const { Content } = Layout;

const formatCPF = (value: string) => {
  const numeric = value.replace(/\D/g, "").slice(0, 11);
  return numeric
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
};

const formatDate = (value: string) => {
  const numeric = value.replace(/\D/g, "").slice(0, 8);
  return numeric
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{2})\/(\d{2})(\d)/, "$1/$2/$3");
};

export const LoginPage: FC = () => {
  const [loading, setLoading] = useState(false);
  const { message } = App.useApp();
  const navigate = useNavigate();

  const onFinish = async (values: { cpf: string; dataNascimento: string }) => {
    setLoading(true);
    try {
      const dados: DadosLogin = {
        cpf: values.cpf.replace(/\D/g, ""), 
        dataNascimento: values.dataNascimento,
      };

      const response = await loginService.login(dados);

      if (response.success && response.token) {
        localStorage.setItem("token", response.token);
        message.success(response.message || "Login realizado com sucesso!");
        navigate("/"); // Redireciona para a home/lista
      } else {
        message.error(response.message || "Falha no login");
      }
    } catch (error) {
      const err = error as Error;
      message.error(err.message || "Erro ao realizar login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content>
        <Flex justify="center" align="center" style={{ minHeight: "100vh" }}>
          <Card style={{ width: 400, maxWidth: "90%" }}>
            <Flex vertical gap="middle">
              <Title level={3} style={{ textAlign: "center" }}>
                Acesso ao Sistema
              </Title>

              <Form
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
              >
                <Form.Item
                  label="CPF"
                  name="cpf"
                  rules={[
                    { required: true, message: "Por favor, insira seu CPF!" },
                    { min: 14, message: "CPF incompleto" },
                  ]}
                  getValueFromEvent={(e) => formatCPF(e.target.value)}
                >
                  <Input placeholder="000.000.000-00" maxLength={14} />
                </Form.Item>

                <Form.Item
                  label="Data de Nascimento"
                  name="dataNascimento"
                  rules={[
                    {
                      required: true,
                      message: "Por favor, insira sua data de nascimento!",
                    },
                    { min: 10, message: "Data incompleta (DD/MM/AAAA)" },
                  ]}
                  getValueFromEvent={(e) => formatDate(e.target.value)}
                >
                  <Input placeholder="DD/MM/AAAA" maxLength={10} />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    loading={loading}
                  >
                    Entrar
                  </Button>
                </Form.Item>
              </Form>
            </Flex>
          </Card>
        </Flex>
      </Content>
    </Layout>
  );
};
