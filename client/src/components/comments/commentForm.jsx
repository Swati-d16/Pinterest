import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import apiRequest from "../../utils/apiRequest";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuthStore from "../../utils/authStore";
import { Link } from "react-router";

const addComment = async (comment) => {
  const res = await apiRequest.post("/comment", comment);
  return res.data;
};

const CommentForm = ({ id }) => {
  const [open, setOpen] = useState(false);
  const [desc, setDesc] = useState("");
  const [submitError, setSubmitError] = useState("");
  const { currentUser, removeCurrentUser } = useAuthStore();
  const queryClient = useQueryClient();

  const handleEmojiClick = (emoji) => {
    setDesc((prev) => prev + " " + emoji.emoji);
    setOpen(false);
  };

  const mutation = useMutation({
    mutationFn: addComment,
    onSuccess: (newComment) => {
      queryClient.setQueryData(["comments", id], (oldData) => {
        const oldComments = Array.isArray(oldData)
          ? oldData
          : oldData?.comments ?? [];

        return Array.isArray(oldData)
          ? [...oldComments, newComment]
          : { ...(oldData ?? {}), comments: [...oldComments, newComment] };
      });

      setDesc("");
      setOpen(false);
      setSubmitError("");
    },
    onError: (error) => {
      if (error.response?.status === 401 || error.response?.status === 403) {
        removeCurrentUser();
        setSubmitError("Your session has expired. Log in again to add a comment.");
        return;
      }

      setSubmitError(
        error.response?.data?.message || "Unable to add comment. Please try again."
      );
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!desc.trim()) return;

    setSubmitError("");
    mutation.mutate({
      description: desc.trim(),
      pin: id,
    });
  };

  if (!currentUser) {
    return (
      <div className="commentForm commentLoginPrompt">
        {submitError && <span role="alert">{submitError} </span>}
        <Link to="/auth">Log in to add a comment</Link>
      </div>
    );
  }

  return (
    <>
      {submitError && (
        <p className="commentError" role="alert">
          {submitError}
        </p>
      )}
      <form className="commentForm" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add a comment"
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
          disabled={mutation.isPending}
        />
        <div className="emoji">
          <div onClick={() => setOpen((prev) => !prev)}>😊</div>
          {open && (
            <div className="emojiPicker">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </div>
      </form>
    </>
  );
};

export default CommentForm;