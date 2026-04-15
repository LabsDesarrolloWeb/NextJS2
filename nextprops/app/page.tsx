type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

async function getPosts(): Promise<Post[]> {
  
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");

  if (!response.ok) {
    throw new Error("No se pudieron cargar los posts");
  }
  console.log("Posts cargados correctamente");
  console.log("Response status:", response.status);
  console.log("Response headers:", response.headers);
  const data: Post[] = await response.json();
  console.log("Response JSON:", data);

  return data;
}

function PostCard({ post }: { post: Post }) {
  return (
    <article className="post-card">
      <p className="post-id">Post #{post.id}</p>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </article>
  );
}

export default async function Home() {
  const posts = await getPosts();
  const firstPost = posts[0];

  return (
    <main className="container">
      <h1>Practica de Props + Plantilla</h1>

      <section>
        <h3>1) Renderizar solo 1 post</h3>
        {firstPost ? <PostCard post={firstPost} /> : <p>No hay posts.</p>}
      </section>

      <section>
        <h3>2) Forma de renderizar mas de 1</h3>
        <div className="post-list">
          {posts.slice(0, 3).map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </main>
  );
}
