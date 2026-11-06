"use client";

import { useChat } from "ai/react";
import { useState } from "react";

const types = ["Ad Copy", "Product Description", "Email Sequence", "Social Caption", "Whitepaper Outline", "Landing Page Copy"];

export default function Home() {
  const [type, setType] = useState("Ad Copy");
  const system = `You are Nexorian AI Writing Assistant. Generate high-integrity, persuasive, clear ${type}. Prioritize accuracy, value, and efficiency. No fluff. Be precise and professional.`;

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    body: { context: system },
  });

  return (
    <main className="max-w-3xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-2">Nexorian AI Writing Assistant</h1>
      <p className="mb-6 text-lg">Ads, product descriptions, emails, whitepapers, social, and more.</p>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Output Type</label>
        <select value={type} onChange={(e) => setType(e.target.value)} className="border p-2 rounded">
          {types.map(t => <option key={t}>{t}</option>)}
        </select>
      </div>

      <div className="border rounded p-4 h-96 overflow-y-auto mb-4 bg-white/70">
        {messages.length === 0 && <p className="text-gray-500">Describe what you need written...</p>}
        {messages.map((m) => (
          <div key={m.id} className="mb-3">
            <strong>{m.role === "user" ? "You" : "Nexorian"}:</strong>
            <div className="whitespace-pre-wrap mt-1">{m.content}</div>
          </div>
        ))}
        {isLoading && <div className="text-amber-700">Writing...</div>}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="e.g. Product description for a sovereign wealth kernel"
          className="flex-1 border p-3 rounded"
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading} className="bg-amber-700 text-white px-6 py-3 rounded font-medium">
          Write
        </button>
      </form>
    </main>
  );
}