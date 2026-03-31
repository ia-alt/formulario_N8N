import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type FC,
  type PropsWithChildren,
} from "react";
import type { IListarAcoesContext } from "./types";
import { ListarAcoesContext } from "./context";
import type { Acao } from "../../shared/types";
import { listarAcoesService } from "./service";

export const ListarAcoesProvider: FC<PropsWithChildren> = ({ children }) => {
  const [todasAcoes, setTodasAcoes] = useState<Acao[]>([]);
  const [filtroEixo, setFiltroEixo] = useState<string | null>(null);
  const [filtroDataInicio, setFiltroDataInicio] = useState<string | null>(null);
  const [filtroDataFim, setFiltroDataFim] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(true);

  const setFiltroData = useCallback((inicio: string | null, fim: string | null) => {
    setFiltroDataInicio(inicio);
    setFiltroDataFim(fim);
  }, []);

  const fetchAcoes = useCallback(() => {
    setCarregando(true);
    listarAcoesService
      .listarAcoes()
      .then((acoes) => {
        setTodasAcoes(acoes);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setCarregando(false);
      });
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void fetchAcoes();
  }, [fetchAcoes]);

  const acoesFiltradas = useMemo(() => {
    return todasAcoes.filter((acao) => {
      if (acao.status === "CANCELADA") return false;
      if (filtroEixo) {
        const auxiliares = acao.eixos_auxiliares?.split(",").map((e) => e.trim()) ?? [];
        if (acao.eixo !== filtroEixo && !auxiliares.includes(filtroEixo)) return false;
      }
      if (filtroDataInicio && acao.data < filtroDataInicio) return false;
      if (filtroDataFim && acao.data > filtroDataFim) return false;
      return true;
    });
  }, [todasAcoes, filtroEixo, filtroDataInicio, filtroDataFim]);

  const value: IListarAcoesContext = useMemo(
    () => ({
      acoes: acoesFiltradas,
      carregando,
      filtroEixo,
      setFiltroEixo,
      filtroDataInicio,
      filtroDataFim,
      setFiltroData,
    }),
    [acoesFiltradas, carregando, filtroEixo, filtroDataInicio, filtroDataFim, setFiltroData]
  );
  return (
    <ListarAcoesContext.Provider value={value}>
      {children}
    </ListarAcoesContext.Provider>
  );
};
