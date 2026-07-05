export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      content: "EchoVerse AI completely changed my workflow. Being able to ideate melodies with my own voice in seconds is mind-blowing. The quality is studio-ready.",
      author: "Sarah J.",
      role: "Indie Pop Artist",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    {
      id: 2,
      content: "As a producer, I was skeptical of AI music tools. But EchoVerse gives me granular control. I use it to generate backing vocals and unique sample textures.",
      author: "Marcus T.",
      role: "Music Producer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    },
    {
      id: 3,
      content: "I'm a songwriter but not a great singer. EchoVerse lets me hear my lyrics sung perfectly with realistic emotion before I ever step into a real studio.",
      author: "Elena R.",
      role: "Songwriter",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
    },
  ];

  return (
    <section className="py-24 bg-bg-primary relative border-t border-white/5" id="testimonials">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-pink-600/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white tracking-tight">
            Loved by Creators
          </h2>
          <p className="text-zinc-400 text-lg">
            Join thousands of artists and producers who are pushing the boundaries of music creation.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300"
            >
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              <p className="text-zinc-300 text-lg leading-relaxed mb-8 h-32">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center gap-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full bg-zinc-800"
                  loading="lazy"
                />
                <div>
                  <h4 className="text-white font-semibold">{testimonial.author}</h4>
                  <p className="text-zinc-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
