"use client";
import React, { useState } from 'react';

const Chatbot: React.FC = () => {
  const [userMessage, setUserMessage] = useState('');
  const [conversation, setConversation] = useState<{ role: string; content: string }[]>([]);

  const defaultPrompts = [
    { label: 'Looking for support groups', value: 'Can you help me find support groups?' },
    { label: 'Looking for resources', value: 'What resources are available for mental health?' },
    { label: 'Scheduling an appointment', value: 'How can I schedule an appointment?' }
  ];

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

  const handleDefaultPrompt = (prompt: string) => {
    setUserMessage(prompt); // Set the user message to the default prompt
    handleSubmit({ preventDefault: () => {} } as React.FormEvent); // Call handleSubmit to send the prompt
  };

  return (
    <div className="flex flex-col mx-auto bg-sky-100 shadow-lg rounded-lg overflow-hidden h-[80vh]">
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="space-y-4">
          {conversation.map((message, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg ${message.role === 'user' ? 'bg-main text-white self-end' : 'bg-white text-gray-800 self-start'}`}
            >
              <strong>{message.role === 'user' ? 'You' : 'Assistant'}:</strong> {message.content}
            </div>
          ))}
        </div>
        {conversation.length === 0 && ( // Show default buttons only if there's no conversation
        <div className="flex flex-col gap-2 mb-4 align-baseline">
          {defaultPrompts.map((prompt, index) => (
            <button key={index} onClick={() => handleDefaultPrompt(prompt.value)} className="default-button bg-main text-white rounded-lg py-2 transition duration-300 hover:bg-cyan-600">
              {prompt.label}
            </button>
          ))}
        </div>
      )}
      </div>

      <form onSubmit={handleSubmit} className="flex items-center p-4 bg-white border-t">
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
