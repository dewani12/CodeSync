import passport from "passport";
import { Router } from "express";
import { oAuthCallback } from "../controllers/oAuth.controller.js";

const router = Router();
router.get(
  "/",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/redirect",
  passport.authenticate("google", {
    failureRedirect: "./failure",
    session: false,
  }),
  oAuthCallback
);

router.get("/failure", (_, res) => {
  res.status(501).json({
    message: "failed google authentication",
    success: false,
  });
});

export default router;
