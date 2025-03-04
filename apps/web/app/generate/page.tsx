"use client";

import { Input } from "../../components/ui/input";
import { useState, useRef } from "react";
import axios from "axios";

export default function Generate() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [prompt, setPrompt] = useState('');
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!prompt) return;
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
                // Handle Axios-specific errors
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
    
    return (
        <div className="min-h-screen bg-black/[0.96] p-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="flex justify-center">
                    {loading && (
                        <div className="text-white">Generating your image...</div>
                    )}
                    {error && (
                        <div className="text-red-500">{error}</div>
                    )}
                    {image && (
                        <img 
                            src={image} 
                            alt="Generated Image" 
                            className="rounded-lg shadow-lg max-w-full h-auto" 
                        />
                    )}
                </div>
            </div>
           
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex gap-2">
                    <Input 
                        type="text" 
                        placeholder="Enter your prompt here" 
                        ref={inputRef} 
                        value={prompt} 
                        onChange={(e) => setPrompt(e.target.value)} 
                        className="flex-1 bg-gray-800 text-white border-gray-700" 
                        disabled={loading} 
                    />
                    <button 
                        type="submit" 
                        disabled={loading || !prompt} 
                        className={`px-4 py-2 rounded-md bg-blue-600 text-white font-medium ${loading || !prompt ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                    >
                        Generate
                    </button>
                </div>
            </form>

            {prompt && (
                <div className="text-gray-400">
                    Last prompt: {prompt}
                </div>
            )}
        </div>
    )
}