import {
  Card,
  Row,
  Col,
  Statistic,
  Space,
  Tag,
  Typography,
  Button,
  App,
} from "antd";
import { type FC } from "react";
import { useVisualizarAcao } from "../../hook";
import {
  TeamOutlined,
  BookOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

export const CabecalhoDaAcao: FC = () => {
  const { acao, cancelarAcao } = useVisualizarAcao();
  const { modal } = App.useApp();

  const onCancelar = () => {
    modal.confirm({
      title: "Cancelar Ação",
      content: "Você tem certeza que deseja cancelar esta ação?",
      cancelText: "Não",
      okText: "Sim, cancelar",
      onOk: () => {
        cancelarAcao();
      },
    });
  };

  if (!acao) {
    return null;
  }
  return (
    <Card variant={"outlined"} style={{ marginBottom: 24 }}>
      <Row gutter={[16, 16]} align="middle" justify="space-between">
        <Col>
          <Space orientation="vertical" size={0}>
            <Space>
              <Tag color="blue">{acao.tipo}</Tag>
              <Text type="secondary">#{acao.id}</Text>
            </Space>
          </Space>
        </Col>
        <Col>
          <Space>
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={onCancelar}
            />
          </Space>
        </Col>
      </Row>
      <Row gutter={[16, 16]} align="middle" justify="space-between">
        <Col>
          <Space direction="vertical" size={2}>
            <Title level={2} style={{ margin: "8px 0" }}>
              {acao.titulo}
            </Title>
            {acao.eixo && (
              <Space direction="vertical" size={0}>
                <Text type="secondary" style={{ fontSize: 11 }}>Eixo Principal</Text>
                <Space>
                  <BookOutlined />
                  <Text type="secondary">{acao.eixo}</Text>
                </Space>
              </Space>
            )}
            {acao.eixos_auxiliares && (
              <Space direction="vertical" size={0}>
                <Text type="secondary" style={{ fontSize: 11 }}>Eixos Auxiliares</Text>
                <Space wrap>
                  {acao.eixos_auxiliares.split(",").map((e) => (
                    <Tag key={e.trim()}>{e.trim()}</Tag>
                  ))}
                </Space>
              </Space>
            )}
          </Space>
        </Col>
        <Col>
          <Statistic
            title="Impactados Diretamente"
            value={acao.impactadosDiretamente ?? acao.inscritos.length}
            prefix={<TeamOutlined />}
          />
        </Col>
      </Row>
    </Card>
  );
};
