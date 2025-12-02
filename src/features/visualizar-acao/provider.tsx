import { useEffect, useState, type FC, type PropsWithChildren } from "react";
import { VisualizarAcaoContext, type Acao } from "./types";
import { visualizarAcaoService } from "./service";

export const VisualizarAcaoProvider: FC<PropsWithChildren<{ id: number }>> = ({
  children,
  id,
}) => {
  const [carregando, setCarregando] = useState(true);
  const [acao, setAcao] = useState<Acao | null>(null);

  useEffect(() => {
    visualizarAcaoService
      .getAcao(id)
      .then((acao) => {
        setAcao(acao);
      })
      .catch(() => {
        setAcao(null);
      })
      .finally(() => {
        setCarregando(false);
      });
  }, [id]);

  return (
    <VisualizarAcaoContext.Provider value={{ acao, carregando }}>
      {children}
    </VisualizarAcaoContext.Provider>
  );
};
