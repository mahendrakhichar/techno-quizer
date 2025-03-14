import { useState } from "react";
import axios from "axios";
import { Bot, Send, Loader2 } from 'lucide-react';  
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';

const API_BASE_URL = "https://techno-quizer-2.onrender.com";
const ChatBot = () => {
  const [userSearch, setUserSearch] = useState('');
  const [gptAnswer, setGptAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const searchHandler = async (e) => {
    e.preventDefault();
    if (userSearch.trim() === "") return;

    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/userQuestion/gpt`, { question: userSearch });
      setGptAnswer(response.data.message);
    } catch (err) {
      setGptAnswer("Sorry, there was an error fetching the answer. Please try again!");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-gradient-to-b from-white via-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8 chatbot-container">
      
      {/* Background Pattern - FIXED */}
      <div className="absolute inset-0 opacity-30 pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f1f5f9' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      <div className="relative max-w-4xl mx-auto z-10">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          
          {/* Chatbot Header */}
          <div className="px-8 py-6 bg-gradient-to-r from-blue-600 to-indigo-600">
            <div className="flex items-center space-x-4">
              <div className="bg-white p-3 rounded-full shadow-lg">
                <Bot className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">AI Quiz Assistant</h2>
                <p className="text-blue-100 mt-1">Your personal quiz creation companion</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Welcome Message */}
            <div className="bg-blue-50 rounded-xl p-6 mb-8">
              <p className="text-gray-700 text-lg">
                I'm here to help you create engaging quiz questions and provide assistance.
                Feel free to ask me anything about quiz creation or general guidance!
              </p>
            </div>

            {/* Chat Form - FIXED relative positioning */}
            <form onSubmit={searchHandler} className="space-y-4">
              <div className="relative w-full">
                <input
                  id="userSearch"
                  type="text"
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  className="w-full px-6 py-4 pr-16 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Type your question here..."
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                </button>
              </div>
            </form>

            {/* Answer Section */}
            {gptAnswer && (
              <div className="mt-8 space-y-4">
                <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl shadow-sm border p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Bot className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Assistant's Response</h3>
                  </div>
                  <div className="prose prose-blue max-w-none">
                    <ReactMarkdown
                      className="text-gray-700"
                      children={gptAnswer}
                      remarkPlugins={[remarkGfm, remarkBreaks]}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Tips Section */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-medium text-gray-900 mb-2">💡 Quick Tip</h4>
                <p className="text-gray-600 text-sm">
                  Ask me to generate quiz questions on specific topics or help you format existing questions.
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-medium text-gray-900 mb-2">🎯 Example</h4>
                <p className="text-gray-600 text-sm">
                  "Create 3 multiple-choice questions about World War II"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
