import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { CadastrarAcaoPage } from "./features/cadastrar-acao/page";
import { VisualizarAcaoPage } from "./features/visualizar-acao";
import { ListarAcoesPage } from "./features/listar-acoes";
import { MapaPage } from "./features/mapa";
import { LoginPage } from "./features/login";
import React from "react";

function isTokenValid(token: string | null) {
  if (!token) return false;
  try {
    const [, payload] = token.split(".");
    const decoded = JSON.parse(atob(payload));
    if (!decoded.exp) return true;
    const now = Math.floor(Date.now() / 1000);
    return decoded.exp > now;
  } catch {
    return false;
  }
}

function RequireAuth({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem("token");

  if (!isTokenValid(token)) {
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          index
          path="/"
          element={
            <RequireAuth>
              <ListarAcoesPage />
            </RequireAuth>
          }
        />
        <Route
          path="/cadastrar"
          element={
            <RequireAuth>
              <CadastrarAcaoPage />
            </RequireAuth>
          }
        />
        <Route
          path="/acoes/:id"
          element={
            <RequireAuth>
              <VisualizarAcaoPage />
            </RequireAuth>
          }
        />
        <Route
          path="mapa"
          element={
            <RequireAuth>
              <MapaPage />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
