const fs = require('fs');
const path = require('path');

const files = {
  'lib/utils/cn.ts': `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`,
  'lib/store/index.ts': `'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUIStore = create((set) => ({
  sidebarOpen: true,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));

export const useSongStore = create((set) => ({
  songs: [],
  setSongs: (songs) => set({ songs }),
}));
`,
  'components/layout/Sidebar.tsx': `'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Music, Mic, Library, Users, User, Shield } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useUIStore } from '@/lib/store';

export function Sidebar() {
  const pathname = usePathname();
  const sidebarOpen = useUIStore((state: any) => state.sidebarOpen);

  const links = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Create Song', href: '/create', icon: Music },
    { name: 'Voice Library', href: '/voice-library', icon: Mic },
    { name: 'Community', href: '/community', icon: Users },
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'Admin', href: '/admin', icon: Shield },
  ];

  if (!sidebarOpen) return null;

  return (
    <aside className="fixed left-0 top-16 w-64 h-[calc(100vh-4rem)] border-r border-[rgba(255,255,255,0.08)] bg-bg-primary z-40 hidden md:block">
      <div className="flex flex-col h-full py-4 px-3 gap-2">
        {links.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-md transition-colors',
                isActive 
                  ? 'bg-bg-card border-l-2 border-accent-blue text-white' 
                  : 'text-text-secondary hover:text-white hover:bg-bg-card-hover'
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}`,
  'components/layout/Navbar.tsx': `'use client';
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
        <UserButton afterSignOutUrl="/" appearance={{ elements: { avatarBox: "w-8 h-8" } }} />
      </div>
    </nav>
  );
}`,
  'app/(dashboard)/layout.tsx': `import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bg-primary">
      <Navbar />
      <Sidebar />
      <main className="pt-16 md:pl-64 min-h-screen">
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}`,
  'app/(dashboard)/dashboard/page.tsx': `import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | EchoVerse AI',
};

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Welcome back!</h1>
        <p className="text-text-secondary">Here's a quick overview of your music studio.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Total Songs', value: '12' },
          { title: 'Voice Profiles', value: '3' },
          { title: 'Total Plays', value: '1,248' },
          { title: 'Credits Remaining', value: '45' }
        ].map((stat, i) => (
          <div key={i} className="glass p-6 rounded-xl flex flex-col gap-2">
            <h3 className="text-text-secondary text-sm font-medium">{stat.title}</h3>
            <p className="text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between items-center mt-8">
        <h2 className="text-xl font-bold">Recent Songs</h2>
      </div>
      
      <div className="glass rounded-xl p-12 flex flex-col items-center justify-center text-center gap-4">
        <div className="w-16 h-16 rounded-full bg-bg-card flex items-center justify-center">
          <span className="text-2xl">🎵</span>
        </div>
        <h3 className="text-lg font-medium">No songs yet</h3>
        <p className="text-text-secondary max-w-md">You haven't generated any songs yet. Head over to the Create tab to generate your first AI masterpiece.</p>
      </div>
    </div>
  );
}`,
  'app/(dashboard)/create/page.tsx': `export default function CreateSongPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Create a Song</h1>
      <div className="glass p-8 rounded-xl flex flex-col items-center justify-center min-h-[400px]">
        <h2 className="text-xl text-text-secondary mb-4">Song Creation UI</h2>
        <p className="text-text-muted">The song creation form and generation pipeline will go here.</p>
      </div>
    </div>
  );
}`
};

for (const [filepath, content] of Object.entries(files)) {
  const dir = path.dirname(filepath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filepath, content);
  console.log('Created:', filepath);
}
