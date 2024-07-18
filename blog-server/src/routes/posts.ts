import express from "express";
import controller from "../controllers/post";

const router = express.Router();

/*Making api requests*/
router.get("/", controller.getPosts);
router.get("/:id", controller.getPost);
router.post("/", controller.addPost);
router.delete("/:id", controller.deletePost);
router.put("/:id", controller.updatePost);

export default router;