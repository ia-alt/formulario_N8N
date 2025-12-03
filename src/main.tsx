import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./app-router";
import "./index.css";
import { App } from "antd";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App>
      <AppRouter />
    </App>
  </React.StrictMode>
);
