import Link from 'next/link';
import type { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#050508]">
      {/* Animated deep-space gradient background */}
      <div className="pointer-events-none absolute inset-0">
        {/* Base radial purple glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(120,40,200,0.35),transparent)]" />
        {/* Secondary deep blue glow bottom-right */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_110%,rgba(30,60,200,0.2),transparent)]" />
        {/* Subtle teal accent top-right */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_90%_10%,rgba(0,200,180,0.08),transparent)]" />
        {/* Noise/grain texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '128px 128px',
          }}
        />
      </div>

      {/* Animated floating orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[15%] top-[20%] h-72 w-72 animate-pulse rounded-full bg-purple-600/10 blur-3xl" />
        <div className="absolute right-[10%] top-[60%] h-64 w-64 animate-pulse rounded-full bg-blue-600/10 blur-3xl delay-1000" />
        <div className="absolute left-[60%] top-[5%] h-48 w-48 animate-pulse rounded-full bg-violet-500/8 blur-2xl delay-500" />
      </div>

      {/* Top-left EchoVerse wordmark */}
      <div className="relative z-10 p-6">
        <Link href="/" className="group inline-flex items-center gap-2.5">
          {/* Music note icon */}
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 shadow-lg shadow-purple-500/25 transition-transform duration-200 group-hover:scale-105">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5 text-white"
              aria-hidden="true"
            >
              <path d="M9 3v10.55A4 4 0 1 0 11 17V7h4V3H9z" />
            </svg>
          </div>
          {/* Wordmark */}
          <span className="text-xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-purple-400 via-violet-300 to-blue-400 bg-clip-text text-transparent">
              EchoVerse
            </span>
            <span className="ml-1.5 rounded-md bg-gradient-to-r from-purple-500/20 to-blue-500/20 px-1.5 py-0.5 text-xs font-semibold text-purple-300 ring-1 ring-purple-500/30">
              AI
            </span>
          </span>
        </Link>
      </div>

      {/* Centered auth card container */}
      <main className="relative z-10 flex min-h-[calc(100vh-88px)] items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Glassmorphism card */}
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] shadow-2xl shadow-black/40 backdrop-blur-xl">
            {/* Card inner glow */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.06] to-transparent" />
            {/* Card top border shimmer */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
            <div className="relative p-8">{children}</div>
          </div>

          {/* Footer links */}
          <p className="mt-6 text-center text-sm text-white/40">
            By continuing, you agree to our{' '}
            <Link
              href="/terms"
              className="text-purple-400/80 underline-offset-2 hover:text-purple-300 hover:underline"
            >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link
              href="/privacy"
              className="text-purple-400/80 underline-offset-2 hover:text-purple-300 hover:underline"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </main>
    </div>
  );
}
