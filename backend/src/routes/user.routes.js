import { Router } from "express";
import { signup, login, logout, getUserProfile, resetPassword, forgotPassword } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").get(verifyJWT, logout);
router.route("/profile").get(verifyJWT, getUserProfile);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:token").post(resetPassword);

export default router;
