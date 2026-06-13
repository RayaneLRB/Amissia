import { motion } from 'framer-motion';
import { useSiteData } from '../context/SiteDataContext';

interface HeroSectionProps {
  onNavigate: (page: string) => void;
}

export default function HeroSection({ onNavigate }: HeroSectionProps) {
  const { data } = useSiteData();
  const s = data.settings;

  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden">
      {/* Background Image */}
      <motion.div
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute inset-0"
      >
        <img
          src={data.images.hero}
          alt="Amissia Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brown-dark/70 via-brown-dark/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-brown-dark/50 via-transparent to-brown-dark/20" />
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-champagne/5 blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-72 h-72 rounded-full bg-rose/5 blur-3xl" />

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1 }}
            >
              <span className="text-[10px] tracking-[0.6em] uppercase text-champagne-light/80 font-light block mb-8">
                Maison de Brumes Corporelles
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="font-serif text-5xl sm:text-6xl lg:text-8xl font-light text-ivory leading-[0.95] mb-8"
            >
              <span className="block">{s.heroTitle1}</span>
              <span className="block italic text-champagne-light mt-2">{s.heroTitle2}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 1 }}
              className="text-base lg:text-lg text-ivory/60 font-light max-w-lg leading-relaxed mb-12"
            >
              {s.heroSubtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 1 }}
              className="flex flex-wrap gap-6"
            >
              <button
                onClick={() => onNavigate('collection')}
                className="group relative px-10 py-4 border border-champagne/50 text-champagne text-[11px] tracking-[0.3em] uppercase overflow-hidden transition-all duration-700 hover:border-champagne"
              >
                <span className="absolute inset-0 bg-champagne/10 translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                <span className="relative">Découvrir la collection</span>
              </button>
              <button
                onClick={() => onNavigate('univers')}
                className="px-10 py-4 text-ivory/50 text-[11px] tracking-[0.3em] uppercase hover:text-ivory transition-colors duration-500"
              >
                Notre univers
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[9px] tracking-[0.4em] uppercase text-ivory/30 font-light">
          Défiler
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-champagne/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}
