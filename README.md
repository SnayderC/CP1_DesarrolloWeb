# HabitLog

Aplicación web para registrar y consultar **hábitos diarios**. Cada registro guarda quién realizó el hábito, qué hizo,
una descripción, la fecha y una categoría.

Proyecto del **Componente Práctico 1** de la asignatura Desarrollo Web — Universidad Estatal de Milagro (UNEMI).

## Integrantes

| Integrante | Responsabilidad |
| --- | --- |
| Snayder | Servidor Express, almacenamiento en archivo JSON, documentación |
| Bryan | Rutas de la API y validación en el backend |
| Jenny | Estructura del frontend, enrutamiento, menú, página de inicio, lista y servicio de API |
| Steven | Formulario de registro y validación en el frontend |

## Tecnologías

- **Frontend:** React + Vite, React Router (SPA).
- **Backend:** Node.js + Express, con ES Modules.
- **Almacenamiento:** archivo `backend/data/habitos.json`.

## Requisitos

- Node.js **22.9 o superior** (el backend usa `--env-file-if-exists` para leer el `.env`).
- npm.

## Instalación y ejecución

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/SnayderC/CP1_DesarrolloWeb.git
   cd CP1_DesarrolloWeb
   ```

2. Backend (terminal 1):

   ```bash
   cd backend
   npm install
   cp .env.example .env
   npm run dev
   ```

   El servidor queda en `http://localhost:3001`. Para comprobarlo, abrir `http://localhost:3001/salud`, que responde
   `{"ok":true}`.

3. Frontend (terminal 2):

   ```bash
   cd frontend
   npm install
   cp .env.example .env
   npm run dev
   ```

   La aplicación queda en `http://localhost:5173`.

> Copiar los `.env` es opcional: si no existen, se usan los mismos valores por defecto.
> Si el puerto 5173 está ocupado, Vite muestra un error en lugar de cambiar de puerto, porque el backend solo acepta
> peticiones de ese origen (ver variables de entorno).

### Scripts disponibles

| Carpeta | Comando | Qué hace |
| --- | --- | --- |
| `backend` | `npm run dev` | Inicia el servidor, lee el `.env` y se reinicia al guardar cambios |
| `backend` | `npm start` | Inicia el servidor sin reinicio automático (las variables se toman del entorno) |
| `frontend` | `npm run dev` | Inicia la aplicación en modo desarrollo |
| `frontend` | `npm run build` | Genera la versión de producción en `frontend/dist` |
| `frontend` | `npm run lint` | Revisa el código con oxlint |

## Variables de entorno

| Variable | Archivo | Valor por defecto | Descripción |
| --- | --- | --- | --- |
| `PORT` | `backend/.env` | `3001` | Puerto del servidor |
| `FRONTEND_ORIGIN` | `backend/.env` | `http://localhost:5173` | Orígenes permitidos por CORS, separados por comas |
| `VITE_API_URL` | `frontend/.env` | `http://localhost:3001` | URL de la API que usa el frontend |

Los archivos `.env` no se suben al repositorio; cada uno tiene su `.env.example` como plantilla.

## Pantallas

| Ruta | Pantalla |
| --- | --- |
| `/` | Bienvenida, con accesos a registrar y consultar |
| `/registro` | Formulario para registrar un hábito |
| `/lista` | Hábitos registrados, del más reciente al más antiguo |
| cualquier otra | Página no encontrada |

## API

URL base: `http://localhost:3001`

| Método y ruta | Respuesta correcta | Errores |
| --- | --- | --- |
| `GET /registros` | `200` con el arreglo de registros, ordenado por `creadoEn` descendente | `500` |
| `POST /registros` | `201` con el registro creado | `400` datos inválidos o JSON mal formado, `500` |
| `GET /salud` | `200` `{"ok":true}` | — |

### Ejemplo: crear un registro

```http
POST /registros
Content-Type: application/json

{
  "nombre": "Ana Pérez",
  "email": "ana@correo.com",
  "habito": "Leer 20 minutos",
  "descripcion": "Leí antes de dormir, capítulo 3",
  "fecha": "2026-10-12",
  "categoria": "Estudio"
}
```

