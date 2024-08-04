"use client";
import { classNames } from "@/app/classNames";
import React from "react";
import { Input } from "./input/Input";

interface MessagesProp {
  response: boolean;
  SetChat: () => void;
  messages: string[];
  setMessages: React.Dispatch<React.SetStateAction<string[]>>;
}

export const Messages: React.FC<MessagesProp> = ({ messages }) => {
  return (
    <div className="overflow-y-scroll max-h-[70vh] p-3 border border-black flex flex-col gap-5">
      {messages.map((m: string, idx: number) => (
        <div
          key={idx}
          className={classNames(
            idx % 2 == 0 ? "self-end" : "self-start",
            "text-black p-2 shadow-xl rounded border border-black"
          )}
        >
          {m}
        </div>
      ))}
    </div>
  );
};
