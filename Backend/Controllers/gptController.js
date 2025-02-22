import api from "../api/api.js";

const communicate = async(req,res)=>{
    try{
        const {question} = req.body;
        const response = await api(question);
        const answer = response.content;
        console.log(answer);
        if(response.success ){
            console.log("ye shi ha ")
            return res.status(200).json({message:answer})
        }
        else{
            console.log("yaaha dikkat ha ")
            return res.status(400).json({message:"something went wrong"})
        }
    }
    catch(err){
        console.log("bhut galat")``
        console.log("error:", err);
        return res.status(500).json({message:"server error"})
    }
}

export default communicate