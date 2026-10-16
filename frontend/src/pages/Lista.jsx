import { useEffect, useState } from "react";
import { Link } from "react-router";
import { obtenerHabitos } from "../services/api";
import Mensaje from "../components/Mensaje";
import TarjetaRegistro from "../components/TarjetaRegistro";

export default function Lista() {
  const [habitos, setHabitos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  // Cada vez que cambia, el efecto vuelve a pedir los hábitos
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    // Evita actualizar el estado si el usuario ya salió de la página
    let activo = true;

    obtenerHabitos()
      .then((datos) => {
        if (activo) setHabitos(datos);
      })
      .catch(() => {
        if (activo) setError("No se pudieron cargar los hábitos.");
      })
      .finally(() => {
        if (activo) setCargando(false);
      });

    return () => {
      activo = false;
    };
  }, [intento]);

  // Al reintentar se vuelve a mostrar "Cargando..." y se repite la petición
  function reintentar() {
    setCargando(true);
    setError(null);
    setIntento((n) => n + 1);
  }

  // Lo que se muestra debajo del título según el estado
  let contenido;
  if (cargando) {
    contenido = <Mensaje tipo="info" texto="Cargando hábitos..." />;
  } else if (error) {
    contenido = (
      <Mensaje tipo="error" texto={error}>
        <button className="boton" onClick={reintentar}>Reintentar</button>
      </Mensaje>
    );
  } else if (habitos.length === 0) {
    contenido = (
      <Mensaje tipo="info" texto="Aún no hay hábitos registrados.">
        <Link to="/registro">Registrar el primero</Link>
      </Mensaje>
    );
  } else {
    contenido = (
      <div className="grid">
        {habitos.map((r) => (
          <TarjetaRegistro key={r.id} registro={r} />
        ))}
      </div>
    );
  }

  const hayHabitos = !cargando && !error && habitos.length > 0;

  return (
    <section>
      <div className="lista__cabecera">
        <div>
          <h1>Hábitos registrados</h1>
          {hayHabitos && (
            <p className="lista__contador">
              {habitos.length} {habitos.length === 1 ? "hábito registrado" : "hábitos registrados"}
            </p>
          )}
        </div>
        <Link className="boton" to="/registro">Registrar hábito</Link>
      </div>
      {contenido}
    </section>
  );
}