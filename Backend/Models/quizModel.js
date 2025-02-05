
import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
    quizName:{
        type: String,
    },
    quizCode:{
        type: String,

    },
    questions:[{
        question:{
            type: String,
            // required: true,
        },
        options:[{
            type: String,
            // required: true,
        }],
        answer:{
            type: String,
            // required: true,
        }
    }]
})

const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;    