import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSiteData } from '../context/SiteDataContext';
import Img from '../components/Img';
import OrderModal from '../components/OrderModal';

interface FragrancePageProps {
  fragranceId: string;
  onNavigate: (page: string) => void;
  onSelectFragrance: (id: string) => void;
}

export default function FragrancePage({ fragranceId, onNavigate, onSelectFragrance }: FragrancePageProps) {
  const { data } = useSiteData();
  const [orderOpen, setOrderOpen] = useState(false);
  const fragrance = data.fragrances.find(f => f.id === fragranceId) || data.fragrances[0];
  const otherFragrances = data.fragrances.filter(f => f.id !== fragranceId);

  if (!fragrance) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <p className="text-brown/50">Fragrance introuvable</p>
      </div>
    );
  }

  return (
    <div className="pt-24">
      {/* Main product section */}
      <section className="min-h-[90vh] flex items-center py-16 lg:py-0">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <div className="relative overflow-hidden aspect-[3/4]" style={{ background: fragrance.gradient }}>
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="w-full h-full"
                >
                  <Img
                    src={fragrance.image}
                    alt={`${data.settings.brandName} ${fragrance.name}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent" />
              </div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="absolute -left-3 top-1/4 bg-ivory shadow-xl p-4 lg:p-6"
              >
                <span className="text-[9px] tracking-[0.3em] uppercase text-champagne block">Volume</span>
                <span className="font-serif text-lg text-brown-dark">{fragrance.volume}</span>
              </motion.div>
            </motion.div>

            {/* Product info */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <button
                  onClick={() => onNavigate('collection')}
                  className="text-[10px] tracking-[0.3em] uppercase text-brown/40 hover:text-champagne transition-colors"
                >
                  Collection
                </button>
                <span className="text-brown/20">·</span>
                <span className="text-[10px] tracking-[0.3em] uppercase text-champagne">
                  {fragrance.name}
                </span>
              </div>

              <span className="text-[10px] tracking-[0.5em] uppercase text-champagne block mb-3">
                {data.settings.brandName}
              </span>
              <h1 className="font-serif text-4xl lg:text-6xl font-light text-brown-dark mb-3">
                {fragrance.name}
              </h1>
              <p className="text-lg italic text-champagne-dark mb-8 font-light font-serif">
                {fragrance.subtitle}
              </p>

              <div className="w-16 h-px bg-champagne mb-8" />

              <p className="text-sm lg:text-base text-brown/60 font-light leading-relaxed mb-8">
                {fragrance.description}
              </p>

              <div className="inline-block px-6 py-3 border border-champagne/30 mb-10" style={{ backgroundColor: fragrance.color + '30' }}>
                <span className="text-[10px] tracking-[0.4em] uppercase text-brown/60">Signature : </span>
                <span className="text-sm text-brown-dark font-light italic">{fragrance.signature}</span>
              </div>

              <div className="flex items-center gap-8 mb-12">
                <div>
                  <span className="font-serif text-3xl text-brown-dark">{fragrance.price}</span>
                  <span className="text-xs text-brown/40 ml-2">/ {fragrance.volume}</span>
                </div>
              </div>

              <button
                onClick={() => setOrderOpen(true)}
                className="w-full sm:w-auto px-16 py-4 bg-brown-dark text-ivory text-[11px] tracking-[0.3em] uppercase hover:bg-brown transition-colors duration-500">
                Commander maintenant
              </button>
              <p className="mt-3 text-[10px] text-brown/30 font-light">
                Paiement à la livraison · Livraison sur tout le territoire
              </p>
              <OrderModal isOpen={orderOpen} onClose={() => setOrderOpen(false)} fragrance={fragrance} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story section */}
      <section className="py-24 lg:py-36 luxury-gradient">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="text-[10px] tracking-[0.5em] uppercase text-champagne block mb-8">L'histoire</span>
            <blockquote className="font-serif text-2xl lg:text-4xl font-light text-brown-dark leading-relaxed italic mb-8">
              « {fragrance.story} »
            </blockquote>
            <div className="w-12 h-px bg-champagne mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Olfactory pyramid */}
      <section className="py-24 lg:py-36 bg-ivory">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <span className="text-[10px] tracking-[0.5em] uppercase text-champagne block mb-6">
                Architecture olfactive
              </span>
              <h2 className="font-serif text-3xl lg:text-4xl font-light text-brown-dark mb-12">
                Pyramide <em className="italic">olfactive</em>
              </h2>

              <div className="space-y-12">
                {[
                  { level: 'Notes de tête', notes: fragrance.notes.top, desc: 'La première impression, vive et effervescente' },
                  { level: 'Notes de cœur', notes: fragrance.notes.heart, desc: 'L\'âme de la fragrance, riche et enveloppante' },
                  { level: 'Notes de fond', notes: fragrance.notes.base, desc: 'Le sillage durable, profond et mémorable' },
                ].map((group, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2, duration: 0.8 }}
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-2 h-2 rounded-full bg-champagne" />
                      <h4 className="text-[11px] tracking-[0.3em] uppercase text-brown/60">{group.level}</h4>
                    </div>
                    <div className="ml-6 pl-4 border-l border-champagne/20">
                      <p className="font-serif text-xl text-brown-dark mb-2">
                        {group.notes.join(' · ')}
                      </p>
                      <p className="text-xs text-brown/40 font-light italic">{group.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative overflow-hidden aspect-square"
            >
              <Img src={fragrance.bgImage} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ivory/30 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Other fragrances */}
      {otherFragrances.length > 0 && (
        <section className="py-24 lg:py-36 bg-ivory-dark/30">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-[10px] tracking-[0.5em] uppercase text-champagne block mb-4">
                Continuez l'exploration
              </span>
              <h3 className="font-serif text-2xl lg:text-4xl font-light text-brown-dark">
                Nos autres <em className="italic">signatures</em>
              </h3>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {otherFragrances.slice(0, 3).map((f, i) => (
                <motion.div
                  key={f.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                  className="cursor-pointer group"
                  onClick={() => {
                    onSelectFragrance(f.id);
                  }}
                >
                  <div className="relative overflow-hidden aspect-[3/4] mb-5">
                    <Img
                      src={f.image}
                      alt={`${data.settings.brandName} ${f.name}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <span className="text-[9px] tracking-[0.4em] uppercase text-champagne block mb-1">{data.settings.brandName}</span>
                  <h4 className="font-serif text-lg text-brown-dark group-hover:text-champagne-dark transition-colors">{f.name}</h4>
                  <p className="text-xs text-brown/40 mt-1 italic">{f.signature}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
