import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likePost } from "../../actions/postActions";
import styles from "../../css/post/postActionsSection.module.css";
import ViewPost from "../layout/ViewPost";

const PostActionsSection = ({
  postId,
  likes,
  isCommentSectionOpened,
  setIsCommentSectionOpened,
  post,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userInfoReducer);
  const [likesList, setLikesList] = useState(likes);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(likes.length);
  const [isOpened, setIsOpened] = useState(false);

  const handleCommentSection = () => {
    setIsCommentSectionOpened(!isCommentSectionOpened);
  };

  const handleExpand = () => {
    setIsOpened(!isOpened);
  };

  const handleLike = async () => {
    if (user && user.name === null) {
      return setIsOpened(true);
    } else if (liked) {
      const { newLikesCount } = await dispatch(
        likePost("unlike", postId, likesCount)
      );
      setLikesList(likesList.filter((like) => like !== user.name));
      setLikesCount(await newLikesCount);
    } else {
      const { newLikesCount } = await dispatch(
        likePost("like", postId, likesCount)
      );
      setLikesList([...likesList, user.name]);
      setLikesCount(await newLikesCount);
    }
  };

  useEffect(() => {
    if (user && likesList.includes(user.name)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [likesList, user]);

  return (
    <div className={styles.postActionsSectionContainer}>
      <div className={styles.postInfoContainer}>
        <h3 className={styles.likesTooltipContiner}>
          {likesCount} <i className="far fa-thumbs-up" />
          <div className={styles.likesTooltip}>
            {likes &&
              likesList.map((like) => (
                <h6 className={styles.capitalize}>{like}</h6>
              ))}
          </div>
        </h3>
      </div>
      <div
        className={styles.openPostCommentsContainer}
        onClick={handleCommentSection}
      >
        <h4 style={{ paddingRight: "10px" }}>Comments</h4>
        <i className="fas fa-comments" />
      </div>
      <div className={styles.likePostContainer} onClick={handleLike}>
        <i
          className={`${liked ? "fas" : "far"} fa-heart`}
          style={{ cursor: "pointer" }}
        />
      </div>
      <div className={styles.sharePostContainer} onClick={handleExpand}>
        <i className="fas fa-expand-arrows-alt" style={{ cursor: "pointer" }} />
      </div>
      <ViewPost
        post={post}
        isOpened={isOpened}
        setIsOpened={setIsOpened}
        handleParentLike={handleLike}
      />
    </div>
  );
};

export default PostActionsSection;
