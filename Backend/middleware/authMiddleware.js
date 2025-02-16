import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authMiddleware = (req,res,next)=>{
    const token = req.header('Authorization')?.split(' ')[1];
    if(!token){
        return res.status(403).json({message:"access denied, no token provided"});
    }
    jwt.verify(token, process.env.JWT_SECRET, (err,user)=>{
        if(err){
            return res.status(403).json({message:"invalid token"});
        }
        req.user = user;
        next();
    })
}

export default authMiddleware;