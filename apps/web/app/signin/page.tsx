"use client";
import Image from "next/image";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { cn } from "../../lib/utils";
import { useState } from 'react';
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function Signin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/signin`,
                { username, password },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if(response.data.token) {
                localStorage.setItem('token', response.data.token);
                router.push('/generate');
            } else {
                throw new Error('Invalid credentials');
            }
        } catch(error) {
            console.error(error);
            setError('Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-black/[0.96]">
            {/* Left: Image Section */}
            <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent z-10" />
                <Image 
                    src="/images/signup_grl.jpg" 
                    alt="Signin" 
                    fill
                    className="object-cover object-center transform hover:scale-105 transition-transform duration-500"
                    priority 
                />
            </div>

            {/* Right: Form Section */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 lg:px-16 relative">
                {/* Background Gradients */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3B82F660,transparent)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_80%_600px,#9333EA60,transparent)]" />

                <div className="relative z-10 max-w-md mx-auto w-full space-y-8">
                    {/* Header */}
                    <div className="space-y-4">
                        <h2 className="font-bold text-4xl bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-500">
                            Welcome Back
                        </h2>
                        <p className="text-gray-400 text-lg">
                            Sign in to continue creating amazing AI images
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="p-3 text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg">
                                {error}
                            </div>
                        )}

                        <LabelInputContainer>
                            <Label htmlFor="email">Email Address</Label>
                            <Input 
                                id="email" 
                                placeholder="you@example.com" 
                                type="email"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="bg-gray-900/50 border-gray-800 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500"
                                disabled={loading}
                            />
                        </LabelInputContainer>

                        <LabelInputContainer>
                            <Label htmlFor="password">Password</Label>
                            <Input 
                                id="password" 
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-gray-900/50 border-gray-800 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500"
                                disabled={loading}
                            />
                        </LabelInputContainer>

                        <button
                            type="submit"
                            disabled={loading || !username || !password}
                            className={`relative w-full group bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg h-12 font-medium shadow-lg shadow-purple-500/25 transition-all duration-300 
                                ${loading || !username || !password ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-purple-500/40 hover:-translate-y-0.5'}`}
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                            ) : (
                                "Sign in"
                            )}
                            <span className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>

                        <p className="text-center text-gray-500 mt-8">
                            Don't have an account?{' '}
                            <Link href="/signup" className="text-purple-500 hover:text-purple-400 transition-colors">
                                Sign up
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

// Keep your existing LabelInputContainer component
const LabelInputContainer = ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => {
    return (
      <div className={cn("flex flex-col space-y-2 w-full", className)}>
        {children}
      </div>
    );
  };