
import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
    quizName:{
        type: String,
        required:true,
    },
    quizCode:{
        type: String,
        required:true,
        unique:true,

    },
    questions:[{
        question:{
            type: String,
            required: true,
        },
        options:[{
            type: String,
            required: true,
        }],
        answer:{
            type: String,
            required: true,
        }
    }]
})

const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;    