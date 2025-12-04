import { Divider, Flex, Form, Modal, Switch, Typography } from "antd";
import {
  forwardRef,
  Fragment,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { chamadaService } from "../service";
import type { Inscrito } from "../../../shared/types";

type ModalChamadaRef = {
  open: (acaoId: string, inscritos: Inscrito[]) => void;
};

type ModalChamadaProps = {
  onSave: (inscritos: Inscrito[]) => void;
};

const ModalChamadaComponent = forwardRef<ModalChamadaRef, ModalChamadaProps>(
  ({ onSave }, ref) => {
    const [form] = Form.useForm();
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [dados, setDados] = useState<{
      acaoId: string;
      inscritos: Inscrito[];
    } | null>(null);
    const open = !!dados;

    function close() {
      setDados(null);
    }

    useImperativeHandle(
      ref,
      () => ({
        open: (acaoId: string, inscritos: Inscrito[]) => {
          console.log(acaoId, inscritos);
          form.setFieldValue(
            "presentes",
            inscritos.map((inscrito) => inscrito.presente)
          );
          setDados({ acaoId, inscritos });
        },
      }),
      [form, setDados]
    );

    async function onFinish(values: { presentes: boolean[] }) {
      if (!dados) return;

      setConfirmLoading(true);
      console.log("Success:", values);

      const novosInscritos = dados.inscritos.map((inscrito, index) => ({
        ...inscrito,
        presente: values.presentes[index],
      }));
      const nomesDosPresentes = novosInscritos
        .filter((x) => x.presente)
        .map((x) => x.nome);
      chamadaService
        .setPresentes(dados.acaoId, nomesDosPresentes)
        .then(() => {
          onSave(novosInscritos);
          setTimeout(() => {
            close();
          }, 10);
        })
        .finally(() => {
          setConfirmLoading(false);
        });
    }

    return (
      <Modal
        title="Chamada"
        open={open}
        onCancel={close}
        confirmLoading={confirmLoading}
        destroyOnHidden
        style={{ top: 20 }}
        styles={{
          container: {
            maxHeight: "90vh",
          },
          body: {
            overflow: "auto",
            maxHeight: "calc(90vh - 120px)",
          },
        }}
        okButtonProps={{ htmlType: "submit" }}
        modalRender={(dom) => (
          <Form
            form={form}
            name="chamada_form"
            style={{ maxWidth: 600 }}
            onFinish={onFinish}
          >
            {dom}
          </Form>
        )}
      >
        <Form.List name="presentes">
          {(fields) => (
            <>
              {fields.map((field, index) => (
                <Fragment key={field.key}>
                  <Flex>
                    <Typography.Text strong style={{ flex: 1 }}>
                      {dados?.inscritos?.at(index)?.nome ??
                        "Nome não encontrado"}
                    </Typography.Text>
                    <Form.Item
                      {...field}
                      style={{ marginBottom: 0 }}
                      noStyle
                      valuePropName="checked"
                    >
                      <Switch
                        unCheckedChildren="Ausente"
                        checkedChildren="Presente"
                      />
                    </Form.Item>
                  </Flex>
                  <Divider size="small" />
                </Fragment>
              ))}
            </>
          )}
        </Form.List>
      </Modal>
    );
  }
);

function useModalChamadaRef() {
  return useRef<ModalChamadaRef>(null);
}

type IModalChamada = typeof ModalChamadaComponent & {
  useRef: typeof useModalChamadaRef;
};

export const ModalChamada: IModalChamada =
  ModalChamadaComponent as IModalChamada;
ModalChamada.useRef = useModalChamadaRef;
