import { motion } from 'framer-motion';
import { useSiteData } from '../context/SiteDataContext';
import Img from './Img';

export default function InstagramSection() {
  const { data } = useSiteData();

  const instaImages = [
    ...(data.fragrances[0] ? [{ src: data.fragrances[0].image, alt: data.fragrances[0].name }] : []),
    { src: data.images.roses, alt: 'Inspiration florale' },
    { src: data.images.lifestyle2, alt: 'Rituel beauté' },
    ...(data.fragrances[2] ? [{ src: data.fragrances[2].image, alt: data.fragrances[2].name }] : []),
    { src: data.images.garden, alt: 'Jardin doré' },
    ...(data.fragrances[1] ? [{ src: data.fragrances[1].image, alt: data.fragrances[1].name }] : []),
  ];

  return (
    <section className="py-20 lg:py-28 bg-ivory-dark/30">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <span className="text-[10px] tracking-[0.5em] uppercase text-champagne block mb-4">
            {data.settings.instagram}
          </span>
          <h2 className="font-serif text-2xl lg:text-3xl font-light text-brown-dark">
            Rejoignez notre <em className="italic">univers</em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-3 lg:grid-cols-6 gap-2 lg:gap-3">
          {instaImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className="relative aspect-square overflow-hidden cursor-pointer group"
            >
              <Img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-brown-dark/0 group-hover:bg-brown-dark/40 transition-all duration-500 flex items-center justify-center">
                <span className="text-ivory/0 group-hover:text-ivory/90 transition-all duration-500 text-lg">
                  ♡
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
