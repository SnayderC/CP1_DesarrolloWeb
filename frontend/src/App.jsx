import { BrowserRouter, Routes, Route, Link } from "react-router";
import Menu from "./components/Menu";
import Inicio from "./pages/Inicio";
import Registro from "./pages/Registro";
import Lista from "./pages/Lista";

function NoEncontrada() {
  return (
    <section>
      <h1>Página no encontrada</h1>
      <Link to="/">Volver al inicio</Link>
    </section>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Menu />
      <main className="contenido">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/lista" element={<Lista />} />
          <Route path="*" element={<NoEncontrada />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}