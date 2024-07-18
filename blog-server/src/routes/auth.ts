import express from "express";
import controller from "../controllers/auth";

const router = express.Router();

/*Making api requests*/
router.post("/register", controller.register);
router.post("/login", controller.login);
router.post("/logout", controller.logout);

export default router;