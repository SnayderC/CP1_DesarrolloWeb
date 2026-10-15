const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

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
  return manejarRespuesta(await fetch(`${API_URL}/registros`));
}

export async function crearHabito(datos) {
  const res = await fetch(`${API_URL}/registros`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });
  return manejarRespuesta(res);
}