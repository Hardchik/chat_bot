import React, { useState, useEffect } from 'react';
import ChatWindow from './components/ChatWindow';
import Input from './components/Input';
import LoadingIndicator from './components/LoadingIndicator';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle sending messages and fetching responses
  const handleSendMessage = async (message) => {
    setIsLoading(true);
    // Replace with your backend API call
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });
    const data = await response.json();
    setMessages([...messages, { sender: 'user', text: message }, { sender: 'bot', text: data.response }]);
    setIsLoading(false);
  };

  return (
    <div className="chatbot">
      <ChatWindow messages={messages} />
      <Input onSendMessage={handleSendMessage} />
      {isLoading && <LoadingIndicator />}
    </div>
  );
};

export default Chatbot;
