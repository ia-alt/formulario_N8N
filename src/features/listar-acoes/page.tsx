import type { FC } from "react";
import { ListarAcoesProvider } from "./provider";
import { Button, Flex, Layout, Space, Typography } from "antd";
import { useListarAcoes } from "./hooks";
import { AcaoRender } from "./components/acao-render";
import { LineChartOutlined, PlusOutlined } from "@ant-design/icons";
export const ListarAcoesPage: FC = () => {
  return (
    <ListarAcoesProvider>
      <InnerListarAcoesPage />
    </ListarAcoesProvider>
  );
};

const InnerListarAcoesPage: FC = () => {
  const { acoes } = useListarAcoes();

  return (
    <Layout>
      <Layout.Content>
        <div
          style={{
            padding: "24px",
            maxWidth: "900px",
            margin: "0 auto",
            minHeight: "100vh",
          }}
        >
          <Flex
            justify="space-between"
            align="center"
            style={{ marginBottom: 24 }}
          >
            <Typography.Title>Ações SECTI</Typography.Title>
            <Space>
              <Button
                type="dashed"
                icon={<LineChartOutlined />}
                href={
                  "https://lookerstudio.google.com/reporting/9c19bb62-1b8b-4a72-928f-76a2fbb72be1"
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                Dashboard
              </Button>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                href={"/cadastrar"}
              >
                Cadastrar
              </Button>
            </Space>
          </Flex>

          <Flex orientation="vertical" gap={16}>
            {acoes.map((acao) => (
              <AcaoRender key={acao.id} acao={acao} />
            ))}
          </Flex>
        </div>
      </Layout.Content>
    </Layout>
  );
};
