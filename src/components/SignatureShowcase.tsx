import { motion } from 'framer-motion';
import { useSiteData } from '../context/SiteDataContext';
import Img from './Img';

interface SignatureShowcaseProps {
  onNavigate: (page: string) => void;
  onSelectFragrance: (id: string) => void;
}

export default function SignatureShowcase({ onNavigate, onSelectFragrance }: SignatureShowcaseProps) {
  const { data } = useSiteData();

  return (
    <section className="py-28 lg:py-40 bg-ivory">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 lg:mb-28"
        >
          <span className="text-[10px] tracking-[0.5em] uppercase text-champagne block mb-6">
            Les quatre signatures
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-6xl font-light text-brown-dark">
            Collection <em className="italic">Signature</em>
          </h2>
          <p className="mt-6 text-sm text-brown/50 font-light max-w-lg mx-auto">
            Quatre créations d'exception, quatre univers olfactifs,
            quatre façons de sublimer votre féminité.
          </p>
        </motion.div>

        {/* Fragrances Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {data.fragrances.map((fragrance, index) => (
            <motion.div
              key={fragrance.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="group cursor-pointer"
              onClick={() => {
                onSelectFragrance(fragrance.id);
                onNavigate('fragrance');
              }}
            >
              <div className="relative overflow-hidden aspect-[3/4] mb-6">
                <Img
                  src={fragrance.image}
                  alt={`Amissia ${fragrance.name}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brown-dark/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Hover overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-champagne-light">
                    Découvrir →
                  </span>
                </div>

                {/* Corner accent */}
                <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-champagne/30 opacity-0 group-hover:opacity-100 transition-all duration-700" />
              </div>

              <div>
                <span className="text-[9px] tracking-[0.4em] uppercase text-champagne block mb-2">
                  Amissia
                </span>
                <h3 className="font-serif text-xl lg:text-2xl text-brown-dark font-light group-hover:text-champagne-dark transition-colors duration-500">
                  {fragrance.name}
                </h3>
                <p className="text-xs text-brown/40 mt-2 font-light italic">
                  {fragrance.signature}
                </p>
                <p className="text-sm text-champagne-dark mt-3 font-light">
                  {fragrance.price}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-20"
        >
          <button
            onClick={() => onNavigate('collection')}
            className="group relative inline-flex items-center gap-4 px-12 py-4 border border-champagne/40 text-brown-dark text-[11px] tracking-[0.3em] uppercase hover:border-champagne transition-all duration-700"
          >
            <span>Explorer la collection</span>
            <motion.span
              className="inline-block"
              whileHover={{ x: 5 }}
            >
              →
            </motion.span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
