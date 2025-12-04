import { Modal, Flex, QRCode, Button, Input, Space } from "antd";
import type { FC } from "react";
import { useVisualizarAcao } from "../../hook";
import { useCopyToClipboard } from "../../../../helpers/use-copy-to-clipboard";
import { LinkOutlined, CopyOutlined } from "@ant-design/icons";

export const ModalLinkDeInscricao: FC<{
  open: boolean;
  setOpen: (open: boolean) => void;
}> = ({ open, setOpen }) => {
  const { acao } = useVisualizarAcao();
  const copyToClipboard = useCopyToClipboard();

  if (!acao) {
    return null;
  }

  return (
    <Modal
      title="Link de Inscrição"
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
    >
      <Flex gap={16} orientation="vertical" align="center">
        <QRCode value={acao.linkFormularioInscricao} />

        <Input.TextArea
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
  );
};
