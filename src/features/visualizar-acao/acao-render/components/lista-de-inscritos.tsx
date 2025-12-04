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
import { useState, type FC } from "react";
import { useVisualizarAcao } from "../../hook";
import { BarsOutlined, LinkOutlined } from "@ant-design/icons";
import { ModalLinkDeInscricao } from "./modal-link-de-inscricao";
import { ModalChamada } from "../../../chamada/components/modal-chamada";
import type { Inscrito } from "../../../../shared/types";

const { Text } = Typography;

export const ListaDeInscritos: FC = () => {
  const { acao, updateInscritos } = useVisualizarAcao();
  const [modalLinkDeInscricaoOpen, setModalLinkDeInscricaoOpen] =
    useState(false);

  const modalChamadaRef = ModalChamada.useRef();

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
        title={`Inscritos (${acao.inscritos.length})`}
        variant={"outlined"}
        extra={
          <Space>
            <Button
              onClick={() =>
                modalChamadaRef.current?.open(acao.id, acao.inscritos)
              }
            >
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
          pagination={false}
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

      <ModalLinkDeInscricao
        open={modalLinkDeInscricaoOpen}
        setOpen={setModalLinkDeInscricaoOpen}
      />

      <ModalChamada ref={modalChamadaRef} onSave={updateInscritos} />
    </>
  );
};
