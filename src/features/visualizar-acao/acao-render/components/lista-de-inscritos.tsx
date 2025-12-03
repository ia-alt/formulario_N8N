import {
  Card,
  Space,
  Button,
  Descriptions,
  Table,
  Badge,
  type TableColumnsType,
  Typography,
  Modal,
  QRCode,
  Flex,
} from "antd";
import { useState, type FC } from "react";
import type { Inscrito } from "../../types";
import { useVisualizarAcao } from "../../hook";
import { BarsOutlined, LinkOutlined, CopyOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { useCopyToClipboard } from "../../../../helpers/use-copy-to-clipboard";

const { Text } = Typography;

export const ListaDeInscritos: FC = () => {
  const { acao } = useVisualizarAcao();
  const copyToClipboard = useCopyToClipboard();
  const [modalLinkDeInscricaoOpen, setModalLinkDeInscricaoOpen] =
    useState(false);

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
    <>
      <Card
        title="Inscritos"
        variant={"outlined"}
        extra={
          <Space>
            <Button>
              <BarsOutlined />
              Chamada
            </Button>
            <Button
              type="primary"
              onClick={() => setModalLinkDeInscricaoOpen(true)}
            >
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
            rowExpandable: (record) =>
              Object.keys(record.outrosDados).length > 0,
          }}
        />
      </Card>
      <Modal
        title="Link de Inscrição"
        open={modalLinkDeInscricaoOpen}
        onCancel={() => setModalLinkDeInscricaoOpen(false)}
        footer={null}
      >
        <Flex gap={16} orientation="vertical" align="center">
          <QRCode value={acao.linkFormularioInscricao} />

          <TextArea
            value={acao.linkFormularioInscricao}
            autoSize={{ minRows: 1, maxRows: 6 }}
          />

          <Space>
            <Button
              onClick={() =>
                copyToClipboard(
                  acao.linkFormularioInscricao,
                  "Link de inscrição copiado!"
                )
              }
            >
              <CopyOutlined />
              Copiar URL
            </Button>
            <Button
              type="link"
              href={acao.linkFormularioInscricao}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkOutlined />
              Abrir Página
            </Button>
          </Space>
        </Flex>
      </Modal>
    </>
  );
};
