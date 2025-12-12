import { BrowserRouter, Routes, Route } from "react-router";
import { CadastrarAcaoPage } from "./features/cadastrar-acao/page";
import { VisualizarAcaoPage } from "./features/visualizar-acao";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CadastrarAcaoPage />} />
        <Route path="/acoes/:id" element={<VisualizarAcaoPage />} />
      </Routes>
    </BrowserRouter>
  );
}
