import axios from "axios";

// Creates comment and returns it else if error returns null
export const createPostComment = async (postId, label) => {
  try {
    const body = {
      postId,
      label,
    };
    const { data } = await axios.post(
      "/api/post/comment/createPostComment",
      body
    );
    const { newComment } = await data;
    return { newComment: await newComment };
  } catch (error) {
    return null;
  }
};

// Takes comment id and deletes it returns boolean
export const deletePostComment = async (commentId) => {
  try {
    await axios.delete("/api/post/comment/deletePostComment", {
      params: { commentId },
    });
    return true;
  } catch (error) {
    return false;
  }
};
