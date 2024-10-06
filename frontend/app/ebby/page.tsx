"use client";
import React, { useState } from 'react';

const Chatbot: React.FC = () => {
  // State to hold user input and conversation history
  const [userMessage, setUserMessage] = useState('');
  const [conversation, setConversation] = useState<{ role: string; content: string }[]>([]); // Chat history
  
  // Function to handle user message submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userMessage.trim()) return; // Ignore empty input

    // Add user's message to the conversation
    setConversation((prev) => [...prev, { role: 'user', content: userMessage }]);

    // Send the user's message to the backend API
    try {
      const response = await fetch('api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userMessage }), // Send userMessage in the body
      });

      const data = await response.json();
      
      // Add the assistant's response to the conversation
      setConversation((prev) => [...prev, { role: 'assistant', content: data.assistantMessage }]);

    } catch (error) {
      console.error('Error fetching chatbot response:', error);
    }

    // Clear the user input field after sending the message
    setUserMessage('');
  };

  return (
    <div className="chat-container">
      <div className="chat-window">
        {conversation.map((message, index) => (
          <div key={index} className={message.role === 'user' ? 'user-message' : 'assistant-message'}>
            <strong>{message.role === 'user' ? 'You' : 'Assistant'}:</strong> {message.content}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="chat-input">
        <input 
          type="text" 
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          placeholder="Type your message..."
          required 
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chatbot;
