import express from "express";
import controller from "../controllers/comments";

const router = express.Router();

/*Making api requests*/
router.get("/", controller.getComments);
router.post("/", controller.addComment);
router.delete("/:id", controller.deleteComment);

export default router;