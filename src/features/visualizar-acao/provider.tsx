import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type FC,
  type PropsWithChildren,
} from "react";
import { useNavigate } from "react-router";
import { VisualizarAcaoContext } from "./types";
import { visualizarAcaoService } from "./service";
import type { AcaoComInscritos, Inscrito } from "../../shared/types";

export const VisualizarAcaoProvider: FC<PropsWithChildren<{ id: string }>> = ({
  children,
  id,
}) => {
  const navigate = useNavigate();
  const [carregando, setCarregando] = useState(true);
  const [acao, setAcao] = useState<AcaoComInscritos | null>(null);

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

  const cancelarAcao = useCallback(() => {
    if (!acao) return;
    setCarregando(true);
    visualizarAcaoService
      .cancelarAcao(acao.id)
      .then(() => {
        navigate("/");
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setCarregando(false);
      });
  }, [acao, navigate]);

  const finalizarAcao = useCallback(() => {
    if (!acao) return;
    setCarregando(true);
    visualizarAcaoService
      .concluirAcao(acao.id)
      .then(() => {
        setAcao((acao) =>
          acao
            ? {
                ...acao,
                status: "CONCLUIDA",
              }
            : null
        );
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setCarregando(false);
      });
  }, [acao]);

  const value = useMemo(
    () => ({
      acao,
      carregando,
      updateInscritos,
      cancelarAcao,
      finalizarAcao,
    }),
    [acao, carregando, updateInscritos, cancelarAcao, finalizarAcao]
  );

  return (
    <VisualizarAcaoContext.Provider value={value}>
      {children}
    </VisualizarAcaoContext.Provider>
  );
};
