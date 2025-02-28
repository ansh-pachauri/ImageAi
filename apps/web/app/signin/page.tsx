"use client";
import Image from "next/image";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { cn } from "../../lib/utils";
import { useState } from 'react';

import Link from "next/link";
export default function Signin() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form submitted");
      };
    return (
        <div className="min-h-screen flex justify-between bg-black/[0.96] ">
            {/* Image */}
            <div >
            <Image src="/images/signup_grl.jpg" alt="Signup" width={500} height={500} className="object-cover" priority />

            </div>
            {/* Form */}
            <div className="flex flex-col justify-center max-w-md mx-auto p-8 ">
            <h2 className="font-bold  text-3xl text-neutral-800 dark:text-neutral-200">
             Welcome Back to DreamWeave
      </h2>
      <p className="text-neutral-600 text-md max-w-sm mt-2 dark:text-neutral-300">
        Login to your account for image generation
      </p>

                 <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          
          
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="projectmayhem@fc.com" type="email" value={username} onChange={(e) => setUsername(e.target.value)} />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </LabelInputContainer>
        

        <Link href="/generate">
        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          
        >
          Sign in &rarr;
          <BottomGradient />
        </button>
        </Link>
        
 
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
 
        
      </form>
                
            </div>

        </div>
    )
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