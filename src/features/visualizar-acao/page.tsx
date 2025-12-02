import { useParams } from "react-router";
import { VisualizarAcaoProvider } from "./provider";
import { useVisualizarAcao } from "./hook";
import { AcaoRender } from "./acao-render";
import type { FC } from "react";

export default function VisualizarAcaoPage() {
  const id = (useParams() as { id: string }).id;
  const idNumber = parseInt(id);
  console.log(idNumber);
  return (
    <VisualizarAcaoProvider id={idNumber}>
      <InnerVisualizarAcaoPage />
    </VisualizarAcaoProvider>
  );
}

const InnerVisualizarAcaoPage: FC = () => {
  const { acao, carregando } = useVisualizarAcao();
  if (carregando) {
    return <div>Carregando...</div>;
  }
  if (!acao) {
    return <div>Ação não encontrada</div>;
  }
  return <AcaoRender acao={acao} />;
};
