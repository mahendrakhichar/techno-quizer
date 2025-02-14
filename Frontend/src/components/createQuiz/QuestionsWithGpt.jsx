import Questions from "./Questions";
import ChatBot from "./ChatBot";

const QuestionsWithGpt = ({ questions, updateQuestions, currQuestionInd, updateCurrQuestionInd }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6">
      {/* Left side: Questions component */}
      <div className="lg:w-1/2 w-full p-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create Questions</h2>
        <Questions
          questions={questions}
          updateQuestions={updateQuestions}
          currQuestionInd={currQuestionInd}
          updateCurrQuestionInd={updateCurrQuestionInd}
        />
      </div>

      {/* Right side: ChatBot component */}
      <div className="lg:w-1/2 w-full p-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Need Assistance?</h2>
        <ChatBot />
      </div>
    </div>
  );
};

export default QuestionsWithGpt;
