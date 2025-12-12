import { useParams } from "react-router";
import { VisualizarAcaoProvider } from "./provider";
import { useVisualizarAcao } from "./hook";
import { AcaoRender } from "./acao-render";
import type { FC } from "react";
import { Flex, Spin, Typography } from "antd";

export default function VisualizarAcaoPage() {
  const id = (useParams() as { id: string }).id;
  return (
    <VisualizarAcaoProvider id={id}>
      <InnerVisualizarAcaoPage />
    </VisualizarAcaoProvider>
  );
}

const InnerVisualizarAcaoPage: FC = () => {
  const { acao, carregando } = useVisualizarAcao();
  if (carregando) {
    return (
      <Flex
        justify="center"
        align="center"
        orientation="vertical"
        gap={16}
        style={{ height: "100vh" }}
      >
        <Spin />
        <Typography.Text>Carregando...</Typography.Text>
      </Flex>
    );
  }
  if (!acao) {
    return <div>Ação não encontrada</div>;
  }
  return <AcaoRender />;
};
