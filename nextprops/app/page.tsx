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



// Ejecutar el repaso al cargar la pagina (aparece en la terminal del servidor)

async function getPosts(): Promise<PostType[]> {
  
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");

  if (!response.ok) {
    throw new Error("No se pudieron cargar los posts");
  }
  const data: PostType[] = await response.json();

  return data;
}

export default async function Home() {
  const posts = await getPosts();
  const firstPost = posts[0];

  return (
    <main className="container">
      <section>
        <div className="post-list">
          {posts.slice(0, 8).map((post) => (
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
