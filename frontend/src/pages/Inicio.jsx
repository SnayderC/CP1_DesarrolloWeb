import { Link } from "react-router";

export default function Inicio() {
  return (
    <section className="inicio">
      <h1>Bienvenida a HabitLog</h1>
      <p>
        HabitLog te permite registrar tus hábitos diarios y consultarlos cuando
        quieras. Anota qué hiciste, cuándo y en qué categoría, y revisa tu
        historial en una lista.
      </p>
      <div className="inicio__acciones">
        <Link className="boton" to="/registro">Registrar hábito</Link>
        <Link className="boton boton--secundario" to="/lista">Ver hábitos</Link>
      </div>
    </section>
  );
}