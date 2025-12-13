import {
  Card,
  Row,
  Col,
  Statistic,
  Space,
  Tag,
  Typography,
  Button,
  Dropdown,
  type MenuProps,
  App,
} from "antd";
import type { FC } from "react";
import { useVisualizarAcao } from "../../hook";
import {
  TeamOutlined,
  BookOutlined,
  EllipsisOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import type { StatusAcao } from "../../../../shared/types";

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
  const { acao, cancelarAcao, finalizarAcao } = useVisualizarAcao();
  const { modal } = App.useApp();

  const onMenuClick: MenuProps["onClick"] = (e) => {
    console.log("click", e);
    if (!acao) return;
    switch (e.key) {
      case "concluir_acao":
        modal.confirm({
          title: "Concluir Ação",
          content: "Antes de prosseguir garanta que a Chamada foi feita.",
          cancelText: "Cancelar",
          okText: "Concluir",
          onOk: () => {
            finalizarAcao();
          },
          onCancel: () => {
            cancelarAcao();
          },
        });
        break;
      case "cancelar_acao":
        modal.confirm({
          title: "Cancelar Ação",
          content: "Você tem certeza que deseja cancelar esta ação?",
          cancelText: "Não, mudei de ideia",
          okText: "Sim, cancelar",
          onOk: () => {
            cancelarAcao();
          },
        });
        break;
    }
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
              {getStatusTag(acao.status)}
              <Tag color="blue">{acao.tipo}</Tag>
              <Text type="secondary">#{acao.id}</Text>
            </Space>
          </Space>
        </Col>
        <Col>
          <Space>
            <Button
              href={acao.linkGoogleCalendar}
              target="_blank"
              rel="noopener noreferrer"
            >
              <CalendarOutlined />
              Abrir no Calendar
            </Button>
            {acao?.status === "ATIVA" && (
              <Dropdown
                trigger={["click"]}
                menu={{
                  items: [
                    {
                      key: "concluir_acao",
                      label: "Concluir Ação",
                    },
                    {
                      key: "cancelar_acao",
                      label: "Cancelar Ação",
                      danger: true,
                    },
                  ],
                  onClick: onMenuClick,
                }}
                placement="bottomRight"
              >
                <Button icon={<EllipsisOutlined />}>Opções</Button>
              </Dropdown>
            )}
          </Space>
        </Col>
      </Row>
      <Row gutter={[16, 16]} align="middle" justify="space-between">
        <Col>
          <Space orientation="vertical" size={0}>
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
