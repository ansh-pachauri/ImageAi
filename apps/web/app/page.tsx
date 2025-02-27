import { Spotlight } from "../components/ui/Spotlight";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-black/[0.96] antialiased bg-grid-white/[0.02]">
      <div className="relative flex flex-col items-center justify-center h-screen overflow-hidden">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-8">
            Create Amazing AI Images
          </h1>
          <p className="text-gray-400 max-w-lg mx-auto text-lg">
            Transform your ideas into stunning visuals with our AI-powered image generator tool. 
          </p>
          
        </div>
        <div className="mt-8 w-full flex justify-center">
          <Link href={"/signup"}>
          <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
          Try it now
        </span>
      </button>
          </Link>
        
        </div>
      </div>
    </div>
  );
}