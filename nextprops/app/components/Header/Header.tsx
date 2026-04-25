import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <h1>Facebook</h1>
      </div>
      <div className={styles.center}>
        <input type="text" placeholder="Buscar en Facebook" />
      </div>
      <div className={styles.right}>
        <button>Inicio</button>
        <button>Amigos</button>
        <button>Mensajes</button>
        <button>Notificaciones</button>
        <button>Perfil</button>
      </div>
    </header>
  );
}