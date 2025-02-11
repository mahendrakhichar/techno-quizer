import OpenAI from "openai";

const api = async (topic, model = "gpt-4o-mini",) => {
    try {
        const apiKey = process.env.GPT_API_KEY;
        const openai = new OpenAI({
            apiKey: apiKey,
        });

        const prompt = 
            `if you get something wrong question or which you don't understand it may be user make some typing error correct them and then Generate 5 multiple-choice questions about the topic "${topic}". 
            For each question, provide four options (A, B, C, D) and the correct answer.
            Format the response as follows:
            1. Question: <question text>
               A. <option 1>
               B. <option 2>
               C. <option 3>
               D. <option 4>
               Correct Answer: <option>
            `;
        const completion = await openai.chat.completions.create({
            model: model,
            messages: [
                { "role": "user", "content": prompt },
            ],
        });
        
        console.log(completion.choices[0].message);
        return {success:true , content:completion.choices[0].message.content}
    } catch (error) {
        console.error("Error:", error);
        return {success: false}
    }
};

export default api;
