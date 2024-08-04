"use client";
import { classNames } from "@/app/classNames";
import React, { useState } from "react";
import { TailSpin } from "react-loader-spinner";

interface InputProp {
  response: boolean;
  SetChat: () => void;
  setMessages: React.Dispatch<React.SetStateAction<string[]>>;
}

export const Input: React.FC<InputProp> = ({
  response,
  SetChat,
  setMessages,
}) => {
  const [mes, setMes] = useState("");

  const onSend = async () => {
    if (!response) {
      setMessages((prev) => [...prev, mes]);
      await SetChat();
    }
  };

  return (
    <div className="flex gap-3 items-center w-full">
      <input
        className="w-full p-3 border border-black"
        type="text"
        value={mes}
        onChange={(e) => setMes(e.target.value)}
      />
      <div
        className={classNames(
          !response && "hover:shadow-2xl cursor-pointer",
          "p-3 border border-black rounded"
        )}
        onClick={onSend}
      >
        {!response ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
            />
          </svg>
        ) : (
          <TailSpin
            visible={true}
            height="22"
            width="22"
            color="#000"
            ariaLabel="tail-spin-loading"
            radius="3"
            wrapperStyle={{}}
            wrapperClass=""
          />
        )}
      </div>
    </div>
  );
};
