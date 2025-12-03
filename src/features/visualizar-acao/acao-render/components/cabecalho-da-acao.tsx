import { Card, Row, Col, Statistic, Space, Tag, Typography } from "antd";
import type { FC } from "react";
import type { StatusAcao } from "../../types";
import { useVisualizarAcao } from "../../hook";
import { TeamOutlined, BookOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

// --- Helpers de UX ---
const getStatusTag = (status: StatusAcao) => {
  switch (status) {
    case "ATIVA":
      return <Tag color="success">ATIVA</Tag>;
    case "CONCLUIDA":
      return <Tag color="default">CONCLUÍDA</Tag>;
    case "CANCELADA":
      return <Tag color="error">CANCELADA</Tag>;
    default:
      return <Tag>{status}</Tag>;
  }
};

export const CabecalhoDaAcao: FC = () => {
  const { acao } = useVisualizarAcao();
  if (!acao) {
    return null;
  }
  return (
    <Card variant={"outlined"} style={{ marginBottom: 24 }}>
      <Row gutter={[16, 16]} align="middle" justify="space-between">
        <Col>
          <Space orientation="vertical" size={0}>
            <Space>
              {getStatusTag(acao.status)}
              <Text type="secondary">#{acao.id}</Text>
              <Tag color="blue">{acao.tipo}</Tag>
            </Space>
            <Title level={2} style={{ margin: "8px 0" }}>
              {acao.titulo}
            </Title>
            <Space>
              <BookOutlined /> <Text type="secondary">{acao.eixo}</Text>
            </Space>
          </Space>
        </Col>
        <Col>
          {/* Estatística rápida (KPI) */}
          <Statistic
            title="Total de Inscritos"
            value={acao.inscritos.length}
            prefix={<TeamOutlined />}
          />
        </Col>
      </Row>
    </Card>
  );
};
