import React, { useState } from 'react';
import { Doctor, Message, User, View } from '../types';
import { Button } from './common/Button';
import { getChatResponse } from '../services/geminiService';
import { Spinner } from './common/Spinner';

interface ChatRoomProps {
  doctor: Doctor;
  user: User;
  setView: (view: View) => void;
}

export const ChatRoom: React.FC<ChatRoomProps> = ({ doctor, user, setView }) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: `Hello ${user.name}, how can I help you today? I am an AI assistant specializing in ${doctor.specialty}.`, sender: 'doctor', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), text: input, sender: 'user', timestamp: new Date() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    const responseText = await getChatResponse(newMessages, doctor.specialty);
    const doctorMessage: Message = { id: (Date.now() + 1).toString(), text: responseText, sender: 'doctor', timestamp: new Date() };
    setMessages(prev => [...prev, doctorMessage]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] max-w-4xl mx-auto bg-white rounded-xl shadow-lg">
      <header className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-4">
            <img src={doctor.imageUrl} alt={doctor.name} className="w-10 h-10 rounded-full" />
            <h2 className="font-semibold text-lg">{doctor.name}</h2>
        </div>
        <Button onClick={() => setView('dashboard')} size="sm" variant="secondary">End Chat</Button>
      </header>
      <div className="flex-1 p-4 overflow-y-auto bg-slate-50">
        {messages.map(msg => (
          <div key={msg.id} className={`flex my-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-3 rounded-2xl max-w-md ${msg.sender === 'user' ? 'bg-teal-600 text-white rounded-br-none' : 'bg-slate-200 text-slate-800 rounded-bl-none'}`}>
              {msg.text}
            </div>
          </div>
        ))}
         {isLoading && <div className="flex justify-start"><Spinner /></div>}
      </div>
      <div className="p-4 border-t flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"
          disabled={isLoading}
        />
        <Button onClick={handleSend} className="ml-4 rounded-full" disabled={isLoading}>Send</Button>
      </div>
    </div>
  );
};