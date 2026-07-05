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
        appearance={{
          layout: {
            socialButtonsVariant: 'iconButton',
            socialButtonsPlacement: 'top',
          },
          variables: {
            colorPrimary: '#8b5cf6',
            colorBackground: 'transparent',
            colorInputBackground: 'rgba(255,255,255,0.05)',
            colorInputText: '#f8fafc',
            colorText: '#f8fafc',
            colorTextSecondary: 'rgba(248,250,252,0.5)',
            colorNeutral: '#94a3b8',
            colorDanger: '#f87171',
            colorSuccess: '#34d399',
            borderRadius: '0.75rem',
            fontFamily: 'var(--font-sora), var(--font-inter), sans-serif',
            fontSize: '0.9375rem',
          },
          elements: {
            rootBox: 'w-full',
            card: 'bg-transparent shadow-none border-0 p-0',
            headerTitle: 'hidden',
            headerSubtitle: 'hidden',
            socialButtonsIconButton:
              'border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-colors duration-150',
            socialButtonsBlockButton:
              'border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-colors duration-150',
            dividerLine: 'bg-white/10',
            dividerText: 'text-white/40',
            formFieldLabel: 'text-white/70 text-sm font-medium',
            formFieldInput:
              'bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20 rounded-xl transition-all duration-150',
            formButtonPrimary:
              'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/20 transition-all duration-150 hover:shadow-purple-500/30',
            footerActionLink:
              'text-purple-400 hover:text-purple-300 font-medium',
            identityPreviewText: 'text-white/70',
            identityPreviewEditButton: 'text-purple-400 hover:text-purple-300',
            formResendCodeLink: 'text-purple-400 hover:text-purple-300',
            otpCodeFieldInput:
              'border border-white/10 bg-white/5 text-white focus:border-purple-500 rounded-lg',
            alertText: 'text-red-400',
            formFieldErrorText: 'text-red-400 text-xs',
            footer: 'bg-transparent',
            logoBox: 'hidden',
            logoImage: 'hidden',
          },
        }}
      />
    </div>
  );
}
