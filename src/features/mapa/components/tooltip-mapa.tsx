
import { useEffect, useState, type FC } from "react";
import { useMapaContext } from "../hook";

export const TooltipMapa: FC = () => {
  const { map } = useMapaContext();
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
    content: string;
  }>({
    visible: false,
    x: 0,
    y: 0,
    content: "",
  });

  useEffect(() => {
    if (!map) return;

    const mouseOverListener = map.data.addListener("mouseover", (event: any) => {
      const nomeMun = event.feature.getProperty("NM_MUN");
      setTooltip((prev) => ({
        ...prev,
        visible: true,
        content: nomeMun || "",
      }));
    });

    const mouseMoveListener = map.data.addListener("mousemove", (event: any) => {
      // event.domEvent gives us the DOM MouseEvent
      const domEvent = event.domEvent as MouseEvent;
      setTooltip((prev) => ({
        ...prev,
        x: domEvent.clientX,
        y: domEvent.clientY,
      }));
    });

    const mouseOutListener = map.data.addListener("mouseout", () => {
      setTooltip((prev) => ({ ...prev, visible: false }));
    });

    return () => {
      if (mouseOverListener) mouseOverListener.remove();
      if (mouseMoveListener) mouseMoveListener.remove();
      if (mouseOutListener) mouseOutListener.remove();
    };
  }, [map]);

  if (!tooltip.visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: tooltip.y + 15, // Offset to not cover cursor
        left: tooltip.x + 15,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        color: "white",
        padding: "5px 10px",
        borderRadius: "4px",
        fontSize: "12px",
        pointerEvents: "none",
        zIndex: 2000,
        whiteSpace: "nowrap",
      }}
    >
      {tooltip.content}
    </div>
  );
};
