import {
  useCallback,
  useEffect,
  useState,
  type FC,
  type PropsWithChildren,
} from "react";
import { VisualizarAcaoContext, type Acao } from "./types";
import { visualizarAcaoService } from "./service";
import type { Inscrito } from "../../shared/types";

export const VisualizarAcaoProvider: FC<PropsWithChildren<{ id: string }>> = ({
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

  const updateInscritos = useCallback(
    (inscritos: Inscrito[]) => {
      setAcao((acao) =>
        acao
          ? {
              ...acao,
              inscritos,
            }
          : null
      );
    },
    [setAcao]
  );

  return (
    <VisualizarAcaoContext.Provider
      value={{ acao, carregando, updateInscritos }}
    >
      {children}
    </VisualizarAcaoContext.Provider>
  );
};
