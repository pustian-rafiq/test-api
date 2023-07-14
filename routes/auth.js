import express from 'express'
import { loginUserController, registerUserController } from '../controllers/authController.js';

const router = express.Router();

//register new user
router.post("/register", registerUserController)
router.post("/login", loginUserController)

export default router