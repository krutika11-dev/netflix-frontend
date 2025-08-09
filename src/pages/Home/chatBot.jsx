import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.on("newMsg", (msg) => {
      setMessages((prev) => [...prev, { sender: "other", text: msg }]);
    });

    return () => {
      socket.off("newMsg");
    };
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "me", text: input };
    setMessages((prev) => [...prev, userMessage]);

    socket.emit("message", input);
    setInput("");
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      <div className="p-4 bg-neutral-900 text-xl font-bold border-b border-neutral-700">
        Netflix Chat
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-xs px-4 py-2 rounded-xl ${
              msg.sender === "me"
                ? "bg-red-600 ml-auto text-right"
                : "bg-neutral-800 mr-auto"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="p-4 flex gap-2 border-t border-neutral-700">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 rounded-lg bg-neutral-800 text-white focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
