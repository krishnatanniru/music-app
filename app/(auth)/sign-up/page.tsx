'use client';

import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="flex flex-col items-center">
      {/* Heading above Clerk's component */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Create your studio
        </h1>
        <p className="mt-1.5 text-sm text-white/50">
          Start generating AI music and voice today — free
        </p>
      </div>

      <SignUp
        routing="hash"
        forceRedirectUrl="/dashboard"
        fallbackRedirectUrl="/dashboard"
      />
    </div>
  );
}
