'use client';

import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import Link from "next/link"
import { Leaf } from 'lucide-react';
import { useState } from 'react';

export default function ChatbotPage() {
    const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { role: 'user' as const, text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            const response = await fetch('https://mcp-server2.onrender.com/chatbot', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    language: 'English',
                    question: input
                })
            });

            const data = await response.json();
            const botReply = data.response || 'No response from server.';

            setMessages(prev => [...prev, { role: 'bot', text: botReply }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'bot', text: 'Error connecting to the server.' }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex-1">
             {/* Navigation */}
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              {/* Logo can be an image or icon, here using a placeholder icon */}   
            <Leaf className="h-6 w-6 text-green-600" />
            <span className="text-xl font-bold">AgroWise</span>
            </Link>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:underline underline-offset-4">
              How It Works
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:underline underline-offset-4">
              Testimonials
            </Link>
            <Link href="#contact" className="text-sm font-medium hover:underline underline-offset-4">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="outline" size="sm">
              Log In
            </Button>
            <Button size="sm" className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600">
              Sign Up
            </Button>
          </div>
        </div>
      </header>
            <section className="w-full py-5 md:py-5 bg-green-50 dark:bg-green-900/20">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center space-y-6">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-4xl text-green-700 dark:text-green-400">
                            Farming Assistant Chatbot 🌾
                        </h1>
                        <p className="max-w-[600px] text-gray-500 dark:text-gray-400 text-center md:text-xl/relaxed">
                            Ask any farming-related questions and get instant AI-powered answers to help you make informed decisions.
                        </p>
                    </div>
                </div>
            </section>

            <section className="w-full py-12 bg-white dark:bg-gray-950">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center space-y-6">
                        <div className="w-full max-w-xl bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 flex flex-col space-y-3 overflow-y-auto h-[60vh]">
                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`p-3 rounded-lg max-w-[80%] whitespace-pre-wrap ${
                                        msg.role === 'user'
                                            ? 'bg-green-100 dark:bg-green-700/50 self-end text-right'
                                            : 'bg-gray-100 dark:bg-gray-700 self-start text-left'
                                    }`}
                                >
                                    {msg.text}
                                </div>
                            ))}
                            {loading && <p className="text-gray-400 italic">Typing...</p>}
                        </div>

                        <div className="w-full max-w-xl flex space-x-2">
                            <input
                                type="text"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleSend()}
                                placeholder="Ask something about farming..."
                                className="flex-1 border border-green-300 dark:border-gray-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-green-600"
                            />
                            <button
                                onClick={handleSend}
                                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 transition"
                                disabled={loading}
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
