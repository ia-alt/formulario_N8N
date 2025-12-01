import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css"; // ← ESSA LINHA PRECISA ESTAR AQUI!
import { BrowserRouter, Route, Routes } from "react-router";
import DetalhesDeEvento from "./DetalhesDeEvento.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/evento/:id" element={<DetalhesDeEvento />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
