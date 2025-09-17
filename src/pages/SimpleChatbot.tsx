import React, { useState, useEffect, useRef } from "react";

interface Message {
  id: string;
  type: "bot" | "user";
  content: string;
}

export default function SimpleChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", type: "bot", content: "안녕하세요! 무엇을 도와드릴까요?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 스크롤 최하단 유지
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    // 사용자 메시지 추가
    const userMsg: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input.trim(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      // TODO: 실제 장고 API 주소로 변경 예정
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg.content,
        }),
      });
      const data = await res.json();

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: data.reply || "죄송해요, 답변을 받지 못했어요.",
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          type: "bot",
          content: "오류가 발생했습니다. 다시 시도해주세요.",
        },
      ]);
    }
    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "20px auto",
        border: "1px solid #ddd",
        borderRadius: 8,
        display: "flex",
        flexDirection: "column",
        height: "80vh",
      }}
    >
      <div
        style={{
          flex: 1,
          padding: 20,
          overflowY: "auto",
          backgroundColor: "#f9f9f9",
        }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              marginBottom: 12,
              textAlign: msg.type === "bot" ? "left" : "right",
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "10px 15px",
                borderRadius: 20,
                backgroundColor: msg.type === "bot" ? "#eee" : "#4f46e5",
                color: msg.type === "bot" ? "#000" : "#fff",
                maxWidth: "80%",
                wordBreak: "break-word",
              }}
            >
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div
        style={{
          borderTop: "1px solid #ddd",
          padding: 12,
          display: "flex",
          gap: 8,
          backgroundColor: "#fff",
        }}
      >
        <input
          type="text"
          placeholder="메시지를 입력하세요..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
          style={{
            flex: 1,
            padding: 10,
            fontSize: 16,
            borderRadius: 20,
            border: "1px solid #ccc",
            outline: "none",
          }}
        />
        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          style={{
            padding: "0 20px",
            borderRadius: 20,
            backgroundColor: "#4f46e5",
            color: "white",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "..." : "전송"}
        </button>
      </div>
    </div>
  );
}
