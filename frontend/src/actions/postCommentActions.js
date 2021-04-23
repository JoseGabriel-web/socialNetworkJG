import axios from "axios";
import * as postCommentConstants from "../constants/postCommentConstants";

export const createPostComment = (postId, label) => async (dispatch) => {
  dispatch({ type: postCommentConstants.CREATE_POST_COMMENT_REQUEST });
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
    dispatch({
      type: postCommentConstants.CREATE_POST_COMMENT_SUCCESS,
      payload: newComment,
    });
    return { newComment };
  } catch (error) {
    dispatch({
      type: postCommentConstants.CREATE_POST_COMMENT_FAIL,
      payload: error.response.data.error,
    });
    return null;
  }
};

export const deletePostComment = (commentId) => async (dispatch, getState) => {
  try {
    await axios.delete("/api/post/comment/deletePostComment", {
      params: { commentId },
    });
    return true;
  } catch (error) {
    return false;
  }
};
