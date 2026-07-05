import { Check } from 'lucide-react'

export default function PricingSection() {
  const plans = [
    {
      name: 'Starter',
      price: '$0',
      description: 'Perfect for trying out EchoVerse AI capabilities.',
      features: [
        '5 AI song generations per month',
        'Standard voice models',
        'MP3 downloads',
        'Community support',
      ],
      buttonText: 'Get Started',
      popular: false,
    },
    {
      name: 'Creator',
      price: '$15',
      period: '/mo',
      description: 'Everything you need to produce professional tracks.',
      features: [
        '50 AI song generations per month',
        'Premium voice models',
        'Voice cloning (up to 3 voices)',
        'WAV & MP3 downloads',
        'Commercial use rights',
        'Priority support',
      ],
      buttonText: 'Start 7-Day Trial',
      popular: true,
    },
    {
      name: 'Studio',
      price: '$49',
      period: '/mo',
      description: 'For power users and professional producers.',
      features: [
        'Unlimited AI generations',
        'All premium voices & custom models',
        'Unlimited voice cloning',
        'Stems export (Vocals, Drums, Bass, etc.)',
        'Full commercial use rights',
        '24/7 Priority support',
      ],
      buttonText: 'Get Studio',
      popular: false,
    },
  ]

  return (
    <section className="relative py-24 bg-bg-primary overflow-hidden" id="pricing">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white tracking-tight">
            Simple, Transparent Pricing
          </h2>
          <p className="text-zinc-400 text-lg">
            Choose the perfect plan for your creative journey. Upgrade, downgrade, or cancel anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 ${
                plan.popular
                  ? 'bg-white/10 border-2 border-purple-500 shadow-[0_0_40px_rgba(168,85,247,0.2)]'
                  : 'bg-white/5 border border-white/10 hover:border-white/20'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-white mb-2">{plan.name}</h3>
                <p className="text-zinc-400 text-sm h-10">{plan.description}</p>
              </div>

              <div className="mb-8 flex items-end gap-1">
                <span className="text-5xl font-bold text-white">{plan.price}</span>
                {plan.period && <span className="text-zinc-400 mb-2">{plan.period}</span>}
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-3 text-zinc-300">
                    <Check className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 ${
                  plan.popular
                    ? 'bg-white text-purple-900 hover:bg-zinc-200 hover:shadow-lg'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
