import { CATEGORIAS_VALIDAS } from "../constants/categorias";

export function hoyLocal() {
  const hoy = new Date();
  const anio = hoy.getFullYear();
  const mes = String(hoy.getMonth() + 1).padStart(2, "0");
  const dia = String(hoy.getDate()).padStart(2, "0");
  return `${anio}-${mes}-${dia}`;
}

export function fechaValida(fecha) {
  if (typeof fecha !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(fecha)) return false;
  const [anio, mes, dia] = fecha.split("-").map(Number);
  const fechaComprobada = new Date(anio, mes - 1, dia);
  return (
    fechaComprobada.getFullYear() === anio &&
    fechaComprobada.getMonth() === mes - 1 &&
    fechaComprobada.getDate() === dia
  );
}

export function validarFormulario(datos) {
  const errores = {};

  if (!datos.nombre?.trim()) {
    errores.nombre = "El nombre es obligatorio.";
  } else if (datos.nombre.trim().length < 3 || datos.nombre.trim().length > 60) {
    errores.nombre = "El nombre debe tener entre 3 y 60 caracteres.";
  }

  if (!datos.email?.trim()) {
    errores.email = "El correo electrónico es obligatorio.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.email.trim())) {
    errores.email = "El correo electrónico no tiene un formato válido.";
  }

  if (!datos.habito?.trim()) {
    errores.habito = "El hábito es obligatorio.";
  } else if (datos.habito.trim().length < 3 || datos.habito.trim().length > 50) {
    errores.habito = "El hábito debe tener entre 3 y 50 caracteres.";
  }

  if (!datos.descripcion?.trim()) {
    errores.descripcion = "La descripción es obligatoria.";
  } else if (datos.descripcion.trim().length < 10 || datos.descripcion.trim().length > 300) {
    errores.descripcion = "La descripción debe tener entre 10 y 300 caracteres.";
  }

  if (!fechaValida(datos.fecha)) {
    errores.fecha = "Debes ingresar una fecha real con formato YYYY-MM-DD.";
  } else if (datos.fecha > hoyLocal()) {
    errores.fecha = "La fecha no puede ser futura.";
  }

  if (!datos.categoria || !CATEGORIAS_VALIDAS.includes(datos.categoria.trim())) {
    errores.categoria = "Debes seleccionar una categoría válida.";
  }

  return errores;
}
