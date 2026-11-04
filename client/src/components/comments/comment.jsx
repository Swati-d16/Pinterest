import Image from "../image/image";
import {format} from "timeago.js" 

const Comment = ({ comment }) => {
  const author =
    comment && typeof comment.user === "object" && comment.user !== null
      ? comment.user
      : null;

  return (
    <div className="comment">
      <Image path={author?.img || "/general/noAvatar.png"} alt="" />
      <div className="commentContent">
        <span className="commentUsername">
          {author?.displayName || author?.username || "Anonymous"}
        </span>
        <p className="commentText">{comment.description}</p>
        <span className="commentTime">{format(comment.createdAt)}</span>
      </div>
    </div>
  );
};

export default Comment;
