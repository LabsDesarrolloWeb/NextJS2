import Post from "./components/Post/Post";

type PostType = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

// =============================================
// REPASO DE TYPESCRIPT — Interfaces, Arreglos y JSON
// Todo se ve en la terminal (console.log)
// =============================================

// --- 1) Interface: define la forma de un objeto ---
// A diferencia de "type", interface se puede extender despues.
interface Producto {
  id: number;
  nombre: string;
  precio: number;
  disponible: boolean;
};

// --- 2) Extender una interface ---
// Agregamos campos extra sin tocar la original.
interface ProductoConCategoria extends Producto {
  categoria: string;
};

function repasoTypeScript() {
  console.log("========== REPASO TYPESCRIPT ==========");
  let mensaje: string = "Hola, TypeScript!";
  console.log(mensaje);
  // --- 3) Crear un objeto que cumpla la interface ---
  const laptop: Producto = {
    id: 1,
    nombre: "Laptop",
    precio: 15000,
    disponible: true,
  };
  console.log("--- Paso 1: Objeto con interface ---");
  console.log("laptop:", laptop);

  // --- 4) Objeto con interface extendida ---
  const mouse: ProductoConCategoria = {
    id: 2,
    nombre: "Mouse inalambrico",
    precio: 350,
    disponible: true,
    categoria: "Accesorios",
  };
  console.log("--- Paso 2: Interface extendida ---");
  console.log("mouse:", mouse);
  console.log("mouse.categoria:", mouse.categoria);
  // --- 5) Arreglo tipado de objetos ---
  // El tipo Producto[] garantiza que cada elemento cumple la interface.
  interface Producto {
  id: number;
  nombre: string;
  precio: number;
  disponible: boolean;
}
  const inventario: Producto[] = [
    laptop,
    { id: 3, nombre: "Teclado", precio: 800, disponible: false },
    { id: 4, nombre: "Monitor", precio: 5200, disponible: true },
  ];
  console.log("--- Paso 3: Arreglo tipado (Producto[]) ---");
  console.log("inventario:", inventario);

  // --- 6) Recorrer arreglo con .map ---
  const nombres: string[] = inventario.map((p) => p.nombre);
  console.log("--- Paso 4: .map — solo nombres ---");
  console.log("nombres:", nombres);

  // --- 7) Filtrar arreglo con .filter ---
  const disponibles: Producto[] = inventario.filter((p) => p.disponible);
  console.log("--- Paso 5: .filter — solo disponibles ---");
  console.log("disponibles:", disponibles);

  // --- 8) Buscar un elemento con .find ---
  const teclado: Producto | undefined = inventario.find(
    (p) => p.nombre === "Teclado"
  );
  console.log("--- Paso 6: .find — buscar Teclado ---");
  console.log("teclado:", teclado);

  // --- 9) Convertir a JSON (serializar) ---
  // JSON.stringify convierte un objeto/arreglo a texto JSON.
  const inventarioJSON: string = JSON.stringify(inventario, null, 2);
  console.log("--- Paso 7: JSON.stringify ---");
  console.log("inventarioJSON:", inventarioJSON);

  // --- 10) Parsear JSON de vuelta a objeto tipado ---
  // JSON.parse devuelve "any", asi que le asignamos el tipo manualmente.
  const parseado: Producto[] = JSON.parse(inventarioJSON);
  console.log("--- Paso 8: JSON.parse ---");
  console.log("parseado:", parseado);
  console.log("primer producto parseado:", parseado[0].nombre);

  console.log("========== FIN REPASO ==========");
}

// Ejecutar el repaso al cargar la pagina (aparece en la terminal del servidor)
repasoTypeScript();

async function getPosts(): Promise<PostType[]> {
  
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");

  if (!response.ok) {
    throw new Error("No se pudieron cargar los posts");
  }
  console.log("Posts cargados correctamente");
  console.log("Response status:", response.status);
  console.log("Response headers:", response.headers);
  const data: PostType[] = await response.json();
  console.log("Response JSON:", data);

  return data;
}

export default async function Home() {
  const posts = await getPosts();
  const firstPost = posts[0];

  return (
    <main className="container">
      <section>
        <div className="post-list">
          {posts.slice(0, 3).map((post) => (
            <Post
              key={post.id}
              userId={post.userId}
              id={post.id}
              title={post.title}
              body={post.body}
            />
          ))} 
          
        </div>
      </section>
    </main>
  );
}
