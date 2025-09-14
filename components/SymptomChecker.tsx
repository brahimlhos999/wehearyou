import React, { useState, useEffect, useRef } from 'react';
import { View, Message } from '../types';
import { Button } from './common/Button';
import { Spinner } from './common/Spinner';
import { getSymptomChatResponse } from '../services/geminiService';

interface SymptomCheckerProps {
  setView: (view: View) => void;
}

export const SymptomChecker: React.FC<SymptomCheckerProps> = ({ setView }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Start with a greeting from the AI
    setMessages([
      { 
        id: 'init', 
        text: "Hello! I'm your AI health assistant. To get started, please describe the symptoms you're experiencing.", 
        sender: 'ai', 
        timestamp: new Date() 
      }
    ]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), text: input, sender: 'user', timestamp: new Date() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    const responseText = await getSymptomChatResponse(newMessages);
    const aiMessage: Message = { id: (Date.now() + 1).toString(), text: responseText, sender: 'ai', timestamp: new Date() };
    setMessages(prev => [...prev, aiMessage]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-150px)] max-w-4xl mx-auto">
       <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-slate-800">Symptom Checker</h1>
            <Button onClick={() => setView('dashboard')} size="sm" variant="secondary">
                &larr; Back to Dashboard
            </Button>
       </div>
        <div className="flex flex-col flex-1 bg-white rounded-xl shadow-lg">
            <div className="flex-1 p-4 overflow-y-auto bg-slate-50 rounded-t-xl">
                {messages.map(msg => (
                    <div key={msg.id} className={`flex my-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`p-3 rounded-2xl max-w-lg ${msg.sender === 'user' ? 'bg-teal-600 text-white rounded-br-none' : 'bg-slate-200 text-slate-800 rounded-bl-none'}`}>
                        {msg.text}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start my-2">
                         <div className="p-3 rounded-2xl max-w-md bg-slate-200 text-slate-800 rounded-bl-none">
                            <Spinner />
                         </div>
                    </div>
                )}
                 <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t flex">
                <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
                placeholder="Describe your symptoms..."
                className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"
                disabled={isLoading}
                />
                <Button onClick={handleSend} className="ml-4 rounded-full" disabled={isLoading || !input.trim()}>
                    Send
                </Button>
            </div>
        </div>
        <p className="text-xs text-slate-500 mt-2 text-center">
            This AI assistant provides information for educational purposes and is not a substitute for professional medical advice.
        </p>
    </div>
  );
};