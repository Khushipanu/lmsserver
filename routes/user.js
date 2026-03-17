import express from "express"
const router=express.Router();
import {forgotPassword, login, myprofile, register, resetPassword, verifyUser, googleLogin} from "../controllers/user.js"
import { updateUserProfile } from "../controllers/admin.js"
import { isAuth } from "../middlewares/isAuth.js";
router.post('/user/register',register)
router.post('/user/verify',verifyUser)
router.post('/user/login',login)
router.post('/user/google-login',googleLogin)
router.get('/user/myprofile',isAuth,myprofile)
router.put('/user/updateProfile/:id',isAuth,updateUserProfile)
router.post('/user/forgot',forgotPassword)
router.post('/user/reset',resetPassword)


export default router;