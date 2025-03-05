"use client";
import Image from "next/image";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { cn } from "../../lib/utils";
import { useState, useRef } from 'react';
import axios from "axios";
import { useRouter } from "next/navigation";
import { SocialButtons } from "../../components/ui/SocialButtons";
import Link from "next/link";

import {
  IconBrandGithub,
  IconBrandGoogle,
} from "@tabler/icons-react";
export default function Signup() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const handleSubmit =async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form submitted");

        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        try{
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/signup`,{username, password},{
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if(!response.data.userId){
                throw new Error('Failed to sign up');
            }
            router.push('/signin');
            console.log(response.data.userId);
        }catch(error){
            console.error(error);
        }
    
            
            
            
        
      };
    return (
        <div className="min-h-screen flex bg-black/[0.96]">
            {/* Left: Image Section */}
            <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent z-10" />
                <Image 
                    src="/images/signup_grl.jpg" 
                    alt="Signup" 
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

                <div className="relative z-10 max-w-md mx-auto w-full">
                    {/* Header */}
                    <div className="space-y-4 mb-8">
                        <h2 className="font-bold text-4xl bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-500">
                            Welcome to DreamWeave
                        </h2>
                        <p className="text-gray-400 text-lg">
                            Create your account and start generating amazing AI images
                        </p>
                    </div>

                    {/* Form */}
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <LabelInputContainer className="mb-4">
                            <Label htmlFor="email" className="text-gray-300">Email Address</Label>
                            <Input 
                                id="email" 
                                placeholder="you@example.com" 
                                type="email"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                ref={usernameRef}
                                className="bg-gray-900/50 border-gray-800 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500"
                            />
                        </LabelInputContainer>

                        <LabelInputContainer className="mb-4">
                            <Label htmlFor="password" className="text-gray-300">Password</Label>
                            <Input
                                id="password"
                                placeholder="••••••••"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                ref={passwordRef}
                                className="bg-gray-900/50 border-gray-800 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500"
                            />
                        </LabelInputContainer>

                        <button
                            className="relative w-full group bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg h-12 font-medium shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-purple-500/40 hover:-translate-y-0.5"
                            type="submit"
                        >
                            Sign up
                            <span className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>

                        {/* Separator */}
                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-800"></div>
                            </div>
                            
                        </div>

                        {/* Social Buttons */}
                        <SocialButtons />

                        <p className="text-center text-gray-500 mt-8">
                            Don't have an account?{' '}
                            <Link href="/signin" className="text-purple-500 hover:text-purple-400 transition-colors">
                                Sign in
                            </Link>
                        </p>

                       
                    </form>
                </div>
            </div>
        </div>
    );
}

const BottomGradient = () => {
    return (
      <>
        <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
        <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
      </>
    );
  };
   
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