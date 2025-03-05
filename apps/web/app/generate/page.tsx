"use client";

import { Input } from "../../components/ui/input";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { Sparkles, Image as ImageIcon, Loader2 } from "lucide-react";

export default function Generate() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [prompt, setPrompt] = useState('');
    const [image, setImage] = useState<string | null>(null); // Change to null initially
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false); // Add mounted state

    // Add useEffect to handle client-side mounting
    useEffect(() => {
        setMounted(true);
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!prompt) return;
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/image`,
                { prompt },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: localStorage.getItem('token') || ''
                    }
                }
            );

            if (!response.data.imageUrl) {
                throw new Error('Failed to generate image');
            }

            setImage(response.data.imageUrl);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message || 'Failed to generate image');
            } else if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('An unexpected error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    // Don't render anything until mounted
    if (!mounted) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Sparkles className="w-8 h-8 text-purple-400" />
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
                            DreamWave Image Generator
                        </h1>
                    </div>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Transform your ideas into stunning visuals with our AI-powered image generator.
                        Just describe what you want to see, and watch the magic happen.
                    </p>
                </div>
            </div>

            <div className="space-y-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <div className="relative bg-gray-800 rounded-lg p-1">
                            <div className="flex gap-2">
                                <input 
                                    type="text"
                                    placeholder="Enter your prompt here"
                                    ref={inputRef}
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    className="flex-1 bg-gray-900 text-white border-0 rounded-md p-4 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                    disabled={loading}
                                />
                                <button 
                                    type="submit"
                                    disabled={loading || !prompt}
                                    className={`px-6 py-2 rounded-md bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium transition-all duration-200 
                                        ${loading || !prompt ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90 hover:scale-105'}`}
                                >
                                    {loading ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        'Generate'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400">
                        {error}
                    </div>
                )}

                <div className="flex justify-center">
                    {loading ? (
                        <div className="bg-gray-800/50 rounded-lg p-8 text-center">
                            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-purple-400" />
                            <p className="text-gray-400">Creating your masterpiece...</p>
                        </div>
                    ) : image ? (
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity" />
                            <Image 
                                src={image}
                                alt="Generated Image"
                                width={512}
                                height={512}
                                className="relative rounded-lg shadow-2xl max-w-full h-auto transform transition-transform duration-300 group-hover:scale-[1.01]"
                                unoptimized
                            />
                        </div>
                    ) : (
                        <div className="bg-gray-800/30 rounded-lg p-12 text-center">
                            <ImageIcon className="w-12 h-12 mx-auto mb-4 text-gray-600" />
                            <p className="text-gray-500">Your generated image will appear here</p>
                        </div>
                    )}
                </div>
            </div>

            {prompt && mounted && (
                <div className="mt-4 text-center">
                    <span className="text-gray-500">Last prompt: </span>
                    <span className="text-gray-300 italic">{prompt}</span>
                </div>
            )}
        </div>
    );
}
