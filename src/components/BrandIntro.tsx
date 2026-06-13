import { motion } from 'framer-motion';
import { useSiteData } from '../context/SiteDataContext';

export default function BrandIntro() {
  const { data } = useSiteData();

  return (
    <section className="py-28 lg:py-40 luxury-gradient">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Top quote */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1 }}
          className="text-center mb-24 lg:mb-32"
        >
          <div className="w-12 h-px bg-champagne mx-auto mb-10" />
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-6xl font-light text-brown-dark leading-tight max-w-4xl mx-auto">
            Chaque brume est une{' '}
            <em className="text-champagne-dark not-italic shimmer-text">émotion</em>
            <br />qui se dépose sur la peau
          </h2>
          <p className="mt-8 text-sm lg:text-base text-brown/60 font-light max-w-2xl mx-auto leading-relaxed">
            {data.settings.brandName} célèbre la beauté quotidienne à travers des brumes corporelles
            d'exception, créées pour transformer chaque moment en un rituel de fraîcheur et d'élégance.
          </p>
        </motion.div>

        {/* Two column layout */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="relative overflow-hidden aspect-[3/4]">
              <img
                src={data.images.lifestyle2}
                alt="Rituel Amissia"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brown-dark/20 to-transparent" />
            </div>
            {/* Floating label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute -bottom-6 -right-4 lg:-right-8 bg-ivory p-6 lg:p-8 shadow-xl"
            >
              <p className="text-[10px] tracking-[0.4em] uppercase text-champagne mb-2">Depuis 2020</p>
              <p className="font-serif text-xl lg:text-2xl text-brown-dark italic">{data.settings.address}</p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1 }}
            className="lg:pl-8"
          >
            <span className="text-[10px] tracking-[0.5em] uppercase text-champagne block mb-6">
              Notre philosophie
            </span>
            <h3 className="font-serif text-3xl lg:text-4xl font-light text-brown-dark leading-snug mb-8">
              Le luxe de la{' '}
              <span className="italic">simplicité</span>
            </h3>
            <div className="space-y-6 text-sm lg:text-base text-brown/60 font-light leading-relaxed">
              <p>
                Chez {data.settings.brandName}, nous croyons que le véritable luxe réside dans les plaisirs
                simples du quotidien. Une brume corporelle n'est pas un simple parfum —
                c'est un geste de beauté, un moment de grâce, une parenthèse de fraîcheur
                dans le tumulte du monde.
              </p>
              <p>
                Nos créations naissent de la rencontre entre l'art parfumé traditionnel
                et une vision résolument contemporaine de la féminité. Chaque fragrance
                raconte une histoire, chaque vaporisation est une invitation au voyage sensoriel.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-8">
              {[
                { number: String(data.fragrances.length), label: 'Signatures' },
                { number: '100%', label: 'Premium' },
                { number: '100', label: 'ml de luxe' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <span className="block font-serif text-3xl lg:text-4xl text-champagne-dark">{stat.number}</span>
                  <span className="block text-[10px] tracking-[0.2em] uppercase text-brown/40 mt-2">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
