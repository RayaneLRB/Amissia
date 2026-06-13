import { motion } from 'framer-motion';
import { useSiteData } from '../context/SiteDataContext';
import Img from '../components/Img';

interface CataloguePageProps {
  onNavigate: (page: string) => void;
  onSelectFragrance: (id: string) => void;
}

export default function CataloguePage({ onNavigate, onSelectFragrance }: CataloguePageProps) {
  const { data } = useSiteData();

  return (
    <div className="pt-24">
      {/* Header */}
      <section className="py-20 lg:py-28 bg-ivory text-center">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="text-[10px] tracking-[0.5em] uppercase text-champagne block mb-6">
              Catalogue
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-brown-dark mb-6">
              Nos <em className="italic">Brumes</em>
            </h1>
            <p className="text-sm text-brown/50 font-light max-w-lg mx-auto">
              Explorez l'intégralité de nos créations et trouvez la brume
              qui sublimera chacun de vos instants.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter bar */}
      <section className="border-y border-beige">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between py-5">
            <div className="flex items-center gap-8">
              <span className="text-[10px] tracking-[0.3em] uppercase text-brown/40">
                {data.fragrances.length} créations
              </span>
            </div>
            <div className="flex items-center gap-6">
              {['Toutes', 'Florale', 'Fraîche', 'Sensuelle'].map((filter, i) => (
                <button
                  key={filter}
                  className={`text-[10px] tracking-[0.2em] uppercase transition-colors duration-300 ${
                    i === 0 ? 'text-champagne-dark' : 'text-brown/40 hover:text-brown/70'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 lg:py-24 bg-ivory">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16">
            {data.fragrances.map((fragrance, index) => (
              <motion.div
                key={fragrance.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="group cursor-pointer"
                onClick={() => {
                  onSelectFragrance(fragrance.id);
                  onNavigate('fragrance');
                }}
              >
                <div className="relative overflow-hidden aspect-[3/4] mb-6 bg-beige/30">
                  <Img
                    src={fragrance.image}
                    alt={`${data.settings.brandName} ${fragrance.name}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-brown-dark/20 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                    <span className="text-[10px] tracking-[0.3em] uppercase text-ivory border border-ivory/50 px-6 py-3 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                      Découvrir
                    </span>
                  </div>
                  <div
                    className="absolute bottom-4 left-4 w-4 h-4 rounded-full border border-white/50 shadow-sm"
                    style={{ backgroundColor: fragrance.colorAccent }}
                  />
                </div>
                <div>
                  <span className="text-[9px] tracking-[0.4em] uppercase text-champagne block mb-1.5">
                    {data.settings.brandName}
                  </span>
                  <h3 className="font-serif text-lg text-brown-dark font-light group-hover:text-champagne-dark transition-colors duration-500">
                    {fragrance.name}
                  </h3>
                  <p className="text-[11px] text-brown/40 mt-1 italic font-light">
                    {fragrance.signature}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm text-brown-dark">{fragrance.price}</span>
                    <span className="text-[10px] text-brown/30 font-light">{fragrance.volume}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 border-t border-beige bg-ivory-dark/30">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { icon: '◇', title: 'Formulation Premium', desc: 'Ingrédients sélectionnés avec soin' },
              { icon: '✦', title: 'Longue tenue', desc: 'Fraîcheur qui dure toute la journée' },
              { icon: '♡', title: 'Sans cruauté', desc: 'Non testé sur les animaux' },
              { icon: '❋', title: 'Livraison offerte', desc: 'Dès 60€ d\'achat en France' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="text-center"
              >
                <span className="text-2xl text-champagne/60 block mb-4">{feature.icon}</span>
                <h4 className="text-[11px] tracking-[0.2em] uppercase text-brown-dark mb-2">{feature.title}</h4>
                <p className="text-xs text-brown/40 font-light">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
