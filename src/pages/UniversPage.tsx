import { motion } from 'framer-motion';
import { useSiteData } from '../context/SiteDataContext';

export default function UniversPage() {
  const { data } = useSiteData();

  return (
    <div className="pt-24">
      <section className="relative h-[60vh] lg:h-[70vh] overflow-hidden">
        <motion.div initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 2 }} className="absolute inset-0">
          <img src={data.images.roses} alt={`L'univers ${data.settings.brandName}`} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-brown-dark/40 via-brown-dark/20 to-ivory" />
        </motion.div>
        <div className="relative h-full flex items-center justify-center text-center px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1 }}>
            <span className="text-[10px] tracking-[0.5em] uppercase text-champagne-light/80 block mb-6">La Maison</span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-light text-ivory">L'Univers <em className="italic">{data.settings.brandName}</em></h1>
          </motion.div>
        </div>
      </section>

      <section className="py-24 lg:py-36 bg-ivory">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}>
              <span className="text-[10px] tracking-[0.5em] uppercase text-champagne block mb-6">Genèse</span>
              <h2 className="font-serif text-3xl lg:text-5xl font-light text-brown-dark leading-snug mb-8">Née d'un rêve de <em className="italic">fraîcheur</em></h2>
              <div className="space-y-6 text-sm lg:text-base text-brown/60 font-light leading-relaxed">
                <p>{data.settings.brandName} est née d'une conviction simple mais profonde : la beauté quotidienne mérite l'excellence. Dans un monde où le luxe semblait réservé aux grandes occasions, nous avons voulu créer des brumes corporelles qui transforment chaque jour en un moment d'exception.</p>
                <p>Notre fondatrice, inspirée par les matins lumineux de la Méditerranée et les jardins de roses de Grasse, a imaginé une collection qui capture l'essence même de la féminité moderne : à la fois douce et audacieuse, élégante et accessible, intemporelle et résolument contemporaine.</p>
                <p>Le nom {data.settings.brandName} évoque l'amitié, la douceur, la complicité féminine. C'est cette chaleur humaine que nous insufflons dans chacune de nos créations.</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="relative">
              <div className="overflow-hidden aspect-[4/5]">
                <img src={data.images.lifestyle1} alt={`L'histoire d'${data.settings.brandName}`} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-champagne/10 p-8 backdrop-blur-sm border border-champagne/20">
                <p className="font-serif text-2xl text-brown-dark italic">« La beauté est un droit quotidien »</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-36 luxury-gradient">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-20">
            <span className="text-[10px] tracking-[0.5em] uppercase text-champagne block mb-6">Nos valeurs</span>
            <h2 className="font-serif text-3xl lg:text-5xl font-light text-brown-dark">Les piliers de la <em className="italic">Maison</em></h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {[
              { icon: '✦', title: 'Élégance', desc: 'Chaque détail est pensé pour sublimer la féminité avec une grâce naturelle et sans effort.' },
              { icon: '❋', title: 'Fraîcheur', desc: 'Nos brumes corporelles offrent une sensation de pureté et de légèreté qui accompagne chaque instant.' },
              { icon: '◈', title: 'Raffinement', desc: 'Des formulations premium, des fragrances complexes, un savoir-faire artisanal d\'excellence.' },
              { icon: '✧', title: 'Accessibilité', desc: 'Le luxe ne devrait jamais être un privilège. Nous rendons l\'excellence accessible à toutes.' },
              { icon: '❖', title: 'Sensorialité', desc: 'Chaque vaporisation est une expérience multisensorielle qui éveille les sens et élève l\'esprit.' },
              { icon: '✶', title: 'Modernité', desc: 'Une vision contemporaine de la beauté, ancrée dans son temps et tournée vers l\'avenir.' }
            ].map((value, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.8 }} className="group text-center p-8 hover:bg-ivory/60 transition-all duration-700 border border-transparent hover:border-champagne/20">
                <span className="text-3xl text-champagne/60 block mb-6 group-hover:text-champagne transition-colors duration-500">{value.icon}</span>
                <h3 className="font-serif text-xl text-brown-dark mb-4">{value.title}</h3>
                <p className="text-sm text-brown/50 font-light leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-36 bg-ivory">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} className="order-2 lg:order-1 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="overflow-hidden aspect-[3/4]"><img src={data.images.products} alt="Savoir-faire" className="w-full h-full object-cover" /></div>
                <div className="overflow-hidden aspect-square"><img src={data.images.droplets} alt="Pureté" className="w-full h-full object-cover" /></div>
              </div>
              <div className="space-y-4 pt-12">
                <div className="overflow-hidden aspect-square"><img src={data.images.lavender} alt="Ingrédients" className="w-full h-full object-cover" /></div>
                <div className="overflow-hidden aspect-[3/4]"><img src={data.images.field} alt="Nature" className="w-full h-full object-cover" /></div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="order-1 lg:order-2">
              <span className="text-[10px] tracking-[0.5em] uppercase text-champagne block mb-6">Savoir-faire</span>
              <h2 className="font-serif text-3xl lg:text-5xl font-light text-brown-dark leading-snug mb-8">L'excellence dans <em className="italic">chaque détail</em></h2>
              <div className="space-y-6 text-sm lg:text-base text-brown/60 font-light leading-relaxed">
                <p>Nos brumes corporelles sont le fruit d'un savoir-faire exigeant. Chaque formulation est développée en collaboration avec des parfumeurs de renom, sélectionnant les plus beaux ingrédients naturels et synthétiques.</p>
                <p>De la bergamote de Calabre au jasmin de Grasse, de la rose de Damas au santal de Mysore, chaque matière première est choisie pour sa qualité exceptionnelle et sa capacité à créer des accords uniques.</p>
                <p>Le flacon lui-même est un objet de désir, conçu pour sublimer votre salle de bain comme un objet de décoration précieux.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src={data.images.lifestyle4} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-brown-dark/60" />
        </div>
        <div className="relative max-w-3xl mx-auto text-center px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}>
            <div className="w-12 h-px bg-champagne mx-auto mb-10" />
            <blockquote className="font-serif text-2xl sm:text-3xl lg:text-5xl font-light text-ivory leading-snug italic">« La vraie beauté ne se voit pas. Elle se ressent. »</blockquote>
            <p className="mt-8 text-[10px] tracking-[0.5em] uppercase text-champagne-light/60">— La Maison {data.settings.brandName}</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
