import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSiteData } from '../context/SiteDataContext';
import Img from '../components/Img';

export default function GaleriePage() {
  const { data } = useSiteData();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [filter, setFilter] = useState('Toutes');

  const galleryImages = [
    { src: data.images.hero, alt: 'Lumière dorée', category: 'Lifestyle' },
    ...(data.fragrances[0] ? [{ src: data.fragrances[0].image, alt: data.fragrances[0].name, category: 'Produit' }] : []),
    { src: data.images.roses, alt: 'Roses de Grasse', category: 'Inspiration' },
    ...(data.fragrances[1] ? [{ src: data.fragrances[1].image, alt: data.fragrances[1].name, category: 'Produit' }] : []),
    { src: data.images.lifestyle1, alt: 'Élégance naturelle', category: 'Lifestyle' },
    ...(data.fragrances[2] ? [{ src: data.fragrances[2].image, alt: data.fragrances[2].name, category: 'Produit' }] : []),
    { src: data.images.garden, alt: 'Jardin au lever du soleil', category: 'Inspiration' },
    { src: data.images.lifestyle2, alt: 'Rituel beauté', category: 'Lifestyle' },
    { src: data.images.lavender, alt: 'Champs de lavande', category: 'Inspiration' },
    ...(data.fragrances[3] ? [{ src: data.fragrances[3].image, alt: data.fragrances[3].name, category: 'Produit' }] : []),
    { src: data.images.lifestyle4, alt: 'Lumière naturelle', category: 'Lifestyle' },
    { src: data.images.droplets, alt: 'Pureté cristalline', category: 'Inspiration' },
  ];

  const categories = ['Toutes', 'Lifestyle', 'Produit', 'Inspiration'];
  const filtered = filter === 'Toutes' ? galleryImages : galleryImages.filter(img => img.category === filter);

  return (
    <div className="pt-24">
      <section className="py-20 lg:py-28 bg-ivory text-center">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <span className="text-[10px] tracking-[0.5em] uppercase text-champagne block mb-6">Univers visuel</span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-brown-dark mb-6">
              Galerie <em className="italic">Lifestyle</em>
            </h1>
            <p className="text-sm text-brown/50 font-light max-w-lg mx-auto">
              Plongez dans l'univers visuel d'{data.settings.brandName}, où chaque image raconte une histoire de beauté et d'élégance.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-beige bg-ivory">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-center gap-8 py-5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`text-[10px] tracking-[0.2em] uppercase transition-all duration-300 relative ${
                  filter === cat ? 'text-champagne-dark' : 'text-brown/40 hover:text-brown/70'
                }`}
              >
                {cat}
                {filter === cat && (
                  <motion.div layoutId="gallery-filter" className="absolute -bottom-5 left-0 right-0 h-px bg-champagne" />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-ivory">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-4 lg:gap-6">
            {filtered.map((image, index) => (
              <motion.div
                key={image.src + index}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="mb-4 lg:mb-6 break-inside-avoid cursor-pointer group relative overflow-hidden"
                onClick={() => setSelectedImage(index)}
              >
                <Img src={image.src} alt={image.alt} className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-103" />
                <div className="absolute inset-0 bg-brown-dark/0 group-hover:bg-brown-dark/30 transition-all duration-700 flex items-end p-6">
                  <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="text-[9px] tracking-[0.3em] uppercase text-champagne-light">{image.category}</span>
                    <p className="text-sm text-ivory font-light mt-1">{image.alt}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-brown-dark/95 flex items-center justify-center p-6" onClick={() => setSelectedImage(null)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ duration: 0.3 }} onClick={(e) => e.stopPropagation()}>
              <Img src={filtered[selectedImage]?.src} alt={filtered[selectedImage]?.alt} className="max-w-full max-h-[85vh] object-contain" />
            </motion.div>
            <button onClick={() => setSelectedImage(null)} className="absolute top-8 right-8 text-ivory/50 hover:text-ivory transition-colors text-2xl font-light">✕</button>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
              <p className="text-sm text-ivory/60 font-light">{filtered[selectedImage]?.alt}</p>
              <span className="text-[9px] tracking-[0.3em] uppercase text-champagne/50 mt-1 block">{filtered[selectedImage]?.category}</span>
            </div>
            {selectedImage > 0 && <button onClick={(e) => { e.stopPropagation(); setSelectedImage(selectedImage - 1); }} className="absolute left-6 top-1/2 -translate-y-1/2 text-ivory/30 hover:text-ivory transition-colors text-3xl">‹</button>}
            {selectedImage < filtered.length - 1 && <button onClick={(e) => { e.stopPropagation(); setSelectedImage(selectedImage + 1); }} className="absolute right-6 top-1/2 -translate-y-1/2 text-ivory/30 hover:text-ivory transition-colors text-3xl">›</button>}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
