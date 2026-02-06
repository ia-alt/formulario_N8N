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
    <>
      <Card
        size="small"
        title={
          <Space>
            <Typography.Title style={{ margin: 0 }} level={5}>
              {acao.titulo}
            </Typography.Title>
            |<Tag color="blue">{acao.tipo}</Tag>
          </Space>
        }
        extra={
          <Space.Compact>
            <Button
              size="small"
              icon={<EyeOutlined />}
              onClick={() => navigate("/acoes/" + acao.id)}
            >
              Visualizar
            </Button>
          </Space.Compact>
        }
      >
        <Flex orientation="horizontal" justify="space-between">
          <Flex orientation="vertical" gap={8}>
            <Space>
              <BookOutlined />{" "}
              <Typography.Text type="secondary">{acao.eixo}</Typography.Text>
            </Space>
            <Space>
              <EnvironmentOutlined />
              <Typography.Text type="secondary">
                {acao.local} - {acao.municipio}-MA
              </Typography.Text>
            </Space>
            <Space>
              <CalendarOutlined />
              <Typography.Text type="secondary">
                {dayjs(acao.data).format("DD/MM/YYYY")}, das{" "}
                {acao.horarioInicio} às {acao.horarioFim}
              </Typography.Text>
            </Space>
          </Flex>
          <Flex justify="center" align="center">
            <Tag
              color={
                acao.status === "ATIVA"
                  ? "blue"
                  : acao.status === "CONCLUIDA"
                  ? "green"
                  : "red"
              }
            >
              {acao.status}
            </Tag>
          </Flex>
        </Flex>
      </Card>
    </>
  );
};
