"use client";

import React, { useState, useRef, useEffect, FormEvent } from "react";
import ReactMarkdown from "react-markdown";
// Define a TypeScript type for each chat message
type Message = {
  id: number; // simple numeric ID so React can track list items
  sender: "user" | "assistant"; // who sent the message
  text: string; // the actual message content
};

// Main ChatWidget component
const ChatWidget: React.FC = () => {
  // Is the chat panel open or just the small bubble?
  const [isOpen, setIsOpen] = useState(false);

  // All messages in the conversation
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "assistant",
      text: "Hi 👋 I'm the SustainWear assistant. Ask me anything about donations, charities, or how the platform works.",
    },
  ]);

  // The text currently typed in the input box
  const [input, setInput] = useState("");

  // Loading state while we wait for the AI response
  const [isLoading, setIsLoading] = useState(false);

  // A ref to the messages container so we can auto-scroll to bottom
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Whenever messages change, scroll to the latest one
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Helper: toggle the chat panel open/closed
  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  // Helper: send the user's message to the backend (and then to Gemini)
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault(); // prevent the page from reloading

    const trimmed = input.trim();
    if (!trimmed || isLoading) return; // don’t send empty or spam multiple requests

    // 1) Immediately show the user's message in the chat UI
    const newUserMessage: Message = {
      id: Date.now(), // quick way to get a unique-ish ID
      sender: "user",
      text: trimmed,
    };

    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setInput(""); // clear the input box
    setIsLoading(true);

    try {
      // 2) Call your Next.js API route
      //    We send the conversation so the backend can pass context to Gemini.
      const response = await fetch("/api/support-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.sender === "user" ? "user" : "assistant",
            content: m.text,
          })),
        }),
      });

    // Below we have a few error handling responses.
    // If the request did not success (status 200 - 299)
    if (!response.ok) {

      // Below is a message the user will see in the chat if something goes wrong. 
      // This is a safe starting message.
      let fallbackMessage = "Sorry, I couldn't respond right now. Please try again in a moment or refresh the tab.";

      // Status errors 
      
      // 401 or 403 errors could mean either:
      // - The API key is missing
      // - The API key is invalid
      // - The server is not authorised to talk to Gemini (The LLM)
      if (response.status === 401 || response.status === 403) {
        fallbackMessage = "The assistant is temporarily unavailable due to a configuration issue.";
      }

      // Here we check for too many requests (Status = 429 Rate limiting)
      // This happens when the multiple users are chatting at once and the AI provider may be rate-limiting you.
      // Here we ask the user to try again if this error is encounted.

      else if (response.status == 429) {
        fallbackMessage = "I am currently getting a lot of requests right now. Please try again shortly.";
      }

      // Here we check for server-side errors (status 500+)
      // This could happen if:
      // - The server crashes
      // - Gemini fails to provide a response
      // - Something unexpected happened on the backend

      else if (response.status >= 500) {
        fallbackMessage = "Something went wrong on our side. Please try again shortly.";
      }

      // Here we have a log in place for developers to take a look at when it comes to debugging issues via the browser
      console.error("Gemini Support chat API error:", response.status, await response.text());

      // Here we add a new message to the caht so it looks like the assistant replied

      const errorMessage: Message = {
        id: Date.now() + 1,
        sender: "assistant",
        text: fallbackMessage,
      };

      setMessages((previous) => [...previous, errorMessage])

      return;
    }  

      const data = await response.json();

      // 3) Add the assistant's reply to the chat
      const assistantText: string =
        data.reply ||
        "Sorry, I couldn't get a response right now. Please try again in a moment.";

      const newAssistantMessage: Message = {
        id: Date.now() + 1,
        sender: "assistant",
        text: assistantText,
      };

      setMessages((prev) => [...prev, newAssistantMessage]);
    } catch (error) {
      console.error("Error in chat widget:", error);

      // Show a friendly error message to the user
      const errorMessage: Message = {
        id: Date.now() + 2,
        sender: "assistant",
        text: "Oops, something went wrong while contacting the SustainWear assistant. Please try again.",
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating chat button in the bottom-right corner */}
      <button
        onClick={toggleChat}
        className="fixed bottom-4 right-4 z-40 flex items-center gap-2 rounded-full px-4 py-2 shadow-lg bg-[#2E7D32] text-white hover:bg-green-800 transition cursor-pointer
        "
      >
        {/* Simple chat icon using plain HTML */}
        <span className="inline-block h-2 w-2 rounded-full bg-lime-300" />
        <span className="text-sm font-semibold">
          {isOpen ? "Close chat" : "Chat with SustainWear"}
        </span>
      </button>

      {/* Chat panel (only shown when isOpen === true) */}
      {isOpen && (
        <div
          className="fixed bottom-20 right-4 z-40 w-80 sm:w-96 rounded-2xl bg-white/90 backdrop-blur-md shadow-[0_18px_45px_rgba(0,0,0,0.25)] border border-gray-200 flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="bg-green-700 text-white px-4 py-3 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold">SustainWear Support</h2>
              <p className="text-xs text-emerald-100">
                Ask me about donations & charities
              </p>
            </div>
            <button
              onClick={toggleChat}
              className="text-xs text-emerald-100 hover:text-white cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Messages area */}
          <div className="flex-1 bg-gray-50 px-3 py-3 overflow-y-auto max-h-72">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`mb-2 flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`
                    px-3 py-2 rounded-2xl text-sm max-w-[80%]
                    ${
                      msg.sender === "user"
                        ? "bg-green-700 text-white rounded-br-sm"
                        : "bg-white text-gray-800 border border-gray-200 rounded-bl-sm"
                    }
                  `}
                >
                {msg.sender === "assistant" ? (
                  <div className="prose prose-sm max-w-none">
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>
                ) : (
                  msg.text
                )}
                </div>
              </div>
            ))}

            {/* Invisible div we scroll into view to keep the latest message visible */}
            <div ref={messagesEndRef} />
          </div>

          {/* Input + send button */}
          <form onSubmit={handleSubmit} className="border-t border-gray-200">
            <div className="flex items-center gap-2 px-2 py-2 bg-white">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a SustainWear question..."
                className="flex-1 text-sm px-3 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-800"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className={`
                  text-sm font-semibold px-3 py-2 rounded-full
                  ${
                    isLoading || !input.trim()
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "bg-green-700 text-white hover:bg-green-800 cursor-pointer"
                  }
                  transition
                `}
              >
                {isLoading ? "..." : "Send"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
