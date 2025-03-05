'use client';

import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";

export function SocialButtons() {
  return (
    <div className="space-y-3">
      <button
        type="button"
        className="relative group w-full flex items-center justify-center gap-2 h-12 bg-gray-900/50 text-white rounded-lg border border-gray-800 hover:border-gray-600 transition-colors duration-300"
      >
        <IconBrandGithub className="w-5 h-5" />
        <span>GitHub</span>
      </button>

      <button
        type="button"
        className="relative group w-full flex items-center justify-center gap-2 h-12 bg-gray-900/50 text-white rounded-lg border border-gray-800 hover:border-gray-600 transition-colors duration-300"
      >
        <IconBrandGoogle className="w-5 h-5" />
        <span>Google</span>
      </button>
    </div>
  );
}