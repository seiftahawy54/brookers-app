import Models from "../models/index.js";
import { isAuthSocket } from "../middlewars/isAuth.js";
import mongoose from "mongoose";
import moment from "moment";

export default (io) => {
  const commentsNsp = io.of("/sockets/comments");
  commentsNsp.on("connect", (socket, next) => {
    const user = isAuthSocket(socket, next);
    if (!user) {
      return;
    }
    socket.on("addComment", async (commentData) => {
      socket.emit("comments", commentData);
      const post = await Models.Posts.findById(commentData.postId);
      if (!post) {
        return false;
      }
      post.comments = [
        ...post.comments,
        {
          user: mongoose.Types.ObjectId(user.userId),
          text: commentData.commentText,
          commentDate: moment(),
        },
      ];
      await post.save();
    });
  });
};
