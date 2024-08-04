"use client";
import React from "react";
import { Messages } from "../messages/Messages";
import { Input } from "../messages/input/Input";

interface ChatBotProp {
  response: boolean;
  SetChat: () => void;
  messages: string[];
  setMessages: React.Dispatch<React.SetStateAction<string[]>>;
}

export const ChatBot: React.FC<ChatBotProp> = ({
  response,
  SetChat,
  messages,
  setMessages,
}) => {
  return (
    <div className="text-black flex flex-col gap-5 p-5 shadow-xl rounded border border-black w-[90%]">
      <div className="text-center">ChatBot</div>
      <Messages
        response={response}
        SetChat={SetChat}
        messages={messages}
        setMessages={setMessages}
      />
      <Input response={response} SetChat={SetChat} setMessages={setMessages} />
    </div>
  );
};
