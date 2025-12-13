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
  const [acoes, setAcoes] = useState<Acao[]>([]);
  const [carregando, setCarregando] = useState(true);

  const fetchAcoes = useCallback(() => {
    setCarregando(true);
    listarAcoesService
      .listarAcoes()
      .then((acoes) => {
        setAcoes(acoes);
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

  const value: IListarAcoesContext = useMemo(
    () => ({
      acoes,
      carregando,
    }),
    [acoes, carregando]
  );
  return (
    <ListarAcoesContext.Provider value={value}>
      {children}
    </ListarAcoesContext.Provider>
  );
};
