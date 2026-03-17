import dotenv from "dotenv";
dotenv.config();
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey:process.env.GEMINI_API_KEY
});

export const generateResponse=async(chatHistory)=>{
    try{
         const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents:chatHistory,
  });
  return response.text;

    }catch(err){
        console.log(err.message)
        return "Ai is busy right now!,try again later";
    }
   

}




