import React, { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';

export default function ChatView({ chatHistory, setChatHistory }) {
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { id: Date.now().toString(), sender: 'user', text: input };
    setChatHistory(prev => [...prev, userMsg]);
    setInput('');

    // Simulate AI Response
    setTimeout(() => {
      let aiResponseText = "I can help you look that up. Could you clarify the patient's age?";
      const lowerInput = input.toLowerCase();

      if (lowerInput.includes('dose') || lowerInput.includes('mg')) {
        aiResponseText = "⚠️ Standard adult dosage for Ibuprofen is 200-400mg every 4-6 hours. Max 3200mg/day. Please verify patient renal function.";
      } else if (lowerInput.includes('iv') || lowerInput.includes('rate')) {
        aiResponseText = "For standard saline IV, typical maintenance rates are 75-125 mL/hr depending on weight. Check orders for specific additives.";
      } else if (lowerInput.includes('thank')) {
        aiResponseText = "You're welcome! Keep up the great work.";
      }

      const aiMsg = { id: (Date.now() + 1).toString(), sender: 'ai', text: aiResponseText };
      setChatHistory(prev => [...prev, aiMsg]);
    }, 1000);
  };

  return (
    <div className="h-full flex flex-col pb-20">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Ask AI</h2>

      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 mb-4">
        {chatHistory.map(msg => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-xs px-4 py-2 rounded-2xl ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-white rounded-bl-none'
              }`}
            >
              <p className="text-sm">{msg.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask about drug interactions, protocols..."
          className="flex-1 p-3 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none text-sm"
        />
        <button
          onClick={handleSend}
          className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
