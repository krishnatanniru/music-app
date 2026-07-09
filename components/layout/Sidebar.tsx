'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Music, Mic, Library, Users, User, Shield, MessageSquare, Bell } from 'lucide-react';
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
    { name: 'Chat', href: '/chat', icon: MessageSquare },
    { name: 'Notifications', href: '/notifications', icon: Bell },
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
}