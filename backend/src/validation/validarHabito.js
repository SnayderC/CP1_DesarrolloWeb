
const CATEGORIAS_VALIDAS = [
  "Salud",
  "Ejercicio",
  "Alimentación",
  "Sueño",
  "Estudio",
  "Bienestar emocional",
  "Productividad",
  "Otro",
];

// Obtiene la fecha local en formato YYYY-MM-DD
function hoyLocal() {
  const hoy = new Date();
  const anio = hoy.getFullYear();
  const mes = String(hoy.getMonth() + 1).padStart(2, "0");
  const dia = String(hoy.getDate()).padStart(2, "0");

  return `${anio}-${mes}-${dia}`;
}

// Comprueba que la fecha exista realmente y tenga formato YYYY-MM-DD
function fechaValida(fecha) {
  if (typeof fecha !== "string") {
    return false;
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
    return false;
  }

  const [anio, mes, dia] = fecha.split("-").map(Number);
  const fechaComprobada = new Date(anio, mes - 1, dia);

  return (
    fechaComprobada.getFullYear() === anio &&
    fechaComprobada.getMonth() === mes - 1 &&
    fechaComprobada.getDate() === dia
  );
}

// Valida los datos de un hábito y devuelve un objeto con los errores
export function validarHabito(datos) {
  const errores = {};

  if (!datos || typeof datos !== "object" || Array.isArray(datos)) {
    return { datos: "Debes enviar un objeto JSON válido." };
  }

  // Nombre de la persona
  if (typeof datos.nombre !== "string" || !datos.nombre.trim()) {
    errores.nombre = "El nombre es obligatorio.";
  } else {
    const nombre = datos.nombre.trim();

    if (nombre.length < 3 || nombre.length > 60) {
      errores.nombre = "El nombre debe tener entre 3 y 60 caracteres.";
    }
  }

  // Correo electrónico
  if (typeof datos.email !== "string" || !datos.email.trim()) {
    errores.email = "El correo electrónico es obligatorio.";
  } else {
    const email = datos.email.trim();
    const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formatoEmail.test(email)) {
      errores.email = "El correo electrónico no tiene un formato válido.";
    }
  }

  // Nombre del hábito
  if (typeof datos.habito !== "string" || !datos.habito.trim()) {
    errores.habito = "El hábito es obligatorio.";
  } else {
    const habito = datos.habito.trim();

    if (habito.length < 3 || habito.length > 50) {
      errores.habito = "El hábito debe tener entre 3 y 50 caracteres.";
    }
  }

  // Descripción
  if (
    typeof datos.descripcion !== "string" ||
    !datos.descripcion.trim()
  ) {
    errores.descripcion = "La descripción es obligatoria.";
  } else {
    const descripcion = datos.descripcion.trim();

    if (descripcion.length < 10 || descripcion.length > 300) {
      errores.descripcion =
        "La descripción debe tener entre 10 y 300 caracteres.";
    }
  }

  // Fecha
  if (!fechaValida(datos.fecha)) {
    errores.fecha = "Debes ingresar una fecha real con formato YYYY-MM-DD.";
  } else if (datos.fecha > hoyLocal()) {
    errores.fecha = "La fecha no puede ser futura.";
  }

  // Categoría
  if (
    typeof datos.categoria !== "string" ||
    !CATEGORIAS_VALIDAS.includes(datos.categoria.trim())
  ) {
    errores.categoria =
      `La categoría debe ser una de estas: ${CATEGORIAS_VALIDAS.join(", ")}.`;
  }

  return errores;
}

export { CATEGORIAS_VALIDAS };
