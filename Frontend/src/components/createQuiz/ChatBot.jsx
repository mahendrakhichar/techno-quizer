import { useState } from "react";
import axios from "axios";
import { Bot } from 'lucide-react';  // Lucide Bot Icon
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';

const ChatBot = () => {
  const [userSearch, setUserSearch] = useState('');
  const [gptAnswer, setGptAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const searchHandler = async (e) => {
    e.preventDefault();
    if (userSearch.trim() === "") return;

    setLoading(true);
    try {
      const response = await axios.post('/api/userQuestion/gpt', { question: userSearch });
      setGptAnswer(response.data.message);
    } catch (err) {
      setGptAnswer("Sorry, there was an error fetching the answer. Please try again!");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-gray-800 via-white-600 to-green-300 p-10 rounded-xl shadow-lg w-full mt-8 transform transition-transform duration-300 hover:scale-105 hover:translate-y-2">

      {/* Chatbot Header */}
      <div className="flex items-center space-x-4 mb-8 ">
        <div className="bg-white p-3 rounded-full">
          <Bot className="text-indigo-600 w-8 h-8" />
        </div>
        <div className="text-white text-3xl font-semibold">
          Hello! Need assistance?
        </div>
      </div>

      {/* Description Message */}
      <p className="text-white text-lg mb-8">
        I'm here to help! You can ask me to generate quiz questions or assist you in any other way.
        Just type your query below and I'll respond instantly.
      </p>

      {/* Chatbot Form */}
      <form onSubmit={searchHandler} className="space-y-6">
        <label htmlFor="userSearch" className="block text-white text-lg font-medium">What would you like to ask?</label>
        <div className="flex items-center space-x-3">
          <input
            id="userSearch"
            type="text"
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
            className="w-full px-6 py-3 rounded-lg bg-transparent border-2 border-gray-300 focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-400"
            placeholder="Type your question here..."
          />
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-3 rounded-lg text-white ${loading ? 'bg-gray-400' : 'bg-gray-600 hover:bg-green-700'} focus:outline-none`}
          >
            {loading ? "Processing..." : <Bot className="w-6 h-6" />}
          </button>
        </div>
      </form>

      {/* Display GPT Answer */}
      <div className="mt-8">
        {gptAnswer && (
          <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg">
            <div className="text-xl font-semibold mb-4">Answer:</div>
            <ReactMarkdown
              className="text-lg"
              children={gptAnswer}
              remarkPlugins={[remarkGfm, remarkBreaks]} // Enable GitHub-flavored Markdown
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBot;
