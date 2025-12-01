import { BrowserRouter, Routes, Route } from "react-router";
import { CadastrarAcaoPage } from "./features/cadastrar-acao";
import { VisualizarAcaoPage } from "./features/visualizar-acao";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CadastrarAcaoPage />} />
        <Route path="/acao/:id" element={<VisualizarAcaoPage />} />
      </Routes>
    </BrowserRouter>
  );
}
