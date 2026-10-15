import { useEffect, useState } from "react";
import { Link } from "react-router";
import { obtenerHabitos } from "../services/api";
import Mensaje from "../components/Mensaje";
import TarjetaRegistro from "../components/TarjetaRegistro";

export default function Lista() {
  const [habitos, setHabitos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  async function cargar() {
    setCargando(true);
    setError(null);
    try {
      setHabitos(await obtenerHabitos());
    } catch {
      setError("No se pudieron cargar los hábitos.");
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    cargar();
  }, []);

  if (cargando) return <Mensaje tipo="info" texto="Cargando hábitos..." />;

  if (error) {
    return (
      <Mensaje tipo="error" texto={error}>
        {" "}
        <button className="boton" onClick={cargar}>Reintentar</button>
      </Mensaje>
    );
  }

  if (habitos.length === 0) {
    return (
      <Mensaje tipo="info" texto="Aún no hay hábitos registrados. ">
        <Link to="/registro">Registrar el primero</Link>
      </Mensaje>
    );
  }

  return (
    <section>
      <h1>Hábitos registrados</h1>
      <div className="grid">
        {habitos.map((r) => (
          <TarjetaRegistro key={r.id} registro={r} />
        ))}
      </div>
    </section>
  );
}