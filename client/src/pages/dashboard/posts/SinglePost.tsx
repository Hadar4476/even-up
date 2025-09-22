import { useParams } from "react-router-dom";

const SinglePost = () => {
  const { postId } = useParams<{ postId: string }>();

  return (
    <div>
      <h1>SinglePost (Private)</h1>
      <p>Post ID: {postId}</p>
    </div>
  );
};

export default SinglePost;
