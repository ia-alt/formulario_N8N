import { Layout, Form, Input, Button, Card, Typography, Flex, App } from "antd";
import { type FC, useState } from "react";
import { useNavigate } from "react-router";
import { loginService } from "./service";
import type { DadosLogin } from "../../shared/acoes-secti-api";

const { Title } = Typography;
const { Content } = Layout;

export const LoginPage: FC = () => {
  const [loading, setLoading] = useState(false);
  const { message } = App.useApp();
  const navigate = useNavigate();

  const onFinish = async (values: { usuario: string; senha: string }) => {
    setLoading(true);
    try {
      const dados: DadosLogin = {
        usuario: values.usuario,
        senha: values.senha,
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

              <Form layout="vertical" onFinish={onFinish} autoComplete="off">
                <Form.Item
                  label="Usuário"
                  name="usuario"
                  rules={[
                    {
                      required: true,
                      message: "Por favor, insira seu Usuário!",
                    },
                  ]}
                >
                  <Input placeholder="Usuário" />
                </Form.Item>

                <Form.Item
                  label="Senha"
                  name="senha"
                  rules={[
                    {
                      required: true,
                      message: "Por favor, insira sua senha!",
                    },
                  ]}
                >
                  <Input placeholder="Senha" type={"password"} />
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
