"use client";

import { useEffect, useState } from "react";
import { ChatBot } from "./components/chatbot/ChatBot";
import axios from "axios";

export default function Home() {
  const [messages, setMessages] = useState<string[]>([]);
  const [response, setResponse] = useState(false);
  const Axios = axios.create({ baseURL: "http://localhost:5000" });

  const SetChat = async () => {
    setResponse(true);
    const res = await Axios.post("/chat", { data: messages[-1] });
    console.log(res);

    setResponse(false);
  };

  useEffect(() => {
    setMessages(["Hi!", "Hello"]);
  }, []);

  return (
    <div className="h-screen w-screen bg-white flex items-center justify-center">
      <ChatBot
        response={response}
        SetChat={SetChat}
        messages={messages}
        setMessages={setMessages}
      />
    </div>
  );
}
