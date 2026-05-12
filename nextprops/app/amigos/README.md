# Tutorial: Conectar Supabase con Next.js (App Router)

## ¿Qué vamos a hacer?

Vamos a consumir datos de una tabla llamada `amigos` que vive en Supabase (una base de datos en la nube) y mostrarlos en una página de Next.js.

---

## Requisitos previos

- Node.js instalado
- Un proyecto de Next.js con App Router funcionando
- Una cuenta en [Supabase](https://supabase.com)

---

## Paso 1: Crear la tabla en Supabase

1. Ve a [supabase.com/dashboard](https://supabase.com/dashboard) y crea un proyecto (o usa uno existente).
2. En el menú lateral, ve a **SQL Editor**.
3. Ejecuta el siguiente SQL para crear la tabla:

```sql
CREATE TABLE amigos (
  id SERIAL PRIMARY KEY,
  nombre TEXT,
  apellido TEXT,
  apodo TEXT,
  email TEXT,
  telefono TEXT,
  fecha_nacimiento DATE
);
```

4. Inserta datos de ejemplo:

```sql
INSERT INTO amigos (nombre, apellido, apodo, email, telefono, fecha_nacimiento)
VALUES 
('Alejandro', 'García', 'Alex', 'alex.garcia@email.com', '+34600111222', '1992-05-15'),
('Beatriz', 'López', 'Bea', 'bea.lopez@email.com', '+34600333444', '1995-10-20'),
('Carlos', 'Martínez', 'Charly', 'carlos.mtz@email.com', '+34600555666', '1988-02-10'),
('Diana', 'Pérez', 'Di', 'diana.perez@email.com', '+34600777888', '1993-07-04'),
('Eduardo', 'Sánchez', 'Edu', 'edu.sanchez@email.com', '+34600999000', '1990-12-30'),
('Fernanda', 'Gómez', 'Fer', 'fer.gomez@email.com', '+34611222333', '1996-03-25'),
('Gabriel', 'Ruiz', 'Gabo', 'gabriel.ruiz@email.com', '+34611444555', '1991-08-14'),
('Helena', 'Castro', 'Hele', 'helena.c@email.com', '+34611666777', '1994-01-11'),
('Iván', 'Torres', 'Ivi', 'ivan.torres@email.com', '+34611888999', '1987-06-22'),
('Julia', 'Navarro', 'Jules', 'julia.nav@email.com', '+34611000111', '1992-11-05');
```

---

## Paso 2: Instalar el paquete de Supabase

Abre la terminal en la raíz de tu proyecto Next.js y ejecuta:

```bash
npm install @supabase/supabase-js
```

> Esto instala la librería oficial que nos permite comunicarnos con Supabase desde JavaScript/TypeScript.

---

## Paso 3: Obtener las credenciales de Supabase

1. En el dashboard de Supabase, ve a **Settings** → **API**.
2. Copia estos dos valores:
   - **Project URL** (algo como `https://xxxxx.supabase.co`)
   - **anon public key** (una cadena larga que empieza con `eyJ...`)

> ⚠️ La clave `anon` es pública y segura para usar en el frontend. Nunca expongas la `service_role` key.

---

## Paso 4: Crear el archivo de variables de entorno

Crea un archivo llamado `.env.local` en la raíz del proyecto:

```env
# Variables de entorno para conectar con Supabase
NEXT_PUBLIC_SUPABASE_URL=https://TU-PROYECTO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-aqui
```

Reemplaza los valores con los que copiaste en el paso anterior.

> 📌 El prefijo `NEXT_PUBLIC_` hace que la variable esté disponible tanto en el servidor como en el cliente.

---

## Paso 5: Crear el cliente de Supabase

Crea el archivo `app/lib/supabase.ts`:

```typescript
// Importamos la función para crear el cliente de Supabase
import { createClient } from "@supabase/supabase-js";

// Leemos las variables de entorno (URL y clave anónima)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Creamos y exportamos el cliente de Supabase
// Este cliente se usa para hacer consultas a la base de datos
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

> 🧠 Este archivo centraliza la conexión. Cualquier página o componente que necesite datos de Supabase importa `supabase` desde aquí.

---

## Paso 6: Consumir los datos en una página

Crea o edita el archivo `app/amigos/page.tsx`:

```typescript
// Paso 1: Importamos el cliente de Supabase
import { supabase } from "../lib/supabase";

// Paso 2: Definimos un tipo para los datos de la tabla "amigos"
type Amigo = {
  id: number;
  nombre: string;
  apellido: string;
  apodo: string;
  email: string;
  telefono: string;
  fecha_nacimiento: string;
};

// Paso 3: Función para obtener los amigos desde Supabase
async function getAmigos() {
  // Hacemos un SELECT * a la tabla "amigos"
  const { data, error } = await supabase.from("amigos").select("*");

  // Si hay error, lo mostramos en consola
  if (error) {
    console.error("Error al obtener amigos:", error.message);
    return [];
  }

  // Retornamos los datos tipados
  return data as Amigo[];
}

// Paso 4: Componente de página 
export default async function Amigos() {
  // Llamamos a la función para obtener los datos
  const amigos = await getAmigos();

  return (
    <div>
      <h1>Lista de Amigos</h1>

      {/* Si no hay amigos, mostramos un mensaje */}
      {amigos.length === 0 && <p>No se encontraron amigos.</p>}

      {/* Paso 5: Recorremos el array y mostramos cada amigo */}
      <ul>
        {amigos.map((amigo) => (
          <li key={amigo.id}>
            <strong>{amigo.nombre} {amigo.apellido}</strong> ({amigo.apodo}) —{" "}
            {amigo.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

## Paso 7: Ejecutar el proyecto

```bash
npm run dev
```

Abre tu navegador en [http://localhost:3000/amigos](http://localhost:3000/amigos) y deberías ver la lista de amigos.

---

## Estructura final del proyecto

```
app/
├── lib/
│   └── supabase.ts        ← Cliente de Supabase
├── amigos/
│   └── page.tsx           ← Página que muestra los datos
.env.local                 ← Credenciales (NO se sube a git)
```

---

## Resumen de conceptos clave

| Concepto | Explicación |
|----------|-------------|
| `createClient()` | Crea la conexión con tu proyecto de Supabase |
| `.from("tabla").select("*")` | Equivalente a `SELECT * FROM tabla` en SQL |
| `.env.local` | Archivo de variables secretas que Next.js carga automáticamente |

---

## Paso 8: Configurar variables de entorno en Vercel (Deploy)

El archivo `.env.local` **NO se sube a git** (está en `.gitignore`), por lo que Vercel no lo detecta automáticamente. Debes agregar las variables manualmente:

1. Ve a [vercel.com/dashboard](https://vercel.com/dashboard).
2. Selecciona tu proyecto.
3. Ve a **Settings** → **Environment Variables**.
4. Agrega cada variable:
   - **Name:** `NEXT_PUBLIC_SUPABASE_URL` → **Value:** tu URL de Supabase
   - **Name:** `NEXT_PUBLIC_SUPABASE_ANON_KEY` → **Value:** tu clave anónima
5. En **Environments**, selecciona dónde aplican: `Production`, `Preview`, `Development`.
6. Haz clic en **Save**.

> ⚠️ Después de agregar o modificar variables, necesitas **re-deployar** el proyecto (haz un nuevo push o usa el botón "Redeploy" en Vercel).

### Tip: Sincronizar variables con la CLI de Vercel

Si tienes la CLI de Vercel instalada, puedes descargar las variables del dashboard a tu máquina local:

```bash
# Instalar la CLI (si no la tienes)
npm install -g vercel

# Descargar las variables a .env.local
vercel env pull .env.local
```

Esto es útil para sincronizar variables entre miembros del equipo sin compartir archivos `.env` manualmente.

---

## Solución de problemas comunes

- **"No se encontraron amigos"**: Revisa que las credenciales en `.env.local` sean correctas y que la tabla tenga datos.
- **Error de permisos**: En Supabase ve a **Authentication** → **Policies** y asegúrate de que la tabla `amigos` tenga una policy de lectura habilitada (o desactiva RLS para pruebas).
- **Los cambios en `.env.local` no se reflejan**: Reinicia el servidor de desarrollo (`Ctrl+C` y `npm run dev` de nuevo).
- **Funciona en local pero no en Vercel**: Verifica que las variables estén configuradas en el dashboard de Vercel y que hayas hecho redeploy después de agregarlas.
