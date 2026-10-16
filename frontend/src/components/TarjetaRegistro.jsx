export default function TarjetaRegistro({ registro }) {
  const { habito, categoria, nombre, fecha, descripcion } = registro;
  // La fecha se muestra como texto: new Date("2026-10-12") da el día anterior en Ecuador
  const [a, m, d] = fecha.split("-");

  // data-categoria permite que el CSS le dé a cada categoría su color
  return (
    <article className="tarjeta" data-categoria={categoria}>
      <div className="tarjeta__cabecera">
        <h3>{habito}</h3>
        <span className="etiqueta">{categoria}</span>
      </div>
      <p className="tarjeta__meta">
        {nombre} · {d}/{m}/{a}
      </p>
      <p className="tarjeta__descripcion">{descripcion}</p>
    </article>
  );
}
