import type { FC } from "react";
import type { Acao } from "../../../shared/types";
import { Button, Card, Flex, Space, Tag, Typography } from "antd";
import {
  BookOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { useNavigate } from "react-router";

export const AcaoRender: FC<{ acao: Acao }> = ({ acao }) => {
  const navigate = useNavigate();
  return (
    <Card size="small">
      <Flex vertical gap={8}>
        <Flex justify="space-between" align="flex-start" gap={8} wrap>
          <Flex vertical gap={4} style={{ flex: 1, minWidth: 0 }}>
            <Typography.Title
              level={5}
              style={{ margin: 0 }}
              ellipsis={{ rows: 2, tooltip: acao.titulo }}
            >
              {acao.titulo}
            </Typography.Title>
            <Tag color="blue" style={{ alignSelf: "flex-start" }}>
              {acao.tipo}
            </Tag>
          </Flex>
          <Button
            size="small"
            icon={<EyeOutlined />}
            onClick={() => navigate("/acoes/" + acao.id)}
            style={{ flexShrink: 0 }}
          >
            Visualizar
          </Button>
        </Flex>

        {acao.eixo && (
          <Space>
            <BookOutlined />
            <Typography.Text type="secondary">{acao.eixo}</Typography.Text>
          </Space>
        )}
        {acao.eixos_auxiliares && (
          <Space wrap>
            {acao.eixos_auxiliares.split(",").map((e) => (
              <Tag key={e.trim()} color="default" style={{ fontSize: 11 }}>
                {e.trim()}
              </Tag>
            ))}
          </Space>
        )}
        <Space>
          <EnvironmentOutlined />
          <Typography.Text type="secondary">
            {acao.modalidade?.toLowerCase() === "remota" ||
            acao.local?.toLowerCase() === "remoto" ||
            acao.local?.toLowerCase() === "remota"
              ? "Remota"
              : [acao.local, acao.municipio ? `${acao.municipio}-MA` : ""]
                  .filter(Boolean)
                  .join(" - ")}
          </Typography.Text>
        </Space>
        <Space>
          <CalendarOutlined />
          <Typography.Text type="secondary">
            {dayjs(acao.data).format("DD/MM/YYYY")}, das {acao.horarioInicio} às{" "}
            {acao.horarioFim}
          </Typography.Text>
        </Space>
      </Flex>
    </Card>
  );
};
