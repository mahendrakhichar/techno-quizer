import Quiz from "../Models/quizModel.js";

const createQuiz = async (req, res) => {
    try {
        const quizData = req.body;
        console.log(quizData);

        if (!quizData || !quizData.name || !quizData.code || !quizData.totalQuestions) {
            console.log("Inside if block");
            return res.status(400).json({ message: 'Invalid quiz data provided' });
        }

        console.log("Inside else block");

        const quiz = new Quiz({
            quizName: quizData.name,
            quizCode: quizData.code,
            questions: quizData.totalQuestions.map(q => ({
                question: q.question,
                options: [q.a, q.b, q.c, q.d],
                answer: q.rightAnswer
            }))
        });

        console.log("Saving quiz...");
        await quiz.save();

        res.status(201).json({ message: "Quiz created successfully", quiz });
    } catch (err) {
        console.error('Error creating quiz:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getQuizes = async (req, res) => {
    try {
        const quizzes = await Quiz.find();
        res.status(200).json(quizzes);
    } catch (err) {
        console.error('Error fetching quizzes:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const checkCode = async(req,res)=>{
    try{
        const {code} = req.params;  
        const quizExist = await Quiz.findOne({quizCode:code})
        console.log(code);
        if(quizExist){
            console.log("quiz exist")
            return res.status(400).json({message:"quiz already exist"});
        }
        console.log("not exist");
        return res.status(200).json({message:" no quiz exist with given code"})
    }
    catch(error){
        res.status(500).json({message:"server error"})
    }
}

export { createQuiz, getQuizes, checkCode };
