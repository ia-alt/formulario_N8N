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
import { Carimbo } from "./carimbo";

export const AcaoRender: FC<{ acao: Acao }> = ({ acao }) => {
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
              href={"/acoes/" + acao.id}
              target="_blank"
              rel="noopener noreferrer"
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
            <Carimbo
              text={acao.status}
              color={
                acao.status === "ATIVA"
                  ? "blue"
                  : acao.status === "CONCLUIDA"
                  ? "green"
                  : "red"
              }
              rotate={0}
              size="1rem"
            />
          </Flex>
        </Flex>
      </Card>
    </>
  );
};
