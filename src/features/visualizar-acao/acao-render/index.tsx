import type { FC } from "react";
import type { Acao, Inscrito, StatusAcao } from "../types";
import {
  Card,
  Descriptions,
  Tag,
  Typography,
  Table,
  Space,
  Statistic,
  Row,
  Col,
  Badge,
  Layout,
  type TableColumnsType,
  Button,
} from "antd";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  TeamOutlined,
  BookOutlined,
  LinkOutlined,
  BarsOutlined,
} from "@ant-design/icons";

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

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const AcaoRender: FC<{ acao: Acao }> = ({ acao }) => {
  const { Title, Paragraph, Text } = Typography;

  // Definição das colunas da tabela de inscritos
  const columns: TableColumnsType<Inscrito> = [
    {
      title: "Nome",
      dataIndex: "nome",
      key: "nome",
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: "Presente",
      dataIndex: "presente",
      key: "presente",
      render: (presente: boolean) =>
        presente ? (
          <Badge status="success" text="Presente" />
        ) : (
          <Badge status="default" text="Ausente" />
        ),
    },
  ];

  return (
    <Layout>
      <Layout.Content>
        <div style={{ padding: "24px", maxWidth: "900px", margin: "0 auto" }}>
          {/* Cabeçalho da Ação */}
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

          <Space
            orientation="vertical"
            size="middle"
            style={{ display: "flex" }}
          >
            <Card>
              <Paragraph>{acao.descricao}</Paragraph>
            </Card>

            {/* Coluna Esquerda: Detalhes */}

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
                  {acao.horarioInicio} às {acao.horarioFim} ({acao.cargaHoraria}
                  )
                </Descriptions.Item>

                <Descriptions.Item
                  label={
                    <span>
                      <EnvironmentOutlined /> Local
                    </span>
                  }
                  span={2}
                >
                  {acao.local}
                </Descriptions.Item>
              </Descriptions>
            </Card>

            <Card
              title="Inscritos"
              bordered={false}
              extra={
                <Space>
                  <Button>
                    <BarsOutlined />
                    Chamada
                  </Button>
                  <Button type="primary">
                    <LinkOutlined />
                    Inscrição
                  </Button>
                </Space>
              }
            >
              <Table
                dataSource={acao.inscritos}
                columns={columns}
                rowKey={(record: Inscrito) => record.nome}
                pagination={{ pageSize: 5, size: "small" }}
                size="small"
                scroll={{ x: true }} // Responsividade para mobile
                expandable={{
                  expandedRowRender: (record) => (
                    <div>
                      <Descriptions size="small" style={{ paddingLeft: 48 }}>
                        {Object.entries(record.outrosDados).map(
                          ([key, value]) => (
                            <Descriptions.Item label={key} span={"filled"}>
                              {value}
                            </Descriptions.Item>
                          )
                        )}
                      </Descriptions>
                    </div>
                  ),
                  rowExpandable: (record) =>
                    Object.keys(record.outrosDados).length > 0,
                }}
              />
            </Card>
          </Space>
        </div>
      </Layout.Content>
    </Layout>
  );
};
