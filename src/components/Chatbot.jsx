import { useEffect, useRef, useState } from "react";
import "../index.css";

const ChatBot = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [showChatbot, setShowChatbot] = useState(false);
  const chatBodyRef = useRef();
  const inputRef = useRef();

  const ChatbotIcon = ({ small }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"
      className={`chatbot-icon ${small ? "small" : "big"}`}>
      <path d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7 448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5-53.5-23.9-53.5-53.5zm157.9 267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6 61.5-64.5 109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5 53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5zM867.2 644.5V453.1h26.5c19.4 0 35.1 15.7 35.1 35.1v121.1c0 19.4-15.7 35.1-35.1 35.1h-26.5zM95.2 609.4V488.2c0-19.4 15.7-35.1 35.1-35.1h26.5v191.3h-26.5c-19.4 0-35.1-15.7-35.1-35.1zM561.5 149.6c0 23.4-15.6 43.3-36.9 49.7v44.9h-30v-44.9c-21.4-6.5-36.9-26.3-36.9-49.7 0-28.6 23.3-51.9 51.9-51.9s51.9 23.3 51.9 51.9z"/>
    </svg>
  );

  const ChatMessage = ({ chat }) => (
    <div className={`chat-message ${chat.role} ${chat.isError ? "error" : ""}`}>
      {chat.role === "model" && <ChatbotIcon small />}
      <p className={`message-bubble ${chat.role}`}>{chat.text}</p>
    </div>
  );

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;
    inputRef.current.value = "";
    const newHistory = [...chatHistory, { role: "user", text: userMessage }];
    const thinkingMessage = { role: "model", text: "Thinking...", temp: true };
    setChatHistory([...newHistory, thinkingMessage]);
    generateBotResponse(newHistory);
  };

  const generateBotResponse = async (history) => {
    const updateHistory = (text, isError = false) => {
      setChatHistory(prev =>
        prev.map(msg => (msg.temp ? { ...msg, text, isError, temp: false } : msg))
      );
    };
    try {
      const response = await fetch(import.meta.env.VITE_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: history.map(({ role, text }) => ({
            role,
            parts: [{ text }]
          }))
        })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || "Something went wrong!");
      const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
      updateHistory(apiResponseText);
    } catch (error) {
      updateHistory(error.message, true);
    }
  };

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({ top: chatBodyRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [chatHistory]);

  return (
    <div className={`chatbot-wrapper ${showChatbot ? "open" : ""}`}>
      <button onClick={() => setShowChatbot(!showChatbot)} className="chatbot-toggle">
        <span className={`material-symbols-rounded icon ${showChatbot ? "hidden" : "visible"}`}>mode_comment</span>
        <span className={`material-symbols-rounded icon ${showChatbot ? "visible" : "hidden"}`}>close</span>
      </button>

      {showChatbot && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="chatbot-title">
              <ChatbotIcon />
              <h2>ChatBot</h2>
            </div>
            <button onClick={() => setShowChatbot(false)} className="material-symbols-rounded close-btn">keyboard_arrow_down</button>
          </div>


          <div ref={chatBodyRef} className="chatbot-body">
            <div className="chatbot-greeting">
              <ChatbotIcon small />
              <p>Привет чем могу помочь?</p>
            </div>
            {chatHistory.map((chat, i) => <ChatMessage key={i} chat={chat} />)}
          </div>

          <div className="chatbot-footer">
            <form onSubmit={handleFormSubmit} className="chatbot-form">
              <input ref={inputRef} type="text" placeholder="Message..." required className="chatbot-input" />
              <button type="submit" className="chatbot-send">
                <span className="material-symbols-rounded">arrow_upward</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
