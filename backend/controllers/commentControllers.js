import { Comment } from "../models/Comment.js";
import { User } from "../models/User.js";

export const createComment = async (req, res) => {
  const { _id } = req.user;
  const { postId, label } = req.body;
  const user = await User.findById({ _id }).select(["name", "profilePicture"]);
  await Comment.create({
    label,
    creator: _id,
    postId,
    user: {
      name: user.name,
      profilePicture: user.profilePicture.url,
    },
  });

  res.status(200).json({
    newComment: {
      label,
      creator: _id,
      postId,
      user: {
        name: user.name,
        profilePicture: user.profilePicture.url,
      },
    },
  });
};

export const deletePostComment = async (req, res, next) => {
  try {
    const { commentId } = req.query;
    await Comment.deleteOne({ _id: commentId });
    res.status(200).json({ message: "Comment deleted" });
  } catch (error) {
    next(error);
  }
};
