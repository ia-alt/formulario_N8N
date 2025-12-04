import { BrowserRouter, Routes, Route } from "react-router";
import { CadastrarAcaoPage } from "./features/cadastrar-acao/page";
import OldCadastrarAcaoPage from "./features/cadastrar-acao/old-page";
import { VisualizarAcaoPage } from "./features/visualizar-acao";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CadastrarAcaoPage />} />
        <Route path="/old" element={<OldCadastrarAcaoPage />} />
        <Route path="/acao/:id" element={<VisualizarAcaoPage />} />
      </Routes>
    </BrowserRouter>
  );
}
