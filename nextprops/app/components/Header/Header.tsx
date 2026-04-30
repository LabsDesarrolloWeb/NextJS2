// =============================================================
// Header.tsx
// -------------------------------------------------------------
// Usamos `Link` de "next/link" para navegar entre rutas.
// Link es el equivalente en Next.js a <Link> de react-router-dom:
//   - Renderiza un <a> en el HTML final (accesible y SEO-friendly).
//   - Hace navegacion client-side (sin recargar toda la pagina).
//   - Prefetch automatico de la ruta destino en produccion.
// =============================================================
import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        {/*
          El titulo tambien lleva al home. Envolver el <h1> en <Link>
          permite que todo el texto sea clickable y navegue a "/".
        */}
        <Link href="/" className={styles.brandLink}>
          <h1>Facebook</h1>
        </Link>
      </div>

      <div className={styles.center}>
        <input type="text" placeholder="Buscar en Facebook" />
      </div>

      <div className={styles.right}>
        {/*
          "Inicio" navega a "/" que en este proyecto es app/page.tsx,
          la pagina que muestra los posts.

          Nota: usamos Link envolviendo el boton para mantener el
          mismo estilo visual y, a la vez, aprovechar la navegacion
          client-side de Next.
        */}
        <Link href="/">
          <button>Inicio</button>
        </Link>

        {/*
          Las rutas siguientes aun no existen como archivos dentro
          de /app, por lo que al hacer click se mostrara la pagina
          404 personalizada (app/not-found.tsx).
          Cuando crees app/amigos/page.tsx, app/mensajes/page.tsx,
          etc., estos enlaces empezaran a funcionar automaticamente.
        */}
        <Link href="/amigos"><button>Amigos</button></Link>
        <Link href="/mensajes"><button>Mensajes</button></Link>
        <Link href="/notificaciones"><button>Notificaciones</button></Link>
        <Link href="/perfil"><button>Perfil</button></Link>
      </div>
    </header>
  );
}