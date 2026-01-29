import { useEffect, type FC } from "react";
import { useMapaContext } from "../hook";
import { useMapsLibrary } from "@vis.gl/react-google-maps";

export const CarregadorDeDados: FC = () => {
  const { map, listaVerde } = useMapaContext();
  const coreLibrary = useMapsLibrary("core");

  useEffect(() => {
    if (!map || !coreLibrary) return;

    // 1. Carregar o GeoJSON
    map.data.loadGeoJson("/MA_Municipios_2024.json", null, (features) => {
      const bounds = new coreLibrary.LatLngBounds();
      features.forEach((feature) => {
        feature.getGeometry()?.forEachLatLng((latLng) => {
          bounds.extend(latLng);
        });
      });
      map.fitBounds(bounds);
    });

    // 2. Estilizar com base na lista (Verde se presente, Vermelho se fora) e Hover
    map.data.setStyle((feature) => {
      // Importante: Verifique se o nome no JSON está em maiúsculas ou minúsculas
      const nomeMun =
        (feature.getProperty("NM_MUN") as string | null)?.toUpperCase() || "";
      const estaNaLista = listaVerde
        .map((i) => i.toUpperCase())
        .includes(nomeMun);
        
      const isHovered = feature.getProperty("isHovered");

      return {
        fillColor: estaNaLista ? "#00FF00" : "#FF0000",
        fillOpacity: isHovered ? 0.9 : (estaNaLista ? 0.7 : 0.3),
        strokeWeight: isHovered ? 2 : 0.5,
        strokeColor: "#ffffff",
        clickable: true,
        zIndex: isHovered ? 10 : 1,
      };
    });

    const mouseOverListener = map.data.addListener("mouseover", (event: any) => {
      event.feature.setProperty("isHovered", true);
    });

    const mouseOutListener = map.data.addListener("mouseout", (event: any) => {
       event.feature.setProperty("isHovered", false);
    });


    const clickListener = map.data.addListener("click", (event: any) => {
      const nomeMun = event.feature.getProperty("NM_MUN");
      console.log("Município:", nomeMun);
    });

    return () => {
      if (clickListener) clickListener.remove();
      if (mouseOverListener) mouseOverListener.remove();
      if (mouseOutListener) mouseOutListener.remove();
      map.data.forEach((f) => map.data.remove(f)); // Limpa os dados ao desmontar
    };
  }, [map, coreLibrary, listaVerde]);

  return null;
};
