function ChatBubble({ sender, content, mine }) {
    return (
        <div className={`flex ${mine ? "justify-end" : "justify-start"} mb-4`}>
            <div
                className={`max-w-lg rounded-2xl shadow-lg px-5 py-3 ${
                    mine
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                        : "bg-[#2b2d31] text-[#dbdee1] border border-[#3d3f45]"
                }`}
            >
                <div className="flex items-center gap-2 mb-1.5">
                    <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                            mine
                                ? "bg-white text-blue-600"
                                : "bg-[#5865f2] text-white"
                        }`}
                    >
                        {sender.charAt(0).toUpperCase()}
                    </div>
                    <span className={`font-semibold text-sm ${
                        mine ? "text-white" : "text-[#dbdee1]"
                    }`}>
                        {mine ? "You" : sender}
                    </span>
                    <span className={`text-xs ml-auto ${
                        mine ? "text-blue-200" : "text-[#6d737a]"
                    }`}>
                        {new Date().toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </span>
                </div>
                <p className="text-sm leading-relaxed break-words pl-0">
                    {content}
                </p>
            </div>
        </div>
    );
}

export default ChatBubble;