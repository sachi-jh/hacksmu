"use client";
import React, { useState } from 'react';

const Chatbot: React.FC = () => {
  const [userMessage, setUserMessage] = useState('');
  const [conversation, setConversation] = useState<{ role: string; content: string }[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userMessage.trim()) return;

    // Add user's message to the conversation
    setConversation((prev) => [...prev, { role: 'user', content: userMessage }]);

    try {
      const response = await fetch('/api/chat', { // Ensure to use the correct API path
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userMessage }),
      });

      const data = await response.json();
      setConversation((prev) => [...prev, { role: 'assistant', content: data.assistantMessage }]);
    } catch (error) {
      console.error('Error fetching chatbot response:', error);
    }

    // Clear the user input field after sending the message
    setUserMessage('');
  };

  return (
    <div className="flex flex-col max-w-lg mx-auto bg-sky-100 shadow-lg rounded-lg overflow-hidden h-[90vh]">
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="space-y-4">
          {conversation.map((message, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg ${message.role === 'user' ? 'bg-main text-white self-end' : 'bg-gray-200 text-gray-800 self-start'}`}
            >
              <strong>{message.role === 'user' ? 'You' : 'Assistant'}:</strong> {message.content}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex items-center p-4 bg-gray-100 border-t">
        <input 
          type="text" 
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          placeholder="Type your message..."
          required 
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main"
        />
        <button 
          type="submit" 
          className="ml-4 px-4 py-2 bg-main text-white rounded-lg hover:bg-cyan-99 transition duration-200"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
