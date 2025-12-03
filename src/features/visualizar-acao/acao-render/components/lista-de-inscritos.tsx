import {
  Card,
  Space,
  Button,
  Descriptions,
  Table,
  Badge,
  type TableColumnsType,
  Typography,
} from "antd";
import type { FC } from "react";
import type { Inscrito } from "../../types";
import { useVisualizarAcao } from "../../hook";
import { BarsOutlined, LinkOutlined } from "@ant-design/icons";

const { Text } = Typography;

export const ListaDeInscritos: FC = () => {
  const { acao } = useVisualizarAcao();
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

  if (!acao) {
    return null;
  }
  return (
    <Card
      title="Inscritos"
      variant={"outlined"}
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
                {Object.entries(record.outrosDados).map(([key, value]) => (
                  <Descriptions.Item label={key} span={"filled"}>
                    {value}
                  </Descriptions.Item>
                ))}
              </Descriptions>
            </div>
          ),
          rowExpandable: (record) => Object.keys(record.outrosDados).length > 0,
        }}
      />
    </Card>
  );
};
