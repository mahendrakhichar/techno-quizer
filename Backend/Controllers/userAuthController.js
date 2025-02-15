import {User} from '../Models/userModel.js'

const signUp = async(req,res)=>{
    const {name,email,password} = req.body;
    try{
        const newUser = await User.findOne({email})
        if(newUser){
            res.status(200).json({message:"this email is alredy registered", success:false})
        }
        else{
            const newUser = new User({
                name,
                email,
                password,
            })
            await newUser.save();
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
        const user = await User.findOne({email})
        if(user){
            if(user.password === password){
                res.status(200).json({message:"login successful", success:true, user})
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