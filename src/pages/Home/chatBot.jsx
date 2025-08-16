import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("https://netflix-socket-kaeb.onrender.com"); 
//const socket = io("http://localhost:5000");

export default function Chat() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState("");

    useEffect(() => {
        // Ask username once
        const name = prompt("Enter your name");
        setUsername(name || "Anonymous");

        // Receive messages
        socket.on("receiveMessage", (data) => {
            setMessages((prev) => [...prev, data]);
        });

        return () => {
            socket.off("receiveMessage");
        };
    }, []);

    const sendMessage = () => {
        if (message.trim()) {
            const newMessage = { text: message, sender: username };
            socket.emit("sendMessage", newMessage);
            setMessage("");
        }
    };

    return (
        <div style={{
            maxWidth: "500px", margin: "20px auto", background: "#141414",
            padding: "20px", borderRadius: "10px", color: "white", fontFamily: "Arial"
        }}>
            <h2 style={{ textAlign: "center", color: "#E50914" }}>Netflix Chat</h2>

            <div style={{
                background: "#222", padding: "10px", borderRadius: "8px",
                height: "300px", overflowY: "auto", marginBottom: "10px"
            }}>
                {messages.map((msg, index) => (
                    <div key={index} style={{
                        textAlign: msg.sender === username ? "right" : "left",
                        margin: "5px 0"
                    }}>
                        <strong>{msg.sender}: </strong>
                        <span>{msg.text}</span>
                    </div>
                ))}
            </div>

            <div style={{ display: "flex" }}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    style={{
                        flex: 1, padding: "10px", borderRadius: "5px",
                        border: "none", outline: "none"
                    }}
                />
                <button
                    onClick={sendMessage}
                    style={{
                        marginLeft: "10px", padding: "10px 15px",
                        background: "#E50914", color: "white",
                        border: "none", borderRadius: "5px", cursor: "pointer"
                    }}
                >
                    Send
                </button>
            </div>
        </div>
    );
}
