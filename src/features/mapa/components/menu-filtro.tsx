import { Button, Drawer } from "antd";
import { useState, type FC } from "react";
import { FilterOutlined } from "@ant-design/icons";

export const MenuFiltro: FC = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",

          backgroundColor: "rgba(0, 0, 0, 0.8)",
          padding: "15px",
          borderRadius: "8px",
          color: "white",
          fontFamily: "sans-serif",
          boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
        }}
      >
        <Button onClick={showDrawer} icon={<FilterOutlined />} />
      </div>

      <Drawer
        title="Filtro"
        closable={{ "aria-label": "Close Button" }}
        onClose={onClose}
        open={open}
      >
        <p>Em Breve</p>
      </Drawer>
    </>
  );
};
