import { useMemo, type FC } from "react";
import { useMapaContext } from "../hook";

// Componente Visual da Barra de Progresso
export const BarraDeProgresso: FC = () => {
  const total = 217;
  const { listaVerde } = useMapaContext();
  const selecionados = listaVerde.length;
  const porcentagem = useMemo(
    () => ((selecionados / total) * 100).toFixed(1),
    [selecionados]
  );

  return (
    <div
      style={{
        position: "absolute",
        top: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: "15px",
        borderRadius: "8px",
        color: "white",
        width: "300px",
        fontFamily: "sans-serif",
        boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
      }}
    >
      <div
        style={{
          marginBottom: "8px",
          fontSize: "14px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>Municípios Atendidos</span>
        <span>
          {selecionados} / {total} ({porcentagem}%)
        </span>
      </div>
      <div
        style={{
          width: "100%",
          height: "10px",
          backgroundColor: "#444",
          borderRadius: "5px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${porcentagem}%`,
            height: "100%",
            backgroundColor: "#00FF00",
            transition: "width 0.5s ease-out",
          }}
        />
      </div>
    </div>
  );
};