Respuesta `201`:

```json
{
  "id": "1b9cef53-389c-4ca9-949f-a057a706034e",
  "nombre": "Ana Pérez",
  "email": "ana@correo.com",
  "habito": "Leer 20 minutos",
  "descripcion": "Leí antes de dormir, capítulo 3",
  "fecha": "2026-10-12",
  "categoria": "Estudio",
  "creadoEn": "2026-10-12T22:15:00.000Z"
}
```

`id` y `creadoEn` los genera el servidor. Cualquier otro campo enviado se ignora.

### Ejemplo: datos inválidos

Respuesta `400`, con un mensaje por cada campo con error:

```json
{
  "error": "Datos inválidos",
  "detalles": {
    "email": "El correo electrónico no tiene un formato válido.",
    "fecha": "La fecha no puede ser futura."
  }
}
```

Si el cuerpo no es un JSON válido, la respuesta es `400` con `{ "error": "JSON mal formado" }`.

El archivo `backend/pruebas.http` contiene peticiones de prueba listas para ejecutar con la extensión REST Client de
VS Code.

## Validaciones

Las mismas reglas se aplican en el formulario y en el servidor:

| Campo | Regla |
| --- | --- |
| `nombre` | Obligatorio, entre 3 y 60 caracteres (sin contar espacios al inicio y al final) |
| `email` | Obligatorio, con formato de correo válido |
| `habito` | Obligatorio, entre 3 y 50 caracteres |
| `descripcion` | Obligatoria, entre 10 y 300 caracteres |
| `fecha` | Obligatoria, formato `YYYY-MM-DD`, fecha real (no acepta `2026-02-30`) y no futura |
| `categoria` | Una de: Salud, Ejercicio, Alimentación, Sueño, Estudio, Bienestar emocional, Productividad, Otro |

## Estructura del proyecto

```text
CP1_DesarrolloWeb/
├── backend/
│   ├── data/                      # habitos.json (se crea al usar la API; no se sube al repositorio)
│   ├── src/
│   │   ├── server.js              # configuración de Express, CORS y manejo de errores
│   │   ├── routes/registros.js    # GET y POST /registros
│   │   ├── storage/storage.js     # lectura y escritura del archivo JSON
│   │   └── validation/validarHabito.js
│   ├── pruebas.http               # peticiones de prueba
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── App.jsx, main.jsx, index.css
    │   ├── components/            # Menu, Mensaje, TarjetaRegistro, FormularioHabito
    │   ├── pages/                 # Inicio, Registro, Lista
    │   ├── services/api.js        # llamadas a la API con fetch
    │   ├── constants/categorias.js
    │   └── utils/validarFormulario.js
    └── .env.example
```

## Decisiones técnicas

- **Escritura segura del archivo:** los datos se escriben primero en `habitos.json.tmp` y luego se renombran a
  `habitos.json`. Si el proceso se interrumpe, el archivo original queda intacto.
- **Escrituras en orden:** las peticiones `POST` simultáneas se guardan una detrás de otra, para que ninguna borre el
  registro de otra.
- **Archivo corrupto:** si `habitos.json` no contiene un JSON válido, el servidor responde `500` y no lo modifica,
  para no perder los datos existentes. Si el archivo no existe, se crea vacío (`[]`).
- **Fechas sin desfase de zona horaria:** las fechas se comparan como texto `YYYY-MM-DD` contra la fecha local de hoy.
  No se usa `new Date("YYYY-MM-DD")`, que se interpreta en UTC y en Ecuador mostraría el día anterior.
- **Seguridad:** el servidor guarda solo los campos permitidos, CORS acepta únicamente el origen del frontend y los
  errores internos responden con un mensaje genérico (el detalle queda solo en la consola del servidor).

## Flujo de trabajo

- Cada funcionalidad se desarrolló en una rama `feat/...` y se integró a `main` mediante pull request.
- Los mensajes de commit siguen el formato `tipo: descripción` en español, con los tipos `feat`, `fix`, `docs`,
  `style`, `test` y `chore`.
