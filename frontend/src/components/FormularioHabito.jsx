import { useState } from "react";
import { useNavigate } from "react-router";
import { validarFormulario, hoyLocal } from "../utils/validarFormulario";
import { CATEGORIAS_VALIDAS } from "../constants/categorias";
import { crearHabito } from "../services/api";
import Mensaje from "./Mensaje";

export default function FormularioHabito() {
  const navigate = useNavigate();
  const estadoInicial = {
    nombre: "",
    email: "",
    habito: "",
    descripcion: "",
    fecha: hoyLocal(),
    categoria: "",
  };

  const [datos, setDatos] = useState(estadoInicial);
  const [errores, setErrores] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [mensajeGlobal, setMensajeGlobal] = useState(null);

  function manejarCambio(e) {
    const { name, value } = e.target;
    setDatos((prev) => ({ ...prev, [name]: value }));
  }

  async function manejarEnvio(e) {
    e.preventDefault();
    setMensajeGlobal(null);

    const erroresValidacion = validarFormulario(datos);
    if (Object.keys(erroresValidacion).length > 0) {
      setErrores(erroresValidacion);
      return;
    }

    setErrores({});
    setEnviando(true);

    try {
      await crearHabito(datos);
      setMensajeGlobal({ tipo: "exito", texto: "¡Hábito guardado con éxito!" });
      setDatos(estadoInicial);
      setTimeout(() => navigate("/lista"), 1500); // Redirige a la lista
    } catch (error) {
      if (error.detalles && Object.keys(error.detalles).length > 0) {
        setErrores(error.detalles); // Asigna los errores de validación del servidor (HTTP 400)
      } else {
        setMensajeGlobal({
          tipo: "error",
          texto: error.message || "No se pudo guardar, intenta de nuevo.",
        });
      }
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form onSubmit={manejarEnvio} className="formulario-habito" noValidate>
      {mensajeGlobal && <Mensaje tipo={mensajeGlobal.tipo} texto={mensajeGlobal.texto} />}

      <div className="campo">
        <label htmlFor="nombre">Nombre completo:</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          placeholder="Ej.: Ana Pérez"
          value={datos.nombre}
          onChange={manejarCambio}
          aria-invalid={!!errores.nombre}
        />
        {errores.nombre && <span className="error">{errores.nombre}</span>}
      </div>

      <div className="campo">
        <label htmlFor="email">Correo electrónico:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Ej.: ana@correo.com"
          value={datos.email}
          onChange={manejarCambio}
          aria-invalid={!!errores.email}
        />
        {errores.email && <span className="error">{errores.email}</span>}
      </div>

      <div className="campo campo--ancho">
        <label htmlFor="habito">Hábito:</label>
        <input
          type="text"
          id="habito"
          name="habito"
          placeholder="Ej.: Leer 20 minutos"
          value={datos.habito}
          onChange={manejarCambio}
          aria-invalid={!!errores.habito}
        />
        {errores.habito && <span className="error">{errores.habito}</span>}
      </div>

      <div className="campo">
        <label htmlFor="fecha">Fecha:</label>
        <input
          type="date"
          id="fecha"
          name="fecha"
          max={hoyLocal()}
          value={datos.fecha}
          onChange={manejarCambio}
          aria-invalid={!!errores.fecha}
        />
        {errores.fecha && <span className="error">{errores.fecha}</span>}
      </div>

      <div className="campo">
        <label htmlFor="categoria">Categoría:</label>
        <select
          id="categoria"
          name="categoria"
          value={datos.categoria}
          onChange={manejarCambio}
          aria-invalid={!!errores.categoria}
        >
          <option value="">-- Selecciona una opción --</option>
          {CATEGORIAS_VALIDAS.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {errores.categoria && <span className="error">{errores.categoria}</span>}
      </div>

      <div className="campo campo--ancho">
        <label htmlFor="descripcion">Descripción:</label>
        <textarea
          id="descripcion"
          name="descripcion"
          placeholder="Ej.: Leí antes de dormir, capítulo 3"
          value={datos.descripcion}
          onChange={manejarCambio}
          aria-invalid={!!errores.descripcion}
        />
        <small>{datos.descripcion.length}/300 caracteres</small>
        {errores.descripcion && <span className="error">{errores.descripcion}</span>}
      </div>

      <button type="submit" disabled={enviando}>
        {enviando ? "Guardando..." : "Registrar Hábito"}
      </button>
    </form>
  );
}