import styles from "./Post.module.css";

type PostProps = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export default function Post({ userId, id, title, body }: PostProps) {
  return (
    <article className={styles.card}>
      Esto es un test
      <p className={styles.postId}>Post #{id}</p>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.body}>{body}</p>
      <p className={styles.userId}>Usuario #{userId}</p>
    </article>
  );
}
