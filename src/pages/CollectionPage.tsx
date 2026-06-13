import { motion } from 'framer-motion';
import { useSiteData } from '../context/SiteDataContext';
import Img from '../components/Img';

interface CollectionPageProps {
  onNavigate: (page: string) => void;
  onSelectFragrance: (id: string) => void;
}

export default function CollectionPage({ onNavigate, onSelectFragrance }: CollectionPageProps) {
  const { data } = useSiteData();

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="relative h-[50vh] lg:h-[60vh] overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0"
        >
          <img src={data.images.lavender} alt="Collection Amissia" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-brown-dark/50 via-brown-dark/30 to-ivory" />
        </motion.div>
        <div className="relative h-full flex items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <span className="text-[10px] tracking-[0.5em] uppercase text-champagne-light/80 block mb-6">
              Nos créations
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-light text-ivory">
              Collection <em className="italic">Signature</em>
            </h1>
            <p className="mt-6 text-sm text-ivory/50 font-light max-w-lg mx-auto">
              {data.fragrances.length} fragrances iconiques pour autant de facettes de la féminité moderne
            </p>
          </motion.div>
        </div>
      </section>

      {/* Fragrances - alternating layout */}
      {data.fragrances.map((fragrance, index) => (
        <section
          key={fragrance.id}
          className={`py-20 lg:py-32 ${index % 2 === 0 ? 'bg-ivory' : 'luxury-gradient'}`}
        >
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center`}>
              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 1 }}
                className={`relative ${index % 2 !== 0 ? 'lg:order-2' : ''}`}
              >
                <div
                  className="relative overflow-hidden aspect-[3/4] cursor-pointer group"
                  onClick={() => {
                    onSelectFragrance(fragrance.id);
                    onNavigate('fragrance');
                  }}
                >
                  <Img
                    src={fragrance.image}
                    alt={`Amissia ${fragrance.name}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brown-dark/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  <div className="absolute bottom-8 left-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                    <span className="text-[10px] tracking-[0.3em] uppercase text-champagne-light border border-champagne-light/40 px-6 py-3 inline-block">
                      Voir le détail →
                    </span>
                  </div>
                </div>

                {/* Volume badge */}
                <div
                  className="absolute top-6 right-6 w-16 h-16 rounded-full flex items-center justify-center border border-champagne/30"
                  style={{ backgroundColor: fragrance.color + '90' }}
                >
                  <span className="text-[10px] tracking-wider text-brown-dark font-light">{fragrance.volume}</span>
                </div>
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 1 }}
                className={index % 2 !== 0 ? 'lg:order-1' : ''}
              >
                <span className="text-[10px] tracking-[0.5em] uppercase text-champagne block mb-4">
                  {data.settings.brandName} — {String(index + 1).padStart(2, '0')}/{String(data.fragrances.length).padStart(2, '0')}
                </span>
                <h2 className="font-serif text-3xl lg:text-5xl font-light text-brown-dark mb-3">
                  {fragrance.name}
                </h2>
                <p className="text-sm italic text-champagne-dark mb-8 font-light">
                  {fragrance.signature}
                </p>

                <p className="text-sm lg:text-base text-brown/60 font-light leading-relaxed mb-10">
                  {fragrance.description}
                </p>

                {/* Notes pyramid */}
                <div className="mb-10">
                  <h4 className="text-[10px] tracking-[0.4em] uppercase text-brown/40 mb-6">Pyramide olfactive</h4>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <span className="text-[10px] tracking-[0.3em] uppercase text-champagne w-16 shrink-0 pt-1">Tête</span>
                      <p className="text-sm text-brown/60 font-light">{fragrance.notes.top.join(' · ')}</p>
                    </div>
                    <div className="w-full h-px bg-beige" />
                    <div className="flex items-start gap-4">
                      <span className="text-[10px] tracking-[0.3em] uppercase text-champagne w-16 shrink-0 pt-1">Cœur</span>
                      <p className="text-sm text-brown/60 font-light">{fragrance.notes.heart.join(' · ')}</p>
                    </div>
                    <div className="w-full h-px bg-beige" />
                    <div className="flex items-start gap-4">
                      <span className="text-[10px] tracking-[0.3em] uppercase text-champagne w-16 shrink-0 pt-1">Fond</span>
                      <p className="text-sm text-brown/60 font-light">{fragrance.notes.base.join(' · ')}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <span className="font-serif text-2xl text-brown-dark">{fragrance.price}</span>
                  <button
                    onClick={() => {
                      onSelectFragrance(fragrance.id);
                      onNavigate('fragrance');
                    }}
                    className="px-8 py-3 border border-champagne/40 text-[11px] tracking-[0.2em] uppercase text-brown-dark hover:bg-champagne/10 transition-all duration-500"
                  >
                    Découvrir
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
