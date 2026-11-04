import "./postPage.css";
import Image from "../../components/image/image";
import PostInteraction from "../../components/postInteraction/postInteraction";  
import Comments from "../../components/comments/comments";   
import { Link, useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import apiRequest from "../../utils/apiRequest";

const PostPage = () => {
  const { id } = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ["pin", id],
    queryFn: () => apiRequest.get(`/pin/${id}`).then((res) => res.data),
  });

  const navigate = useNavigate();

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  if (!data) return "Pin not found!";

  const author =
    data.user && typeof data.user === "object" ? data.user : null;

  console.log(data)
  return (
    <div className="postPage">
        <svg
        onClick={() => navigate('/')}
        role="button"
        aria-label="Go back home"
        height="20"
        viewBox="0 0 24 24"
        width="20"
        style={{ cursor: "pointer" }}
      >
        <path d="M8.41 4.59a2 2 0 1 1 2.83 2.82L8.66 10H21a2 2 0 0 1 0 4H8.66l2.58 2.59a2 2 0 1 1-2.82 2.82L1 12z" />
      </svg>
        <div className="postContainer">
            <div className="postImg">
                <Image src={data.media} alt="" w={736} /> 
            </div>
            <div className="postDetails">
                <PostInteraction postId={id}/>
          {author ? (
            <Link to={`/${author.username}`} className="postUser">
              <Image path={author.img || "/general/noAvatar.png"} />
              <span>{author.displayName || author.username}</span>
            </Link>
          ) : (
            <div className="postUser">
              <Image path="/general/noAvatar.png" />
              <span>Unknown User</span>
            </div>
          )}
          <Comments id={data._id}/>
            </div>
        </div>
    </div>
  );
};

export default PostPage;