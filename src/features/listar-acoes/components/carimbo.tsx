import type { FC } from "react";

interface ICarimboProps {
  text: string;
  color: string;
  rotate: number;
  size: string;
}

export const Carimbo: FC<ICarimboProps> = ({ text, color, rotate, size }) => {
  return (
    <div
      style={{
        display: "inline-block",
        fontFamily: "'Courier New', Courier, monospace",
        fontWeight: "bold",
        fontSize: size,
        textTransform: "uppercase",
        color: color,
        border: `0.25rem double ${color}`, // Borda dupla dinâmica baseada na cor
        padding: "0.2em 0.5em",
        borderRadius: "0.2em",
        transform: `rotate(${rotate}deg)`, // Rotação dinâmica
        opacity: 0.8,
        userSelect: "none", // Impede o usuário de selecionar o texto como se fosse comum
        mixBlendMode: "multiply", // Efeito de mistura com o fundo
        cursor: "default",
      }}
    >
      {text}
    </div>
  );
};
