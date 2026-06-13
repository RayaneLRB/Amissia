import { motion } from 'framer-motion';
import { useSiteData } from '../context/SiteDataContext';

export default function ContactPage() {
  const { data } = useSiteData();
  const s = data.settings;

  return (
    <div className="pt-24">
      <section className="relative h-[40vh] lg:h-[50vh] overflow-hidden">
        <div className="absolute inset-0">
          <img src={data.images.lifestyle4} alt={`Contact ${s.brandName}`} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-brown-dark/50 via-brown-dark/30 to-ivory" />
        </div>
        <div className="relative h-full flex items-center justify-center text-center px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 1 }}>
            <span className="text-[10px] tracking-[0.5em] uppercase text-champagne-light/80 block mb-6">Parlons ensemble</span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-light text-ivory"><em className="italic">Contact</em></h1>
          </motion.div>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-ivory">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}>
              <span className="text-[10px] tracking-[0.5em] uppercase text-champagne block mb-6">La Maison {s.brandName}</span>
              <h2 className="font-serif text-3xl lg:text-4xl font-light text-brown-dark mb-8">Nous serions ravies de <em className="italic">vous entendre</em></h2>
              <p className="text-sm text-brown/50 font-light leading-relaxed mb-12">Que ce soit pour une question sur nos créations, un conseil personnalisé ou simplement partager votre expérience {s.brandName}, notre équipe est à votre écoute avec la même attention que nous portons à chacune de nos fragrances.</p>
              <div className="space-y-10">
                {[
                  { label: 'E-mail', value: s.email, detail: 'Réponse sous 24h', link: `mailto:${s.email}` },
                  { label: 'Téléphone', value: s.phone, detail: 'Lun-Ven · 9h-18h', link: `tel:${s.phone.replace(/\s/g, '')}` },
                  { label: 'Adresse', value: s.address, detail: 'Sur rendez-vous uniquement', link: null },
                  { label: 'Instagram', value: s.instagram, detail: 'Suivez-nous sur Instagram', link: s.instagramUrl }
                ].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.8 }} className="flex gap-6">
                    <div className="w-12 h-12 rounded-full border border-champagne/30 flex items-center justify-center shrink-0">
                      <span className="text-champagne text-sm">{['✉', '☎', '◈', '♡'][i]}</span>
                    </div>
                    <div>
                      <span className="text-[10px] tracking-[0.3em] uppercase text-champagne block mb-1">{item.label}</span>
                      {item.link ? (
                        <a href={item.link} target={item.link.startsWith('http') ? '_blank' : undefined} rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined} className="text-brown-dark font-light hover:text-champagne-dark transition-colors">{item.value}</a>
                      ) : (
                        <p className="text-brown-dark font-light">{item.value}</p>
                      )}
                      <p className="text-xs text-brown/40 font-light mt-1">{item.detail}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="bg-ivory-dark/40 p-8 lg:p-12 border border-beige">
              <h3 className="font-serif text-2xl text-brown-dark mb-8 font-light">Envoyez-nous un <em className="italic">message</em></h3>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] tracking-[0.3em] uppercase text-brown/50 block mb-3">Prénom</label>
                    <input type="text" className="w-full bg-transparent border-b border-beige-dark/50 pb-3 text-sm text-brown-dark focus:outline-none focus:border-champagne transition-colors font-light placeholder:text-brown/25" placeholder="Votre prénom" />
                  </div>
                  <div>
                    <label className="text-[10px] tracking-[0.3em] uppercase text-brown/50 block mb-3">Nom</label>
                    <input type="text" className="w-full bg-transparent border-b border-beige-dark/50 pb-3 text-sm text-brown-dark focus:outline-none focus:border-champagne transition-colors font-light placeholder:text-brown/25" placeholder="Votre nom" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] tracking-[0.3em] uppercase text-brown/50 block mb-3">E-mail</label>
                  <input type="email" className="w-full bg-transparent border-b border-beige-dark/50 pb-3 text-sm text-brown-dark focus:outline-none focus:border-champagne transition-colors font-light placeholder:text-brown/25" placeholder="votre@email.com" />
                </div>
                <div>
                  <label className="text-[10px] tracking-[0.3em] uppercase text-brown/50 block mb-3">Sujet</label>
                  <select className="w-full bg-transparent border-b border-beige-dark/50 pb-3 text-sm text-brown-dark focus:outline-none focus:border-champagne transition-colors font-light appearance-none">
                    <option value="">Sélectionnez un sujet</option>
                    <option value="conseil">Conseil personnalisé</option>
                    <option value="commande">Question sur une commande</option>
                    <option value="presse">Relations presse</option>
                    <option value="partenariat">Partenariat</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] tracking-[0.3em] uppercase text-brown/50 block mb-3">Message</label>
                  <textarea rows={5} className="w-full bg-transparent border-b border-beige-dark/50 pb-3 text-sm text-brown-dark focus:outline-none focus:border-champagne transition-colors font-light resize-none placeholder:text-brown/25" placeholder="Votre message..." />
                </div>
                <div className="pt-4">
                  <button type="submit" className="w-full py-4 bg-brown-dark text-ivory text-[11px] tracking-[0.3em] uppercase hover:bg-brown transition-colors duration-500">Envoyer</button>
                </div>
                <p className="text-[10px] text-brown/30 text-center font-light">En envoyant ce formulaire, vous acceptez notre politique de confidentialité.</p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="h-[40vh] relative overflow-hidden">
        <img src={data.images.field} alt={s.address} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-brown-dark/40 flex items-center justify-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
            <span className="text-[10px] tracking-[0.5em] uppercase text-champagne-light/80 block mb-4">Maison {s.brandName}</span>
            <p className="font-serif text-3xl lg:text-4xl text-ivory font-light italic">{s.address}</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
