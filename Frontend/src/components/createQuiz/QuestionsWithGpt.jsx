import Questions from "./Questions";
import ChatBot from "./ChatBot";

const QuestionsWithGpt = ({ questions, updateQuestions, currQuestionInd, updateCurrQuestionInd }) => {
    return (
        <div className="flex flex-col lg:flex-row gap-6 p-6">
            {/* Left side: Questions component */}
            <div className="lg:w-1/2 p-4 bg-white shadow-lg rounded-lg">
                <Questions 
                    questions={questions} 
                    updateQuestions={updateQuestions} 
                    currQuestionInd={currQuestionInd} 
                    updateCurrQuestionInd={updateCurrQuestionInd} 
                />
            </div>

            {/* Right side: ChatBot component */}
            <div className="lg:w-1/2 p-4 bg-white shadow-lg rounded-lg">
                <ChatBot />
            </div>
        </div>
    );
}

export default QuestionsWithGpt;
