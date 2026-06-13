import { motion } from 'framer-motion';
import { useSiteData } from '../context/SiteDataContext';
import Img from '../components/Img';

export default function JournalPage() {
  const { data } = useSiteData();

  const additionalArticles = [
    {
      id: 4,
      title: 'La féminité moderne selon Amissia',
      excerpt: 'Exploration de ce que signifie être une femme moderne et comment la fragrance peut devenir un outil d\'empowerment.',
      category: 'Manifeste',
      date: '20 Mars 2025',
      image: data.images.lifestyle4
    },
    {
      id: 5,
      title: 'Quatre saisons, quatre brumes',
      excerpt: 'Comment adapter votre brume corporelle aux saisons pour un sillage toujours parfait.',
      category: 'Conseils',
      date: '5 Mars 2025',
      image: data.images.field
    },
    {
      id: 6,
      title: 'L\'art de recevoir avec élégance',
      excerpt: 'Créez une ambiance olfactive unique dans votre intérieur avec nos brumes signatures.',
      category: 'Art de vivre',
      date: '18 Février 2025',
      image: data.images.garden
    }
  ];

  const allArticles = [...data.journal, ...additionalArticles];

  return (
    <div className="pt-24">
      <section className="py-20 lg:py-28 bg-ivory text-center">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <span className="text-[10px] tracking-[0.5em] uppercase text-champagne block mb-6">Écrits & inspirations</span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-brown-dark mb-6">Le Journal <em className="italic">Beauté</em></h1>
            <p className="text-sm text-brown/50 font-light max-w-lg mx-auto">Rituels, inspirations et savoir-faire — explorez notre journal dédié à l'art de la beauté quotidienne.</p>
          </motion.div>
        </div>
      </section>

      <section className="bg-ivory">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pb-20">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="grid lg:grid-cols-2 gap-0 group cursor-pointer overflow-hidden border border-beige">
            <div className="relative overflow-hidden aspect-[4/3] lg:aspect-auto">
              <Img src={allArticles[0].image} alt={allArticles[0].title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103" />
              <div className="absolute top-6 left-6"><span className="text-[9px] tracking-[0.3em] uppercase bg-ivory/90 text-champagne-dark px-4 py-2">À la une</span></div>
            </div>
            <div className="p-10 lg:p-16 flex flex-col justify-center bg-ivory">
              <span className="text-[9px] tracking-[0.4em] uppercase text-champagne block mb-4">{allArticles[0].category} · {allArticles[0].date}</span>
              <h2 className="font-serif text-2xl lg:text-3xl font-light text-brown-dark mb-6 group-hover:text-champagne-dark transition-colors duration-500">{allArticles[0].title}</h2>
              <p className="text-sm text-brown/50 font-light leading-relaxed mb-8">{allArticles[0].excerpt}</p>
              <span className="text-[10px] tracking-[0.3em] uppercase text-champagne-dark">Lire l'article →</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-24 luxury-gradient">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {allArticles.slice(1).map((article, index) => (
              <motion.article key={article.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.8 }} className="group cursor-pointer">
                <div className="relative overflow-hidden aspect-[4/3] mb-6">
                  <Img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-brown-dark/0 group-hover:bg-brown-dark/20 transition-all duration-700" />
                </div>
                <div>
                  <span className="text-[9px] tracking-[0.4em] uppercase text-champagne block mb-3">{article.category} · {article.date}</span>
                  <h3 className="font-serif text-lg lg:text-xl font-light text-brown-dark mb-3 group-hover:text-champagne-dark transition-colors duration-500">{article.title}</h3>
                  <p className="text-sm text-brown/40 font-light leading-relaxed mb-4">{article.excerpt}</p>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-champagne/60 group-hover:text-champagne transition-colors duration-500">Lire →</span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
