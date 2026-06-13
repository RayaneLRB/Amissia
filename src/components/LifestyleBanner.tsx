import { motion } from 'framer-motion';
import { useSiteData } from '../context/SiteDataContext';

export default function LifestyleBanner() {
  const { data } = useSiteData();

  return (
    <section className="relative py-0 overflow-hidden">
      {/* Full-width parallax image */}
      <div className="relative h-[60vh] lg:h-[80vh]">
        <motion.div
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img
            src={data.images.garden}
            alt="L'inspiration Amissia"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brown-dark/60 via-brown-dark/30 to-brown-dark/50" />
        </motion.div>

        <div className="relative h-full flex items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-3xl"
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-12 h-px bg-champagne-light/50" />
              <span className="text-[10px] tracking-[0.5em] uppercase text-champagne-light/70">
                L'inspiration
              </span>
              <div className="w-12 h-px bg-champagne-light/50" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-6xl font-light text-ivory leading-tight italic">
              « Une promenade dans un jardin fleuri au lever du soleil »
            </h2>
            <p className="mt-8 text-sm text-ivory/50 font-light max-w-lg mx-auto leading-relaxed">
              Chaque fragrance {data.settings.brandName} puise son essence dans la beauté éphémère
              de la nature, capturée à l'instant où la lumière dorée révèle toute sa splendeur.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
