import "./comments.css";
import { useQuery } from "@tanstack/react-query";
import apiRequest from "../../utils/apiRequest";
import Comment from "./comment";
import CommentForm from "./commentForm";

const Comments = ({ id }) => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["comments", id],
    queryFn: () => apiRequest.get(`/comment/${id}`).then((res) => res.data),
    enabled: Boolean(id),
  });

  if (isLoading) return "Loading...";

  if (isError) return "An error has occurred: " + error?.message;

  const comments = Array.isArray(data) ? data : data?.comments ?? [];

  return (
    <div className="comments">
      <div className="commentList">
        <span className="commentCount">
          {comments.length === 0 ? "No comments" : comments.length + " Comments"}
        </span>
        {/* COMMENT */}
        {comments.map((comment) => (
          <Comment key={comment._id || comment.id} comment={comment} />
        ))}
      </div>
      <CommentForm id={id} />
    </div>
  );
};

export default Comments;