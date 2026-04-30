// =============================================================
// app/not-found.tsx — Pagina 404 personalizada (App Router)
// -------------------------------------------------------------
// En Next.js (App Router) NO se usa una libreria como react-router.
// El "router" es el sistema de archivos dentro de la carpeta /app:
//   - app/page.tsx          -> ruta "/"
//   - app/posts/page.tsx    -> ruta "/posts"
//   - app/users/[id]/page.tsx -> ruta "/users/:id"
//
// Archivos especiales que Next reconoce automaticamente:
//   - layout.tsx     -> layout compartido por las rutas hijas
//   - page.tsx       -> contenido de la ruta
//   - loading.tsx    -> UI mientras carga
//   - error.tsx      -> UI cuando hay un error
//   - not-found.tsx  -> UI cuando la ruta no existe (este archivo)
//
// Este componente se renderiza automaticamente cuando:
//   1) El usuario entra a una URL que no existe (ej: /cualquier-cosa).
//   2) Algun componente llama a la funcion notFound() de "next/navigation".
// =============================================================

import Link from "next/link";

export default function NotFound() {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "80px 20px",
        gap: "16px",
      }}
    >
      <h1 style={{ fontSize: "72px", margin: 0 }}>404</h1>
      <h2 style={{ margin: 0 }}>Pagina no encontrada</h2>
      <p style={{ color: "#555", maxWidth: 480 }}>
        La ruta a la que intentas acceder no existe o fue movida.
      </p>

      {/*
        Link es el componente de Next equivalente a <a>, pero hace
        navegacion del lado del cliente (sin recargar la pagina).
        Es el reemplazo de <Link> de react-router-dom.
      */}
      <Link
        href="/"
        style={{
          marginTop: "12px",
          padding: "10px 20px",
          backgroundColor: "#4267B2",
          color: "white",
          borderRadius: "6px",
          textDecoration: "none",
        }}
      >
        Volver al inicio
      </Link>
    </main>
  );
}
