import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

// The API key MUST be obtained exclusively from the environment variable `process.env.API_KEY`.
// It is assumed to be pre-configured and accessible.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export async function getSymptomAnalysis(symptoms: string): Promise<string> {
  const model = 'gemini-2.5-flash';
  const prompt = `You are a helpful AI assistant in a telehealth app. A user reports the following symptoms: "${symptoms}". Provide a brief, helpful analysis of potential causes (not a diagnosis) and suggest safe next steps, like consulting a doctor. Keep the tone reassuring and professional.`;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error getting symptom analysis:", error);
    return "Sorry, I couldn't process your request right now. Please try again later.";
  }
}

export async function getChatResponse(history: Message[], specialty: string): Promise<string> {
  const model = 'gemini-2.5-flash';

  try {
    const chat = ai.chats.create({
      model: model,
      history: history.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }],
      })),
      config: {
        systemInstruction: `You are a highly knowledgeable and empathetic AI medical assistant specializing in ${specialty}. Your goal is to provide helpful advice and potential solutions like ChatGPT. Listen to the user's situation, analyze it, and give clear, actionable advice. IMPORTANT: You are an AI and not a substitute for a real doctor. You MUST include a disclaimer that your advice is for informational purposes only and the user should consult a healthcare professional for a diagnosis. Frame your responses to be supportive and informative.`,
      }
    });

    const lastMessage = history[history.length - 1];
    const response = await chat.sendMessage({ message: lastMessage.text });
    return response.text;
  } catch (error) {
    console.error("Error getting chat response:", error);
    return "I'm having trouble connecting. Please wait a moment and try again.";
  }
}

export async function getSymptomChatResponse(history: Message[]): Promise<string> {
  const model = 'gemini-2.5-flash';

  try {
    const chat = ai.chats.create({
      model: model,
      history: history.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }],
      })),
      config: {
        systemInstruction: "You are an AI health assistant in a telehealth app. Your goal is to understand a user's symptoms through a conversational chat. Ask clarifying questions one at a time to get more details (e.g., 'Where is the pain?', 'How long have you had this symptom?'). After gathering enough information, provide a brief summary and suggest 1-3 relevant medical specialties they might consider consulting (e.g., Cardiologist, Dermatologist). Do NOT provide a diagnosis or medical advice. Keep your responses concise and reassuring.",
      }
    });

    const lastMessage = history[history.length - 1];
    const response = await chat.sendMessage({ message: lastMessage.text });
    return response.text;
  } catch (error)
    {
    console.error("Error getting symptom chat response:", error);
    return "I'm having trouble connecting. Please wait a moment and try again.";
  }
}


export async function getMedicationSuggestions(condition: string, country: string): Promise<string> {
  const model = 'gemini-2.5-flash';
  const prompt = `You are an AI Pharmacy Assistant. A user from ${country} is asking for over-the-counter medication suggestions for: "${condition}". 
  
  Please provide 1-3 common, suitable over-the-counter medication suggestions that are likely available in ${country}. 
  
  For each suggestion, include:
  1. A common brand name (if applicable) or the type of product.
  2. The primary active ingredient.
  3. A simple explanation of what it does.

  IMPORTANT: Start your response with a clear, bold disclaimer: "**Disclaimer: I am an AI assistant and not a medical professional. This information is for educational purposes only. You must consult a licensed pharmacist or doctor before taking any medication.**" Format the rest of the response clearly using markdown.`;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error getting medication suggestions:", error);
    return "Sorry, I couldn't process your request for medication suggestions right now.";
  }
}

export async function getMedicationInfoFromScan(scannedData: string): Promise<string> {
  const model = 'gemini-2.5-flash';
  const prompt = `You are an AI Pharmacy Assistant. A user scanned a medication and the QR/barcode data is: "${scannedData}". 

  From this data, identify the medication. If it's a common medication, please provide the following information in simple terms:
  1.  **Medication Name:** (e.g., Ibuprofen, Tylenol, etc.)
  2.  **Primary Use:** What is this medication typically used for?
  3.  **How it Works:** A brief, easy-to-understand explanation.
  4.  **Common Side Effects:** List a few common potential side effects.

  If the data is unclear or doesn't seem to correspond to a medication, state that you couldn't identify it.

  IMPORTANT: Start your response with a clear, bold disclaimer: "**Disclaimer: I am an AI assistant. This information is for educational purposes and is not a substitute for professional medical advice. Always follow the instructions on the packaging and consult with your pharmacist or doctor.**" Format the rest of the response clearly using markdown.`;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error getting medication info from scan:", error);
    return "Sorry, I couldn't analyze the scanned data right now.";
  }
}