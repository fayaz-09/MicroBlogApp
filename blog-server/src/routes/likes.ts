import express from "express";
import controller from "../controllers/likes";

const router = express.Router();

/*Making api requests*/
router.get("/:id/:idu", controller.getLikes);
router.post("/:id", controller.addLike);
router.delete("/:id", controller.deleteLike);

export default router;