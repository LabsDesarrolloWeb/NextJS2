import styles from "./Post.module.css";
import Comment from "../Comment/Comment";

type PostProps = {
  userId: number;
  id: number;
  title: string;
  body: string;
};
type CommentProps = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};




async function getComments(postId: number): Promise<CommentProps[]> {
  
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);

  if (!response.ok) {
    throw new Error("No se pudieron cargar los comentarios");
  }
  console.log("Comentarios cargados correctamente");
  console.log("Response status:", response.status);
  console.log("Response headers:", response.headers);
  const data: CommentProps[] = await response.json();
  console.log("Response JSON:", data);

  return data;
}



export default async function Post({ userId, id, title, body }: PostProps) {
  
  const comments = await getComments(id);
  const firstComment = comments[0];
  return (
    <div  className={styles.card}>
      <span className={styles.postId}>ActivePost #{id}</span>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.body}>{body}</p>
        {comments.slice(0, 3).map((comment) => (
            <Comment
              key={comment.id}
              postId={comment.postId}
              id={comment.id}
              name={comment.name}
              email={comment.email}
              body={comment.body}
            />
          ))}

    </div>
  );
}
