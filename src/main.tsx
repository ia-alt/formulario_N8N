import React from "react";
import ReactDOM from "react-dom/client";
import {CadastrarAcaoPage} from "./features/cadastrar-acao";
import "./index.css"; // ← ESSA LINHA PRECISA ESTAR AQUI!
import { BrowserRouter, Route, Routes } from "react-router";
import {VisualizarAcaoPage} from "./features/visualizar-acao";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CadastrarAcaoPage />} />
        <Route path="/acao/:id" element={<VisualizarAcaoPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
