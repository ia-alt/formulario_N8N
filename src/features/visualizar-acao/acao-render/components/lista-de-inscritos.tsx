import {
  Card,
  Space,
  Button,
  Descriptions,
  Table,
  Badge,
  type TableColumnsType,
  Typography,
  Dropdown,
  type MenuProps,
} from "antd";
import { useState, type FC } from "react";
import { useVisualizarAcao } from "../../hook";
import {
  BarsOutlined,
  EllipsisOutlined,
  EyeOutlined,
  LinkOutlined,
} from "@ant-design/icons";
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

  const onMenuClick: MenuProps["onClick"] = (e) => {
    console.log("click", e);
    if (!acao) return;
    switch (e.key) {
      case "planilha_inscritos":
        window.open(
          acao.linkPlanilhaInscritos,
          "_blank",
          "noopener,noreferrer"
        );
        break;
      case "editar_formulario_inscricao":
        window.open(
          acao.linkEditarFormularioInscricao,
          "_blank",
          "noopener,noreferrer"
        );
        break;
    }
  };

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
            {acao.status === "ATIVA" ? (
              <>
                <Button
                  onClick={() =>
                    modalChamadaRef.current?.open(acao.id, acao.inscritos)
                  }
                >
                  <BarsOutlined />
                  Chamada
                </Button>

                <Space.Compact>
                  <Button onClick={() => setModalLinkDeInscricaoOpen(true)}>
                    <LinkOutlined />
                    Inscrição
                  </Button>

                  <Dropdown
                    trigger={["click"]}
                    menu={{
                      items: [
                        {
                          key: "planilha_inscritos",
                          label: "Visualizar Planilha de Inscritos",
                        },
                        {
                          key: "editar_formulario_inscricao",
                          label: "Editar Formuário de Inscrição",
                        },
                      ],
                      onClick: onMenuClick,
                    }}
                    placement="bottomRight"
                  >
                    <Button icon={<EllipsisOutlined />} />
                  </Dropdown>
                </Space.Compact>
              </>
            ) : (
              <Button
                href={acao.linkPlanilhaInscritos}
                target="_blank"
                rel="noopener noreferrer"
              >
                <EyeOutlined />
                Planilha de Inscritos
              </Button>
            )}
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
