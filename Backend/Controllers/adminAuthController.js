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

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const admin = await Admin.findOne({ email });
      if (!admin) {
        return res.status(404).json({ message: "No such admin exists. Please register first.", success: false });
      }
  
      if (admin.password !== password) {
        return res.status(400).json({ message: "Incorrect password. Please try again.", success: false });
      }
  
      const token = jwt.sign(
        { id: admin._id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      return res.status(200).json({
        message: "Login successful",
        success: true,
        admin,
        token,
        role: "admin"
      });
  
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Unable to log you in, please try again later.", success: false });
    }
  };
  

export {signUp, login}