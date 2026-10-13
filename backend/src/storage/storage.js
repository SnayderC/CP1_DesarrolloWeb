import { readFile, writeFile, rename, mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

// Ruta calculada desde este archivo, no desde la carpeta donde se ejecuta node
const RUTA_ARCHIVO = fileURLToPath(new URL("../../data/habitos.json", import.meta.url));
const RUTA_TEMPORAL = `${RUTA_ARCHIVO}.tmp`;

// Fila de escrituras: cada agregarRegistro espera a que termine el anterior
let cola = Promise.resolve();

// Crea el archivo con [] solo si no existe (flag "wx" nunca sobrescribe)
async function crearArchivoVacio() {
  await mkdir(dirname(RUTA_ARCHIVO), { recursive: true });
  try {
    await writeFile(RUTA_ARCHIVO, "[]", { encoding: "utf8", flag: "wx" });
  } catch (err) {
    if (err.code !== "EEXIST") throw err;
  }
}

// Escritura segura: primero el temporal, luego se renombra encima del original
async function escribirRegistros(registros) {
  await writeFile(RUTA_TEMPORAL, JSON.stringify(registros, null, 2), "utf8");
  await rename(RUTA_TEMPORAL, RUTA_ARCHIVO);
}

export async function leerRegistros() {
  let contenido;
  try {
    contenido = await readFile(RUTA_ARCHIVO, "utf8");
  } catch (err) {
    if (err.code === "ENOENT") {
      await crearArchivoVacio();
      return [];
    }
    throw err;
  }

  // Si está corrupto se lanza error: devolver [] haría perder los datos en el siguiente POST
  let datos;
  try {
    datos = JSON.parse(contenido);
  } catch (err) {
    throw new Error("habitos.json está corrupto", { cause: err });
  }
  if (!Array.isArray(datos)) {
    throw new Error("habitos.json está corrupto: no contiene un arreglo");
  }
  return datos;
}

export function agregarRegistro(registro) {
  const tarea = cola.then(async () => {
    const registros = await leerRegistros();
    registros.push(registro);
    await escribirRegistros(registros);
    return registro;
  });
  // Si una escritura falla, la fila sigue funcionando para las siguientes
  cola = tarea.catch(() => {});
  return tarea;
}
