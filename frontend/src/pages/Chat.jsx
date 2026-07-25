import { useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import Sidebar from "../components/Sidebar";

function Chat() {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [connected, setConnected] = useState(false);
    const [onlineUsers, setOnlineUsers] = useState([]);

    const sender = localStorage.getItem("username") || "Anonymous";
    const clientRef = useRef(null);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const client = new Client({
            brokerURL: "https://campusconnect-m40y.onrender.com",
            reconnectDelay: 5000,

            onConnect: () => {
                console.log("Connected as:", sender);
                setConnected(true);

                client.subscribe("/topic/messages", (msg) => {
                    const received = JSON.parse(msg.body);
                    setMessages((prev) => [...prev, received]);
                });

                client.subscribe("/topic/users", (msg) => {
                    const users = JSON.parse(msg.body);
                    setOnlineUsers(users);
                });

                client.subscribe("/topic/user.join", (msg) => {
                    const user = JSON.parse(msg.body);
                    setMessages((prev) => [
                        ...prev,
                        {
                            type: "system",
                            content: `${user.username} joined the chat`,
                        },
                    ]);
                });

                client.subscribe("/topic/user.leave", (msg) => {
                    const user = JSON.parse(msg.body);
                    setMessages((prev) => [
                        ...prev,
                        {
                            type: "system",
                            content: `${user.username} left the chat`,
                        },
                    ]);
                });

                client.publish({
                    destination: "/app/user.join",
                    body: JSON.stringify({ username: sender }),
                });
            },

            onDisconnect: () => {
                setConnected(false);
                setOnlineUsers([]);
            },

            onWebSocketError: (error) => {
                console.error(error);
                setConnected(false);
            },

            onStompError: (frame) => {
                console.error(frame);
            },
        });

        client.activate();
        clientRef.current = client;

        return () => {
            if (clientRef.current?.connected) {
                clientRef.current.publish({
                    destination: "/app/user.leave",
                    body: JSON.stringify({ username: sender }),
                });
            }
            client.deactivate();
        };
    }, [sender]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages]);

    const sendMessage = () => {
        if (!clientRef.current?.connected) {
            alert("Chat not connected.");
            return;
        }

        if (!message.trim()) return;

        clientRef.current.publish({
            destination: "/app/send",
            body: JSON.stringify({
                sender: sender,
                content: message,
            }),
        });

        setMessage("");
    };

    return (
        <div className="flex h-screen bg-[#1a1a1a]">
            <Sidebar />

            <div className="flex-1 flex flex-col">
                <div className="bg-[#0d0d0d] border-b border-[#2a2a2a] px-4 py-2 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <span className={`text-xs ${connected ? 'text-green-500' : 'text-red-500'}`}>
                            {connected ? '●' : '○'}
                        </span>
                        <span className="text-gray-400 text-sm font-mono">chat</span>
                        <span className="text-gray-600 text-xs font-mono">
                            {onlineUsers.length} {onlineUsers.length === 1 ? 'user' : 'users'}
                        </span>
                    </div>
                    <span className="text-gray-500 text-xs font-mono">
                        {sender}
                    </span>
                </div>

                <div className="flex-1 overflow-y-auto px-4 py-3 font-mono bg-[#1a1a1a]">
                    {messages.length === 0 ? (
                        <div className="h-full flex items-center justify-center text-gray-600 text-sm">
                            ~ no messages
                        </div>
                    ) : (
                        messages.map((m, index) => {
                            if (m.type === "system") {
                                return (
                                    <div key={index} className="py-0.5 px-2 text-center">
                                        <span className="text-gray-500 text-xs italic">
                                            — {m.content} —
                                        </span>
                                    </div>
                                );
                            }
                            
                            const isMine = m.sender === sender;
                            return (
                                <div key={index} className="py-0.5 hover:bg-[#242424] px-2 rounded">
                                    <span className={`text-xs mr-2 ${isMine ? 'text-green-500' : 'text-blue-400'}`}>
                                        {isMine ? 'me' : m.sender.toLowerCase()}:
                                    </span>
                                    <span className="text-gray-300 text-sm">
                                        {m.content}
                                    </span>
                                </div>
                            );
                        })
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <div className="bg-[#0d0d0d] border-t border-[#2a2a2a] p-3">
                    <div className="flex items-center">
                        <span className="text-green-500 text-sm font-mono mr-2">$</span>
                        <span className="text-gray-500 text-xs font-mono mr-2">me:</span>
                        <input
                            className="flex-1 bg-transparent text-gray-300 text-sm font-mono outline-none placeholder-gray-600"
                            placeholder="type your message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    sendMessage();
                                }
                            }}
                            autoFocus
                        />
                        <button
                            onClick={sendMessage}
                            disabled={!message.trim()}
                            className="ml-2 px-3 py-1 text-xs font-mono text-green-500 border border-green-500 rounded hover:bg-green-500 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                            send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chat;