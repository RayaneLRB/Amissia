import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    text: "Soft Aura m'accompagne chaque matin. C'est devenu mon rituel de beauté indispensable — cette sensation de fraîcheur qui dure toute la journée est incomparable.",
    author: "Camille L.",
    location: "Paris",
    fragrance: "Soft Aura"
  },
  {
    text: "Addict porte bien son nom. Depuis que je l'ai découverte, je ne peux plus m'en passer. Le sillage est magnifique, à la fois sensuel et élégant.",
    author: "Sofia M.",
    location: "Lyon",
    fragrance: "Addict"
  },
  {
    text: "Fresh Soap Mist est la perfection incarnée. Cette pureté, cette fraîcheur immaculée... C'est le luxe du propre dans sa forme la plus raffinée.",
    author: "Léa B.",
    location: "Bordeaux",
    fragrance: "Fresh Soap Mist"
  },
  {
    text: "Infinite Touch est d'une élégance rare. Les notes florales sont si délicates et sophistiquées. On me complimente chaque fois que je la porte.",
    author: "Inès R.",
    location: "Marseille",
    fragrance: "Infinite Touch"
  }
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-28 lg:py-40 bg-ivory relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-rose-blush/20 blur-3xl" />
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[10px] tracking-[0.5em] uppercase text-champagne block mb-6">
            Témoignages
          </span>
          <h2 className="font-serif text-3xl lg:text-5xl font-light text-brown-dark">
            Elles <em className="italic">racontent</em>
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto text-center min-h-[250px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="w-full"
            >
              <div className="text-4xl text-champagne/30 mb-6 font-serif">❝</div>
              <blockquote className="font-serif text-xl lg:text-2xl font-light text-brown-dark leading-relaxed italic mb-8">
                {testimonials[current].text}
              </blockquote>
              <div>
                <p className="text-sm text-brown-dark font-light">{testimonials[current].author}</p>
                <p className="text-[10px] tracking-[0.3em] uppercase text-champagne mt-1">
                  {testimonials[current].location} · {testimonials[current].fragrance}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-3 mt-12">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`transition-all duration-500 ${
                i === current
                  ? 'w-8 h-1 bg-champagne'
                  : 'w-2 h-1 bg-beige-dark/40 hover:bg-champagne/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
