import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "../../css/post/postCommentSection.module.css";
import Comment from "./Comment";
import * as helpers from "../../helpers/index";

const PostCommentSection = ({
  postId,
  isCommentSectionOpened,
  setIsCommentSectionOpened,
  comments,
}) => {
  const userInfoReducer = useSelector((state) => state.userInfoReducer);
  const { user } = userInfoReducer;
  const [label, setLabel] = useState("");
  const [allComments, setAllComments] = useState([]);

  useEffect(() => {
    setAllComments([...comments]);
  }, [comments]);

  const handleAddComment = async () => {
    if (label === "") return;
    const { newComment } = await helpers.comment.createPostComment(
      postId,
      label
    );
    if (!newComment) return;
    setAllComments([...allComments, newComment]);
    setLabel("");
    setIsCommentSectionOpened(true);
  };

  const handleDeleteComment = (commentId) => {
    const isDeleted = helpers.comment.deletePostComment(commentId);
    if (isDeleted) {
      setAllComments(
        allComments.filter((comment) => comment._id !== commentId)
      );
    }
  };

  return (
    <div className={styles.commentSectionContainer}>
      <div
        className={`${styles.commentsContainer} ${
          isCommentSectionOpened ? "" : styles.closedCommentSection
        }`}
      >
        {comments &&
          allComments.map((comment) => (
            <div className={styles.commentContainer}>
              <Comment
                key={comment.creator}
                comment={comment}
                user={user}
                handleDeleteComment={handleDeleteComment}
              />
            </div>
          ))}
      </div>
      <div className={styles.addCommentForm}>
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className={styles.addCommentInput}
          placeholder="Add comment.."
        />
        <div
          onClick={handleAddComment}
          className={`fas fa-plus ${styles.addCommentBtn}`}
        />
      </div>
    </div>
  );
};

export default PostCommentSection;
