import { DatePicker, Select, Space, Typography } from "antd";
import type { FC } from "react";
import { departamentos } from "../../cadastrar-acao/constants";
import { useListarAcoes } from "../hooks";
import type { Dayjs } from "dayjs";

export const FiltroAcoes: FC = () => {
  const { filtroEixo, setFiltroEixo, setFiltroData } = useListarAcoes();

  const handleRangeChange = (datas: [Dayjs | null, Dayjs | null] | null) => {
    if (!datas) {
      setFiltroData(null, null);
    } else {
      setFiltroData(
        datas[0] ? datas[0].format("YYYY-MM-DD") : null,
        datas[1] ? datas[1].format("YYYY-MM-DD") : null
      );
    }
  };

  return (
    <Space wrap align="center" style={{ marginBottom: 16 }}>
      <Typography.Text strong>Filtrar por Eixo:</Typography.Text>
      <Select
        style={{ width: 250 }}
        placeholder="Todos os eixos"
        allowClear
        value={filtroEixo}
        onChange={setFiltroEixo}
        options={departamentos.map((d) => ({ label: d, value: d }))}
      />
      <Typography.Text strong>Filtrar por Data:</Typography.Text>
      <DatePicker.RangePicker
        format="DD/MM/YYYY"
        onChange={handleRangeChange}
        placeholder={["Data inicial", "Data final"]}
      />
    </Space>
  );
};
