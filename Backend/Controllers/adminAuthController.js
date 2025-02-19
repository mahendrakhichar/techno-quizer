import { Admin } from "../Models/adminModel.js"
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config();

const signUp = async(req,res)=>{
    const {name,email,password} = req.body;
    try{
        const newAdmin = await Admin.findOne({email});
        if(newAdmin){
            res.status(200).json({message:"this email is already registered", success:false})
        }
        else{
            const newAdmin = new Admin({
                name,
                email,
                password,
            })
            await newAdmin.save();
            res.status(201).json({message:"Admin creted succesfully", success:true})
        }
    }
    catch(error){
        res.status(500).json({message:"error registering admin", error:error.message, success:false})
    }
}

const login = async(req,res)=>{
    const {email,password} = req.body;
    try{
        const admin = await Admin.findOne({email})
        if(admin){
            if(admin.password === password){
                // creating jwt token 
                const token = jwt.sign(
                    {id:admin._id}, //payload
                    process.env.JWT_SECRET, // secret key
                    {expiresIn: '1h'}, // expiry of the token 
                )
                res.status(200).json({message:"login successful", success:true, admin, token, role:"admin"})
            }
            else{
                res.status(401).json({message:"incorrect password"});
            }
        }
        else{
            res.status(201).json({message:"no such admin exist", success:false})
        }
    }
    catch(err){
        res.status(500).json({message:"unable to loged you in ", success:false})
    }
}

export {signUp, login}