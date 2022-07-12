import { Router } from "express";
import { signupUser, signinUser } from "../controllers/userControllers";
import { authChecker } from "../middleware/authChecker";
import {
  signupUserValidation,
  signinUserValidation,
} from "../validation/userValidation";
const router = Router();

router.post("/signup", signupUserValidation, signupUser);
router.post("/signin", signinUserValidation, signinUser);
router.get("/auth", authChecker, (req, res) => {
  res.json({ message: "You are authenticated" });
});

export default router;
