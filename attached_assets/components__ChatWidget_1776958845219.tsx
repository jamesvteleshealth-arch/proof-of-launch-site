// components/ChatWidget.tsx
//
// Floating chat widget — bottom-right bubble that expands into a chat panel.
// Uses the /api/chat route with streaming responses.
// Styled to match the Proof of Launch visual language (dark navy, teal accents).

"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/cn";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const WELCOME_MESSAGE: Message = {
  role: "assistant",
  content:
    "Hi — I'm the Proof of Launch assistant. Ask me anything about our tiers, how we work, or what fits your project. For a real conversation with James, the contact form below is the fastest path.",
};

const MAX_INPUT_LENGTH = 2000;

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      // Small delay to let the panel finish animating before focus
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Cleanup any in-flight request on unmount
  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  const sendMessage = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || isStreaming) return;

    setError(null);
    setInput("");

    const newUserMessage: Message = { role: "user", content: trimmed };
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);

    // Add a placeholder assistant message we'll stream into
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);
    setIsStreaming(true);

    // Abort previous request if any
    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      // Only send user+assistant messages — skip the welcome greeting
      const apiMessages = updatedMessages.filter(
        (m, i) => !(i === 0 && m === WELCOME_MESSAGE)
      );

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
        signal: controller.signal,
      });

      if (!response.ok) {
        let errorMsg = "Something went wrong. Try the contact form below.";
        try {
          const data = await response.json();
          if (typeof data?.error === "string") errorMsg = data.error;
        } catch {
          // Non-JSON response; use default
        }
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = { role: "assistant", content: errorMsg };
          return copy;
        });
        setIsStreaming(false);
        return;
      }

      if (!response.body) {
        throw new Error("No response body");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        accumulated += decoder.decode(value, { stream: true });

        // Update the last (assistant) message with accumulated text
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = { role: "assistant", content: accumulated };
          return copy;
        });
      }
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      console.error("[chat] fetch error:", err);
      setMessages((prev) => {
        const copy = [...prev];
        copy[copy.length - 1] = {
          role: "assistant",
          content:
            "Connection issue. Please try again, or use the contact form below.",
        };
        return copy;
      });
    } finally {
      setIsStreaming(false);
    }
  }, [input, isStreaming, messages]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Floating bubble — visible when chat is closed */}
      <button
        type="button"
        aria-label={isOpen ? "Close chat" : "Open chat"}
        onClick={() => setIsOpen((v) => !v)}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all",
          "bg-teal-500 hover:bg-teal-400 text-navy-950",
          "focus:outline-none focus:ring-2 focus:ring-teal-300 focus:ring-offset-2 focus:ring-offset-navy-950"
        )}
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Proof of Launch chat"
          className={cn(
            "fixed bottom-24 right-6 z-50 flex flex-col",
            "w-[calc(100vw-3rem)] max-w-md h-[70vh] max-h-[600px]",
            "bg-navy-900 border border-navy-700 rounded-2xl shadow-2xl overflow-hidden"
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-navy-800 bg-navy-950">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
              <div>
                <div className="text-sm font-semibold text-white">
                  Proof of Launch
                </div>
                <div className="text-xs text-slate-400">
                  AI assistant · trained on our materials
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={scrollToContact}
              className="text-xs text-teal-400 hover:text-teal-300 underline underline-offset-2"
            >
              Talk to James →
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={cn(
                  "flex",
                  m.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap",
                    m.role === "user"
                      ? "bg-teal-500 text-navy-950 rounded-br-sm"
                      : "bg-navy-800 text-slate-100 rounded-bl-sm"
                  )}
                >
                  {m.content || (
                    <span className="inline-flex gap-1">
                      <span className="h-2 w-2 rounded-full bg-slate-500 animate-pulse" />
                      <span
                        className="h-2 w-2 rounded-full bg-slate-500 animate-pulse"
                        style={{ animationDelay: "150ms" }}
                      />
                      <span
                        className="h-2 w-2 rounded-full bg-slate-500 animate-pulse"
                        style={{ animationDelay: "300ms" }}
                      />
                    </span>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-navy-800 bg-navy-950 p-3">
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value.slice(0, MAX_INPUT_LENGTH))}
                onKeyDown={handleKeyDown}
                placeholder="Ask about tiers, scope, or fit..."
                rows={1}
                className={cn(
                  "flex-1 resize-none rounded-xl px-3 py-2 text-sm",
                  "bg-navy-800 text-white placeholder-slate-500",
                  "border border-navy-700 focus:border-teal-500 focus:outline-none",
                  "max-h-32"
                )}
                disabled={isStreaming}
              />
              <button
                type="button"
                onClick={sendMessage}
                disabled={isStreaming || !input.trim()}
                className={cn(
                  "h-10 px-4 rounded-xl text-sm font-semibold transition",
                  "bg-teal-500 text-navy-950 hover:bg-teal-400",
                  "disabled:opacity-40 disabled:cursor-not-allowed"
                )}
              >
                Send
              </button>
            </div>
            <div className="mt-2 text-[10px] text-slate-500 text-center">
              Answers are AI-generated. For binding responses, use the contact form.
            </div>
          </div>
        </div>
      )}
    </>
  );
}
