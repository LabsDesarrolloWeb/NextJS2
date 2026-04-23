import styles from "./Comment.module.css";

type CommentProps = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};




export default function Comment({ postId, id, name, email, body }: CommentProps) {
  return (
    <div  className={styles.card}>
        <span className={styles.postId}>Comment #{id} (Post #{postId})</span>
        <h2 className={styles.title}>{name}</h2>
        <p className={styles.body}>{body}</p>
        
    </div>
  );
}
