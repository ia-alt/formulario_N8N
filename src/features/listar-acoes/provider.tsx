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
  const [carregando, setCarregando] = useState(true);

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
    if (!filtroEixo) return todasAcoes;
    return todasAcoes.filter((acao) => {
      if (acao.eixo === filtroEixo) return true;
      const auxiliares = acao.eixos_auxiliares?.split(",").map((e) => e.trim()) ?? [];
      return auxiliares.includes(filtroEixo);
    });
  }, [todasAcoes, filtroEixo]);

  const value: IListarAcoesContext = useMemo(
    () => ({
      acoes: acoesFiltradas,
      carregando,
      filtroEixo,
      setFiltroEixo,
    }),
    [acoesFiltradas, carregando, filtroEixo]
  );
  return (
    <ListarAcoesContext.Provider value={value}>
      {children}
    </ListarAcoesContext.Provider>
  );
};
