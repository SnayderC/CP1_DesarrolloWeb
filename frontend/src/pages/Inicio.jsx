import { Link } from "react-router";

const PASOS = [
  {
    titulo: "Registra",
    texto: "Anota qué hábito cumpliste, cuándo y una breve descripción de cómo te fue.",
  },
  {
    titulo: "Organiza",
    texto: "Clasifica cada hábito en una categoría: salud, ejercicio, estudio, sueño y más.",
  },
  {
    titulo: "Consulta",
    texto: "Revisa tu historial, ordenado desde el registro más reciente.",
  },
];

export default function Inicio() {
  return (
    <>
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

      <ol className="pasos">
        {PASOS.map((paso, i) => (
          <li className="paso" key={paso.titulo}>
            <span className="paso__numero" aria-hidden="true">{i + 1}</span>
            <h2>{paso.titulo}</h2>
            <p>{paso.texto}</p>
          </li>
        ))}
      </ol>
    </>
  );
}
