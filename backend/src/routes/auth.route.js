import express from "express"
import { checkAuth, login, logout, signup, updateProfile } from "../controllers/auth.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js"


const router = express.Router()

//post is used to send data
router.post("/signup", signup)
//put these functions in the controllers
router.post("/login", login)
router.post("/logout", logout)

//Can pass multiple functions, need to check if the user are authenticated
router.put('/update-profile', protectRoute, updateProfile)

router.get('/check', protectRoute, checkAuth)

export default router