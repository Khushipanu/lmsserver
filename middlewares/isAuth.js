import jwt from "jsonwebtoken"
import User from "../models/user.model.js";
import dotenv from "dotenv"
dotenv.config();

export const isAuth=async(req,res,next)=>{
    try{
        const token=req.headers.token;
        if(!token) return res.status(403).json({message:"pls login"});
        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.user=await User.findById(decoded._id);
        console.log(req.user)
        next();

    }catch(err){
        return res.status(500).json({message:"login first"})

    }
}
export const isAdmin=(req,res,next)=>{
    try{
        if(req.user.role!=="admin"){
            return res.status(403).json({message:"You are not admin"});
        }
        next();
    }catch(err){
            return res.status(500).json({message:"login first"})

    }

    

}