import { BrowserRouter, Routes, Route, Link } from "react-router";
import Menu from "./components/Menu";
import Inicio from "./pages/Inicio";
import Registro from "./pages/Registro";
import Lista from "./pages/Lista";

function NoEncontrada() {
  return (
    <section className="no-encontrada">
      <p className="no-encontrada__codigo">404</p>
      <h1>Página no encontrada</h1>
      <p>La dirección que buscas no existe o fue movida.</p>
      <Link className="boton" to="/">Volver al inicio</Link>
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
      <footer className="pie">
        <p>HabitLog · Componente Práctico 1 · Desarrollo Web, UNEMI</p>
        <p>Snayder, Bryan, Jenny y Steven</p>
      </footer>
    </BrowserRouter>
  );
}
