import type { FC } from "react";
import { Space, Layout, Button, Flex, Typography } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { CabecalhoDaAcao } from "./components/cabecalho-da-acao";
import { InformacoesDaAcao } from "./components/informacoes-da-acao";
import { ListaDeInscritos } from "./components/lista-de-inscritos";

export const AcaoRender: FC = () => {
  const navigate = useNavigate();
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
            orientation="horizontal"
            gap={"large"}
            align="center"
            style={{ marginBottom: "24px" }}
          >
            <Button type="text" onClick={() => navigate("/")}>
              <ArrowLeftOutlined />
            </Button>
            <Typography.Title level={3} style={{ margin: 0 }}>
              Visualizar Ação
            </Typography.Title>
          </Flex>

          <CabecalhoDaAcao />

          <Space
            orientation="vertical"
            size="middle"
            style={{ display: "flex" }}
          >
            <InformacoesDaAcao />

            <ListaDeInscritos />
          </Space>
        </div>
      </Layout.Content>
    </Layout>
  );
};
