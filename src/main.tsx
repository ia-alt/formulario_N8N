import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./app-router";
import "./index.css";
import { App, ConfigProvider } from "antd";
import ptBr from "antd/locale/pt_BR";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigProvider locale={ptBr}>
      <App>
        <AppRouter />
      </App>
    </ConfigProvider>
  </React.StrictMode>
);
