import { Select, Space, Typography } from "antd";
import type { FC } from "react";
import { departamentos } from "../../cadastrar-acao/constants";
import { useListarAcoes } from "../hooks";

export const FiltroAcoes: FC = () => {
  const { filtroEixo, setFiltroEixo } = useListarAcoes();

  return (
    <Space align="center" style={{ marginBottom: 16 }}>
      <Typography.Text strong>Filtrar por Eixo:</Typography.Text>
      <Select
        style={{ width: 250 }}
        placeholder="Todos os eixos"
        allowClear
        value={filtroEixo}
        onChange={setFiltroEixo}
        options={departamentos.map((d) => ({ label: d, value: d }))}
      />
    </Space>
  );
};
