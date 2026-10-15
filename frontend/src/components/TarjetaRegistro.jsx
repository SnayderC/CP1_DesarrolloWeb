export default function TarjetaRegistro({ registro }) {
  const { habito, categoria, nombre, fecha, descripcion } = registro;
  // La fecha se muestra como texto: new Date("2026-10-12") da el día anterior en Ecuador
  const [a, m, d] = fecha.split("-");

  return (
    <article className="tarjeta">
      <div className="tarjeta__cabecera">
        <h3>{habito}</h3>
        <span className="etiqueta">{categoria}</span>
      </div>
      <p className="tarjeta__meta">
        {nombre} · {d}/{m}/{a}
      </p>
      <p>{descripcion}</p>
    </article>
  );
}