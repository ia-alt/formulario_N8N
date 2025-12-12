import type { FC } from "react";
import { Space, Layout } from "antd";
import { CabecalhoDaAcao } from "./components/cabecalho-da-acao";
import { InformacoesDaAcao } from "./components/informacoes-da-acao";
import { ListaDeInscritos } from "./components/lista-de-inscritos";

export const AcaoRender: FC = () => {
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
