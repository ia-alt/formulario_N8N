import { Mapa } from "./components/mapa";
import { CarregadorDeDados } from "./components/carregador-de-dados";
import { BarraDeProgresso } from "./components/barra-de-progresso";
import type { FC } from "react";
import { MenuFiltro } from "./components/menu-filtro";
import { MapaProvider } from "./provider";
import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

export const MapaPage: FC = () => {
  // Configuração para deixar o mapa base escuro/ofuscado

  return (
    <MapaProvider>
      <InnerMapaPage />
    </MapaProvider>
  );
};

const InnerMapaPage: FC = () => {
  // Configuração para deixar o mapa base escuro/ofuscado

  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          zIndex: 1000,
        }}
      >
        <Button icon={<ArrowLeftOutlined />} href="/">
          Voltar
        </Button>
      </div>
      <Mapa />
      <CarregadorDeDados />
      <BarraDeProgresso />
      <MenuFiltro />
    </div>
  );
};
