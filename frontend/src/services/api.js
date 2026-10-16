const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

// fetch solo lanza error si no hay conexión; en ese caso damos un mensaje claro
async function pedir(url, opciones) {
  try {
    return await fetch(url, opciones);
  } catch {
    throw new Error("No se pudo conectar con el servidor. Intenta de nuevo.");
  }
}

async function manejarRespuesta(res) {
  const cuerpo = await res.json().catch(() => null);
  if (!res.ok) {
    const error = new Error(cuerpo?.error ?? "Error del servidor");
    error.detalles = cuerpo?.detalles ?? {};
    throw error;
  }
  return cuerpo;
}

export async function obtenerHabitos() {
  return manejarRespuesta(await pedir(`${API_URL}/registros`));
}

export async function crearHabito(datos) {
  const res = await pedir(`${API_URL}/registros`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });
  return manejarRespuesta(res);
}