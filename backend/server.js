import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import * as http from "http"
import { Server } from "socket.io"
import { connectDB } from "./config/db.js"
import { userRoutes } from "./routes/userRoutes.js"
import { authRoutes } from "./routes/authRoutes.js"
import { postRoutes } from "./routes/postRoutes.js"
import { profileRoutes } from "./routes/profileRoutes.js"
import { chatRoomRoutes } from "./routes/chatRoomRoutes.js"
import { followerRoutes } from "./routes/followerRoutes.js"
import { commentRoutes } from "./routes/commentRoutes.js"
import { errorMiddleware } from "./middleware/errorMiddleware.js"
import * as socketControllers from "./socketControllers/index.js"
import { Message } from "./models/Message.js"
import { ChatRoom } from "./models/ChatRoom.js"
import { Post } from "./models/Post.js"
import { Like } from "./models/Like.js"
import { Comment } from "./models/Comment.js"
import { User } from "./models/User.js"
import { Notification } from "./models/Notification.js"
import { Follower } from "./models/Follower.js"
const app = express()
const server = http.createServer(app)
const io = new Server(server)
dotenv.config()
connectDB()

io.on("connection", (socket) => {
  socketControllers.onlineUsersController(io, socket)
  socketControllers.chatControllers(io, socket)
  socketControllers.liveNotificationControllers(io, socket)
})

app.use(express.json())
app.use(cors())

app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/post", postRoutes)
app.use("/api/chatRoom", chatRoomRoutes)
app.use("/api/post/comment", commentRoutes)
app.use("/api/profile", profileRoutes)
app.use("/api/followers", followerRoutes)
app.use(errorMiddleware)

app.get("/deleteAllMessages", async (req, res) => {
  await Message.deleteMany({})
  res.send("All Messages deleted")
})
app.get("/deleteAllChatRooms", async (req, res) => {
  await ChatRoom.deleteMany({})
  res.send("All ChatRooms deleted")
})
app.get("/deleteAllPosts", async (req, res) => {
  await Post.deleteMany({})
  res.send("All Posts deleted")
})
app.get("/deleteAllFollowers", async (req, res) => {
  await Follower.deleteMany({})
  res.send("All Followers deleted")
})
app.get("/getAllMessages", async (req, res) => {
  let messages = await Message.find({})
  res.json(messages)
})
app.get("/getAllChatRooms", async (req, res) => {
  let chatRooms = await ChatRoom.find({})
  res.send(JSON.stringify(chatRooms))
})
app.get("/getAllLikes", async (req, res) => {
  let likes = await Like.find({})
  res.send(JSON.stringify(likes))
})
app.get("/getNotifications", async (req, res) => {
  let notifications = await Notification.find({})
  res.send(JSON.stringify(notifications))
})
app.get("/deleteAllDocuments", async (_, res) => {
  await User.deleteMany({})
  await Message.deleteMany({})
  await ChatRoom.deleteMany({})
  await Post.deleteMany({})
  await Like.deleteMany({})
  await Comment.deleteMany({})
  await Notification.deleteMany({})
  res.send("All documents deleted")
})

const PORT = process.env.PORT || 4000
server.listen(PORT)
