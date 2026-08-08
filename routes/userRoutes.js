import express from "express"

import { createUser, getAllUsers, getUser, googleLogin, loginUser, sendOTP, updateUserStatus, validateOTPandUpdatePassword } from "../controllers/userController.js"

const userRouter = express.Router()

// POST routes
userRouter.post("/",createUser)
userRouter.post("/login",loginUser)
userRouter.post("/google-login", googleLogin)
userRouter.post("/validate-otp",validateOTPandUpdatePassword)

// GET routes with parameters FIRST
userRouter.get("/send-otp/:email", sendOTP)
userRouter.get("/all", getAllUsers)

// PUT routes
userRouter.put("/toggle-block/:email", updateUserStatus)

// GET "/" route LAST - catch all authenticated requests
userRouter.get("/", getUser)


export default userRouter