import { Admin } from "../Models/adminModel.js"

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
                res.status(200).json({message:"login successful", success:true})
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