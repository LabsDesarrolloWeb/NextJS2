
// Paso 1: Importamos el cliente de Supabase que creamos en lib/supabase.ts
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

// Paso 4: Componente de página (Server Component por defecto en Next.js App Router)
export default async function Amigos() {
  // Llamamos a la función para obtener los datos
  const amigos = await getAmigos();

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Mis Amigos</h1>

      {/* Si no hay amigos, mostramos un mensaje */}
      {amigos.length === 0 && <p className="text-gray-500 text-center">No se encontraron amigos.</p>}

      {/* Paso 5: Grid responsive de tarjetas de amigos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {amigos.map((amigo) => (
          <div
            key={amigo.id}
            className="p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                {amigo.nombre[0]}{amigo.apellido[0]}
              </div>
              <div>
                <p className="font-semibold">{amigo.nombre} {amigo.apellido}</p>
                <p className="text-xs text-gray-400">@{amigo.apodo}</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">{amigo.email}</p>
            <p className="text-sm text-gray-400 mt-1">{amigo.telefono}</p>
          </div>
        ))}
      </div>
    </div>
  );
}