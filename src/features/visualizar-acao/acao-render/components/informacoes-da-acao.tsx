import { Card, Descriptions } from "antd";
import type { FC } from "react";
import { useVisualizarAcao } from "../../hook";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const InformacoesDaAcao: FC = () => {
  const { acao } = useVisualizarAcao();
  if (!acao) {
    return null;
  }
  return (
    <>
      <Card>
        <Descriptions column={{ xs: 1, sm: 2 }} layout="vertical">
          <Descriptions.Item
            label={
              <span>
                <CalendarOutlined /> Data
              </span>
            }
          >
            {formatDate(acao.data)}
          </Descriptions.Item>

          <Descriptions.Item
            label={
              <span>
                <ClockCircleOutlined /> Horário
              </span>
            }
          >
            {acao.horarioInicio} às {acao.horarioFim} ({acao.cargaHoraria})
          </Descriptions.Item>

          <Descriptions.Item
            label={
              <span>
                <EnvironmentOutlined /> Local
              </span>
            }
            span={2}
          >
            {acao.local} - {acao.municipio}-MA
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </>
  );
};
