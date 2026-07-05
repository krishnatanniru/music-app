import Link from 'next/link'

export default function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background with gradient and grid */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary to-[#1a0b2e]" />
      <div 
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto rounded-3xl p-8 md:p-16 border border-white/10 text-center relative overflow-hidden backdrop-blur-md"
             style={{
               background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)'
             }}
        >
          {/* Animated decorative blobs inside the card */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-500/30 rounded-full blur-[80px]" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/30 rounded-full blur-[80px]" />

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight relative z-10">
            Ready to shape the future of sound?
          </h2>
          <p className="text-xl text-zinc-300 mb-10 max-w-2xl mx-auto relative z-10">
            Join the beta today and get 5 free generations. No credit card required. Experience AI music creation without limits.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <Link
              href="/signup"
              className="px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:shadow-[0_0_50px_rgba(168,85,247,0.6)]"
              style={{ background: 'linear-gradient(135deg, #9333ea 0%, #db2777 100%)' }}
            >
              Start Creating Now
            </Link>
            <Link
              href="#pricing"
              className="px-8 py-4 rounded-full font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/10 transition-colors"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
