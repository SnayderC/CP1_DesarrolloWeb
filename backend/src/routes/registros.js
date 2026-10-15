
import { Router } from "express";
import { randomUUID } from "node:crypto";
import { leerRegistros, agregarRegistro } from "../storage/storage.js";
import { validarHabito } from "../validation/validarHabito.js";

const router = Router();

// GET /registros: consultar todos los hábitos
router.get("/", async (req, res, next) => {
  try {
    const registros = await leerRegistros();

    registros.sort(
      (a, b) => new Date(b.creadoEn) - new Date(a.creadoEn)
    );

    return res.status(200).json(registros);
  } catch (error) {
    next(error);
  }
});

// POST /registros: registrar un hábito nuevo
router.post("/", async (req, res, next) => {
  try {
    const errores = validarHabito(req.body);

    if (Object.keys(errores).length > 0) {
      return res.status(400).json({
        error: "Los datos enviados no son válidos.",
        detalles: errores,
      });
    }

    // Construimos el registro con los campos permitidos.
    // No confiamos en un ID ni en creadoEn enviados por el cliente.
    const registro = {
      id: randomUUID(),
      nombre: req.body.nombre.trim(),
      email: req.body.email.trim(),
      habito: req.body.habito.trim(),
      descripcion: req.body.descripcion.trim(),
      fecha: req.body.fecha,
      categoria: req.body.categoria.trim(),
      creadoEn: new Date().toISOString(),
    };

    const registroGuardado = await agregarRegistro(registro);

    return res.status(201).json(registroGuardado);
  } catch (error) {
    next(error);
  }
});

export default router;
