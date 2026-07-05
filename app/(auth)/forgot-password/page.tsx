'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, CheckCircle, Loader2 } from 'lucide-react';

type FormState = 'idle' | 'loading' | 'success' | 'error';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (value: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setFormState('loading');
    setErrorMessage('');

    // Simulate password reset — in production this would call Clerk's
    // password reset flow or a custom API route. Clerk handles actual
    // password-reset emails via the dashboard-configured email template.
    try {
      await new Promise<void>((resolve) => setTimeout(resolve, 1200));
      setFormState('success');
    } catch {
      setFormState('error');
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  if (formState === 'success') {
    return (
      <div className="flex flex-col items-center py-4 text-center">
        {/* Success icon */}
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 ring-1 ring-emerald-500/30">
          <CheckCircle className="h-8 w-8 text-emerald-400" strokeWidth={1.5} />
        </div>

        <h2 className="text-xl font-bold text-white">Check your inbox</h2>
        <p className="mt-2 text-sm leading-relaxed text-white/50">
          We&apos;ve sent a password reset link to{' '}
          <span className="font-medium text-white/70">{email}</span>. It may
          take a minute to arrive.
        </p>

        <p className="mt-4 text-xs text-white/30">
          Didn&apos;t receive it? Check your spam folder or{' '}
          <button
            onClick={() => {
              setFormState('idle');
              setEmail('');
            }}
            className="text-purple-400 underline-offset-2 hover:text-purple-300 hover:underline"
          >
            try again
          </button>
          .
        </p>

        <Link
          href="/sign-in"
          className="mt-8 inline-flex items-center gap-2 text-sm text-white/50 hover:text-white/80 transition-colors duration-150"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="mb-7 text-center">
        {/* Key icon */}
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 ring-1 ring-purple-500/30">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-7 w-7 text-purple-400"
            aria-hidden="true"
          >
            <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Reset your password
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-white/50">
          Enter your email and we&apos;ll send you a reset link
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* Email field */}
        <div className="space-y-1.5">
          <label
            htmlFor="reset-email"
            className="block text-sm font-medium text-white/70"
          >
            Email address
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
              <Mail className="h-4 w-4 text-white/30" />
            </div>
            <input
              id="reset-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errorMessage) setErrorMessage('');
              }}
              placeholder="you@example.com"
              required
              disabled={formState === 'loading'}
              className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-sm text-white placeholder:text-white/25 transition-all duration-150 focus:border-purple-500/60 focus:bg-white/8 focus:outline-none focus:ring-2 focus:ring-purple-500/20 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>
          {errorMessage && (
            <p className="text-xs text-red-400" role="alert">
              {errorMessage}
            </p>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={formState === 'loading' || !email.trim()}
          className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition-all duration-150 hover:from-purple-500 hover:to-blue-500 hover:shadow-purple-500/30 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {/* Button shimmer */}
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
          <span className="relative flex items-center justify-center gap-2">
            {formState === 'loading' ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending reset link…
              </>
            ) : (
              'Send Reset Link'
            )}
          </span>
        </button>
      </form>

      {/* Back to sign in */}
      <div className="mt-6 text-center">
        <Link
          href="/sign-in"
          className="inline-flex items-center gap-1.5 text-sm text-white/40 transition-colors duration-150 hover:text-white/70"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to sign in
        </Link>
      </div>
    </div>
  );
}
