'use client';
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';
import { Bell, Search, Music, Menu } from 'lucide-react';
import { useUIStore } from '@/lib/store';

export function Navbar() {
  const toggleSidebar = useUIStore((state: any) => state.toggleSidebar);

  return (
    <nav className="fixed top-0 left-0 w-full h-16 border-b border-[rgba(255,255,255,0.08)] glass z-50 flex items-center justify-between px-4 lg:px-8">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="md:hidden p-2 text-text-secondary hover:text-white">
          <Menu className="w-5 h-5" />
        </button>
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
            <Music className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl hidden sm:block">EchoVerse</span>
          <span className="text-xs bg-accent-blue/20 text-accent-blue px-2 py-0.5 rounded-full font-medium ml-1">AI</span>
        </Link>
      </div>

      <div className="flex-1 max-w-xl hidden md:flex items-center px-8">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
          <input 
            type="text" 
            placeholder="Search songs, voices..." 
            className="w-full bg-bg-card border border-[rgba(255,255,255,0.08)] rounded-full py-1.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-accent-blue transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Link href="/create" className="hidden sm:flex items-center justify-center px-4 py-1.5 rounded-full bg-gradient-primary text-white text-sm font-medium hover:opacity-90 transition-opacity">
          Create Song
        </Link>
        <button className="relative p-2 text-text-secondary hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent-pink rounded-full"></span>
        </button>
        <UserButton appearance={{ elements: { avatarBox: "w-8 h-8" } }} />
      </div>
    </nav>
  );
}