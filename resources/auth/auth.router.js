import { Router } from "express";
import * as authController from "./auth.controller.js";
import authProtect from "../../middlewares/auth-protect.js";
const router = Router();

router.get("/", authProtect, authController.getAdminLoginPage); // admins login page

router.post("/admin-login", authController.AdminLogin); // Admin Login POST form jquery

export default router; // equivalent to [ module.exports = router; ]
