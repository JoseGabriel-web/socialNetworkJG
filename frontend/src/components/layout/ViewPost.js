import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { likePost } from "../../actions/postActions";
import styles from "../../css/layout/viewPost.module.css";
import Popup from "./Popup";
import DeletePost from "../layout/DeletePost";
import useLazyImg from "../../hooks/useLazyImg";
import { Link } from "react-router-dom";
import { string } from "../../utils/index";

// [x] view post full screen
// [x] if post.creator === user._id is able to delete it
// [ ] if post.creator === user._id is able to edit it
// [ ] users are able to comment from here
// [ ] like the post

const ViewPost = ({ post, isOpened, setIsOpened, handleParentLike }) => {
  const dispatch = useDispatch();
  const userInfoReducer = useSelector((state) => state.userInfoReducer);
  const { user } = userInfoReducer;
  const loadedImage = useLazyImg(post.image.url);
  const loadedProfilePicture = useLazyImg(post.user.profilePicture);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [deletePostState, setDeletePostState] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [likesList, setLikesList] = useState([]);

  const handleDeletePostPopUpState = () => {
    setDeletePostState(!deletePostState);
  };

  const handleLike = async () => {
    if (handleParentLike) {
      handleParentLike();
      setLikesCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1));
      setLikesList((prevList) => {
        if (isLiked) return prevList.filter((name) => name !== user.name);
        return [...prevList, user.name];
      });
      setIsLiked(!isLiked);
      return;
    } else if (isLiked) {
      const { newLikesCount } = await dispatch(
        likePost("unlike", post._id, likesCount)
      );
      setLikesList(likesList.filter((name) => name !== user.name));
      setLikesCount(await newLikesCount);
    } else {
      const { newLikesCount } = await dispatch(
        likePost("like", post._id, likesCount)
      );
      setLikesList([...likesList, user.name]);
      setLikesCount(await newLikesCount);
    }
  };

  useEffect(() => {
    if (post?.creator === user?._id) {
      setIsCurrentUser(true);
    }
  }, [user]);

  useEffect(() => {
    if (post?.likes) {
      setLikesCount(post.likes.length);
      setLikesList(post.likes);
    }
  }, [post]);

  useEffect(() => {
    if (user && post?.likes.includes(user.name)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [user, post]);

  return (
    <Popup isOpened={isOpened}>
      <div className={styles.viewPostContainer}>
        <div className={styles.infoContainer}>
          <div className={styles.userInfo}>
            <div className={styles.userProfileImgContainer}>
              <div className={styles.userProfileImg}>
                <img src={loadedProfilePicture} alt="" />
              </div>
            </div>

            <div className={styles.userName}>
              <Link
                to={`/profile/${string.replaceSpace(post.user.name)}/gallery`}
              >
                {post.user.name}
              </Link>
            </div>

            {isCurrentUser && (
              <div className={styles.deletePostIconContainer}>
                <i
                  className="fas fa-trash-alt"
                  onClick={() => handleDeletePostPopUpState()}
                />
                <DeletePost
                  isOpened={deletePostState}
                  setIsOpened={setIsOpened}
                  postId={post._id}
                  handleDeletePostPopUpState={handleDeletePostPopUpState}
                  public_id={post.image.public_id}
                />
              </div>
            )}
          </div>

          <div className={styles.postAndCommentsInfoContainer}>
            <div className={styles.postInfo}>
              {post && (post.title || post.description) ? (
                <div className={styles.postDescription}>
                  <h3>{post && post?.title}</h3>
                  <p>{post && post?.description}</p>
                </div>
              ) : null}

              <div className={styles.postActions}>
                <div>
                  {likesCount} <i className="fas fa-thumbs-up" />
                </div>
                <div>
                  Comments
                  <i
                    style={{ paddingLeft: "10px" }}
                    className="fas fa-comments"
                  />
                </div>
                <div>
                  <i
                    onClick={handleLike}
                    className={`${isLiked ? "fas" : "far"} fa-heart`}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
            </div>

            <div className={styles.commentsInfo}>
              {/* needs input for adding new comments */}
            </div>
          </div>
        </div>

        <div
          className={styles.mediaContainer}
          style={{ backgroundImage: `url(${loadedImage})` }}
        >
          <img src={loadedImage} alt="" />
          <i
            className="far fa-times-circle"
            onClick={() => setIsOpened(!isOpened)}
          />
        </div>
      </div>
    </Popup>
  );
};

export default ViewPost;
