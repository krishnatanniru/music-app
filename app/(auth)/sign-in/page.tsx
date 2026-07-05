'use client';

import { SignIn } from '@clerk/nextjs';
import type { Metadata } from 'next';

// Note: metadata exports are not used in client components,
// but the page title is set via the auth layout / root layout template.

export default function SignInPage() {
  return (
    <div className="flex flex-col items-center">
      {/* Heading above Clerk's component */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Welcome back
        </h1>
        <p className="mt-1.5 text-sm text-white/50">
          Sign in to your EchoVerse AI studio
        </p>
      </div>

      <SignIn
        routing="hash"
        forceRedirectUrl="/dashboard"
        fallbackRedirectUrl="/dashboard"
      />
    </div>
  );
}
