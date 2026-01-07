import { BrowserRouter, Routes, Route } from "react-router";
import { CadastrarAcaoPage } from "./features/cadastrar-acao/page";
import { VisualizarAcaoPage } from "./features/visualizar-acao";
import { ListarAcoesPage } from "./features/listar-acoes";
import { MapaPage } from "./features/mapa";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<ListarAcoesPage />} />
        <Route path="/cadastrar" element={<CadastrarAcaoPage />} />
        <Route path="/acoes/:id" element={<VisualizarAcaoPage />} />
        <Route path="mapa" element={<MapaPage />} />
      </Routes>
    </BrowserRouter>
  );
}
