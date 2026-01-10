/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  useEffect,
  useMemo,
  useState,
  type FC,
  type PropsWithChildren,
} from "react";
import { MapaContext } from "./context";
import type {
  Acao,
  AcaoJson,
  Filtro,
  FiltroOptions,
  IMapaContext,
} from "./types";
import { APIProvider, useMap } from "@vis.gl/react-google-maps";
import { googleMapsKey } from "./contants";
export const MapaProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <APIProvider apiKey={googleMapsKey}>
      <InnerMapaProvider>{children}</InnerMapaProvider>
    </APIProvider>
  );
};

function acaoJsonToAcao(acaoJson: AcaoJson): Acao {
  return {
    ...acaoJson,
    data_acao: new Date(acaoJson.data_acao.split("/").reverse().join("-")),
  };
}

export const InnerMapaProvider: FC<PropsWithChildren> = ({ children }) => {
  const map = useMap();
  const [acoes, setAcoes] = useState<Acao[]>([]);

  const [filtro] = useState<Filtro>({});

  const acoesFiltradas = useMemo(() => {
    return acoes;
  }, [acoes, filtro]);

  const listaVerde = useMemo(() => {
    return Array.from(
      new Set(
        acoesFiltradas
          .map((x) => x.municipio.split(","))
          .flat()
          .map((x) => x.trim())
      )
    ).sort((a, b) => a.localeCompare(b));
  }, [acoesFiltradas]);

  useEffect(() => {
    fetch(
      "https://n8n.atomotriz.com/webhook/50026eab-c6e0-47d0-beb8-d433d34301bd"
    )
      .then((x) => x.json() as Promise<AcaoJson[]>)
      .then((x) => setAcoes(x.map(acaoJsonToAcao)));
  }, []);

  const filtroOptions = useMemo(() => {
    const eixo_responsavel = Array.from(
      new Set(acoes.map((x) => x.eixo_responsavel))
    ).sort((a, b) => a.localeCompare(b));
    const tipo_acao = Array.from(new Set(acoes.map((x) => x.tipo_acao))).sort(
      (a, b) => a.localeCompare(b)
    );
    const Modalidade = Array.from(new Set(acoes.map((x) => x.Modalidade))).sort(
      (a, b) => a.localeCompare(b)
    );
    const publico_alvo = Array.from(
      new Set(acoes.map((x) => x.publico_alvo))
    ).sort((a, b) => a.localeCompare(b));

    const options: FiltroOptions = {
      eixo_responsavel,
      tipo_acao,
      Modalidade,
      publico_alvo,
    };

    return options;
  }, [acoes]);

  const value: IMapaContext = useMemo(
    () => ({ map: map!, listaVerde, filtroOptions }),
    [map, listaVerde, filtroOptions]
  );

  console.log(value);
  return <MapaContext.Provider value={value}>{children}</MapaContext.Provider>;
};
