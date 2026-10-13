# HabitLog — contexto para Claude Code

Proyecto académico (Componente Práctico 1, Desarrollo Web, UNEMI). Equipo de 4: Snayder, Bryan, Jenny, Steven.
Tema: **hábitos diarios**. Registrar y consultar hábitos con persona, descripción, fecha y categoría.

## Cómo debes trabajar

- Responde en español. Explica las decisiones en lenguaje simple.
- **Trabaja solo en el módulo y la etapa que te indique en el mensaje.** No toques archivos de otros módulos
  sin preguntar. Cada integrante debe escribir y explicar su propia parte.
- Antes de escribir código, presenta un plan corto y espera aprobación.
- Cambios pequeños, un paso a la vez. Al terminar cada paso, sugiere el mensaje de commit (no hagas commit tú).
- No agregues dependencias. Las únicas permitidas son `express` y `cors` (backend) y `react-router` (frontend).
  Para HTTP se usa `fetch`, no axios. Para IDs, `randomUUID` de `node:crypto`.
- No inventes APIs ni resultados. Si no estás seguro de algo, dilo.
- Nunca pongas credenciales en el código. Configuración por variables de entorno.

## Stack y estructura

- Frontend: React + Vite, SPA con React Router. Puerto 5173.
- Backend: Node.js + Express, ES Modules (`"type": "module"`). Puerto 3001.
- Almacenamiento: archivo `backend/data/habitos.json` (ignorado en git).

```text
habitlog/
├── backend/src/
│   ├── server.js              (Snayder)
│   ├── storage/storage.js     (Snayder)
│   ├── routes/registros.js    (Bryan)
│   └── validation/validarHabito.js (Bryan)
├── frontend/src/
│   ├── App.jsx, main.jsx, index.css     (Jenny)
│   ├── components/Menu.jsx, Mensaje.jsx, TarjetaRegistro.jsx (Jenny)
│   ├── components/FormularioHabito.jsx  (Steven)
│   ├── pages/Inicio.jsx, Lista.jsx      (Jenny)
│   ├── pages/Registro.jsx               (Steven)
│   ├── services/api.js                  (Jenny)
│   ├── constants/categorias.js          (Jenny)
│   └── utils/validarFormulario.js       (Steven)
└── README.md                            (Snayder)
```

## Contrato de datos (no cambiar sin avisar)

```json
{
  "id": "uuid generado por el backend",
  "nombre": "Ana Pérez",
  "email": "ana@correo.com",
  "habito": "Leer 20 minutos",
  "descripcion": "Leí antes de dormir, capítulo 3",
  "fecha": "2026-10-12",
  "categoria": "Estudio",
  "creadoEn": "2026-10-12T22:15:00.000Z"
}
```

`id` y `creadoEn` los genera solo el backend. El backend guarda únicamente los campos permitidos, nunca `req.body` completo.

## Reglas de validación (idénticas en frontend y backend)

| Campo | Regla |
| --- | --- |
| nombre | obligatorio, 3–60 caracteres tras `trim` |
| email | obligatorio, formato válido |
| habito | obligatorio, 3–50 caracteres |
| descripcion | obligatoria, 10–300 caracteres |
| fecha | obligatoria, `YYYY-MM-DD`, fecha real (rechazar 2026-02-30), no futura |
| categoria | una de: Salud, Ejercicio, Alimentación, Sueño, Estudio, Bienestar emocional, Productividad, Otro |

**Fechas:** nunca usar `new Date("YYYY-MM-DD")` para comparar ni mostrar (se interpreta en UTC y en Ecuador da el día
anterior). Comparar como texto contra la fecha de hoy en hora local construida con `getFullYear/getMonth/getDate`.

## API

| Método y ruta | Éxito | Error |
| --- | --- | --- |
| `GET /registros` | 200, arreglo ordenado por `creadoEn` descendente | 500 |
| `POST /registros` | 201, registro creado | 400 `{ "error": "Datos inválidos", "detalles": { "campo": "mensaje" } }` / 500 |

- JSON mal formado en el body → 400.
- Errores 500 con mensaje genérico; el detalle solo en consola. No exponer rutas ni stack.
- CORS limitado a `FRONTEND_ORIGIN` (por defecto `http://localhost:5173`).
- El servidor no debe caerse por errores de lectura o escritura del archivo.

## Almacenamiento

- Si `habitos.json` no existe, crearlo con `[]`.
- Si existe pero está corrupto, lanzar error controlado; no devolver `[]` (se perderían datos al siguiente POST).
- Escritura segura: escribir en `.tmp` y luego `rename`.
- Ruta del archivo construida con `import.meta.url`, no relativa al directorio de ejecución.

## Frontend

- Rutas: `/` (bienvenida), `/registro` (formulario), `/lista` (consulta), `*` (no encontrada).
- URL de la API desde `import.meta.env.VITE_API_URL`; ejemplo en `frontend/.env.example`.
- `fetch` no lanza error con 400/500: revisar `res.ok` y lanzar un error con `detalles`.
- Lista: estados de carga, error con reintentar, lista vacía y lista. `key` = `id`.
- Formulario: inputs controlados, errores por campo con `aria-invalid`, botón deshabilitado mientras envía,
  errores 400 del servidor mapeados a sus campos, no borrar lo escrito si falla la conexión.
- Diseño adaptable a pantallas de 375 px.

## Convenciones

- Ramas `feat/...`, PR a `main` revisado por otro integrante.
- Commits: `feat:`, `fix:`, `docs:`, `test:`, `style:`, `chore:`. Mensajes en español.
- Comandos: `npm run dev` en `backend/` y en `frontend/`.
