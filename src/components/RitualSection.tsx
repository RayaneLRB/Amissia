import { motion } from 'framer-motion';
import { useSiteData } from '../context/SiteDataContext';

export default function RitualSection() {
  const { data } = useSiteData();

  const steps = [
    {
      num: '01',
      title: 'Préparer',
      desc: 'Sur une peau fraîchement nettoyée et légèrement humide, la brume révèle toute sa profondeur.'
    },
    {
      num: '02',
      title: 'Vaporiser',
      desc: 'À 20 cm de la peau, vaporisez généreusement sur les points de pulsation : cou, poignets, décolleté.'
    },
    {
      num: '03',
      title: 'Envelopper',
      desc: 'Laissez le nuage de brume se déposer naturellement sur votre peau pour un sillage délicat.'
    },
  ];

  return (
    <section className="py-28 lg:py-40 bg-ivory-dark/50">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1 }}
          >
            <span className="text-[10px] tracking-[0.5em] uppercase text-champagne block mb-6">
              Le Rituel
            </span>
            <h2 className="font-serif text-3xl lg:text-5xl font-light text-brown-dark leading-snug mb-12">
              L'art de la <em className="italic">vaporisation</em>
            </h2>

            <div className="space-y-10">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.15, duration: 0.8 }}
                  className="flex gap-6"
                >
                  <span className="font-serif text-3xl text-champagne/40 shrink-0 w-12">{step.num}</span>
                  <div>
                    <h4 className="font-serif text-xl text-brown-dark mb-2">{step.title}</h4>
                    <p className="text-sm text-brown/50 font-light leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="relative overflow-hidden aspect-[3/4]">
              <img
                src={data.images.lifestyle3}
                alt="Rituel Amissia"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ivory/20 to-transparent" />
            </div>
            {/* Decorative frame */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t border-l border-champagne/30" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b border-r border-champagne/30" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
