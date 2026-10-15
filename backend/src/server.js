import express from "express";
import cors from "cors";
import registrosRouter from "./routes/registros.js";

// Configuración desde variables de entorno (con valores por defecto para desarrollo)
const PORT = process.env.PORT || 3001;
const FRONTEND_ORIGINS = (process.env.FRONTEND_ORIGIN || "http://localhost:5173,http://localhost:5174")
  .split(",")
  .map((valor) => valor.trim())
  .filter(Boolean);

const app = express();

// Acepta los orígenes del frontend en desarrollo y evita bloqueos por CORS
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || FRONTEND_ORIGINS.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error("Origen no permitido por CORS"));
    },
  })
);

// Convierte el body JSON de las peticiones en req.body
app.use(express.json());

// Ruta de prueba para comprobar que el servidor está funcionando
app.get("/salud", (req, res) => {
  res.json({ ok: true });
});
;
app.use("/registros", registrosRouter);
// import registrosRouter from "./routes/registros.js";
// app.use("/registros", registrosRouter);

// Cualquier ruta que no exista
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Manejador final de errores: siempre responde, nunca deja caer el servidor
app.use((err, req, res, next) => {
  // JSON mal formado en el body
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ error: "JSON mal formado" });
  }

  // El detalle solo en consola; al cliente, un mensaje genérico
  console.error(err);
  res.status(500).json({ error: "Error interno del servidor" });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
