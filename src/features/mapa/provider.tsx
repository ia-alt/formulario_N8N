import { useMemo, useState, type FC, type PropsWithChildren } from "react";
import { MapaContext } from "./context";
import type { IMapaContext } from "./types";
import { APIProvider, useMap } from "@vis.gl/react-google-maps";
import { googleMapsKey, listaCidades } from "./contants";
export const MapaProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <APIProvider apiKey={googleMapsKey}>
      <InnerMapaProvider>{children}</InnerMapaProvider>
    </APIProvider>
  );
};

export const InnerMapaProvider: FC<PropsWithChildren> = ({ children }) => {
  const map = useMap();
  const [listaVerde, setListaVerde] = useState<string[]>(listaCidades);

  const value: IMapaContext = useMemo(
    () => ({ map: map!, listaVerde }),
    [map, listaVerde]
  );
  return <MapaContext.Provider value={value}>{children}</MapaContext.Provider>;
};
