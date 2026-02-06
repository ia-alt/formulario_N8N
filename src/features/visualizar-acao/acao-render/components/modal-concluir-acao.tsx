import { Modal, Input, Typography, Form } from "antd";
import { useState, type FC } from "react";
import { useVisualizarAcao } from "../../hook";

export const ModalConcluirAcao: FC<{
  open: boolean;
  onClose: () => void;
}> = ({ open, onClose }) => {
  const { finalizarAcao } = useVisualizarAcao();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      await finalizarAcao(values.linkDrive);
      onClose();
    } catch (error) {
      console.error("Erro ao concluir ação:", error);
      if (error instanceof Error && error.message === "Drive negado") {
        form.setFields([
          {
            name: "linkDrive",
            errors: ["Acesso ao Drive negado para ia@secti2.ma.gov.br"],
          },
        ]);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Concluir Ação"
      open={open}
      onOk={handleOk}
      onCancel={onClose}
      okText="Concluir"
      cancelText="Cancelar"
      confirmLoading={loading}
    >
      <Typography.Paragraph>
        Antes de prosseguir, garanta que a Chamada foi feita.
      </Typography.Paragraph>
      <Form form={form} layout="vertical">
        <Form.Item
          name="linkDrive"
          label="Link da Pasta do Drive com Evidências(Opcional)"
          rules={[{ type: "url", message: "Insira uma URL válida" }]}
        >
          <Input placeholder="https://drive.google.com/..." />
        </Form.Item>
      </Form>
    </Modal>
  );
};
