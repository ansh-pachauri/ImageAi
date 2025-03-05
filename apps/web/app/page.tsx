"use client";
import { Spotlight } from "../components/ui/Spotlight";
import Link from "next/link";
import { TextGenerateEffect } from "../components/ui/text-generate-effect";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push('/signup');
  }
  return (
    <div className="relative min-h-screen w-full bg-black/[0.96] antialiased bg-grid-white/[0.02]">
      {/* Spotlight Effect */}
      {/* <Spotlight
        className="md:opacity-100 transition-opacity duration-1000"
        fill="white"
      /> */}

      {/* Navigation/Logo */}
      <div className="absolute top-8 left-8 flex items-center gap-2 z-20">
        <h1 className="text-4xl font-bold text-white tracking-wider hover:text-purple-400 transition-colors duration-300">
          Dreamwave
        </h1>
      </div>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-12">
          {/* Hero Text */}
          <div className="space-y-8">
            <TextGenerateEffect
              className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-500 mb-6 text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight"
              words="Create Amazing AI Images With Dreamwave"
              duration={2}
              filter={false}
            />
            <p className="text-gray-400 max-w-2xl mx-auto text-lg sm:text-xl md:text-2xl leading-relaxed">
              Transform your ideas into stunning visuals with our AI-powered image generator tool.
            </p>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center">
            
              <button className="group relative inline-flex h-14 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black"
              onClick={handleSubmit}>
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950/90 px-8 py-3 text-lg font-medium text-white backdrop-blur-3xl transition-all duration-300 group-hover:bg-slate-950/70">
                  Try it now
                  <svg 
                    className="ml-2 w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M13 7l5 5m0 0l-5 5m5-5H6" 
                    />
                  </svg>
                </span>
              </button>
          
          </div>
        </div>
      </main>

      {/* Optional: Background decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3B82F6,transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_80%_600px,#9333EA,transparent)]" />
    </div>
  );
}
