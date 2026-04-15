# Proyecto Basico: Props + Plantilla en Next.js

Practica simple para aprender:

- Como consumir una API externa.
- Como usar props en TypeScript.
- Como crear un componente tipo plantilla para reutilizar HTML.
- Como renderizar 1 elemento y luego varios con map.

API usada:

- https://jsonplaceholder.typicode.com/posts

## Estructura clave

- `app/page.tsx`: llamada a la API, tipo `Post`, componente `PostCard` y render.
- `app/globals.css`: estilos basicos para que se vea claro.

## Ejecutar proyecto

```bash
npm install
npm run dev
```

Abrir en navegador:

- http://localhost:3000

## Que se muestra

1. Seccion 1: renderiza solo el primer post.
2. Seccion 2: muestra la forma de renderizar varios posts usando `map`.

## Idea principal de props

El componente `PostCard` recibe un `post` por props:

```tsx
function PostCard({ post }: { post: Post }) {
	return (
		<article>
			<h2>{post.title}</h2>
			<p>{post.body}</p>
		</article>
	);
}
```

Despues lo reutilizas:

```tsx
<PostCard post={firstPost} />
```

Y para muchos:

```tsx
{posts.slice(0, 3).map((post) => (
	<PostCard key={post.id} post={post} />
))}
```
