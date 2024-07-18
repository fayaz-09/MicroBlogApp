import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"
import postRoutes from "./routes/posts";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";
import commentRoutes from "./routes/comments"
import likeRoutes from "./routes/likes"

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser())

/* Endpoint to retreive data*/
app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);

app.listen(5000, ()=> {
    console.log("listening");
}) 