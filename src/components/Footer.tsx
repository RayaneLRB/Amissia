import { motion } from 'framer-motion';
import { useSiteData } from '../context/SiteDataContext';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const { data } = useSiteData();
  const s = data.settings;

  return (
    <footer className="bg-brown-dark text-ivory/80">
      {/* Pre-footer CTA */}
      <div className="border-b border-ivory/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[10px] tracking-[0.5em] uppercase text-champagne/60 mb-6"
          >
            Rejoignez l'univers {s.brandName}
          </motion.p>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl lg:text-5xl font-light text-ivory mb-6 italic"
          >
            Inscrivez-vous à notre journal
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-sm text-ivory/50 max-w-md mx-auto mb-10 font-light"
          >
            Recevez en avant-première nos nouvelles créations, rituels beauté et invitations exclusives.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="Votre adresse e-mail"
              className="flex-1 bg-transparent border border-ivory/20 px-6 py-3.5 text-sm text-ivory placeholder:text-ivory/30 focus:outline-none focus:border-champagne/50 transition-colors tracking-wide"
            />
            <button className="px-8 py-3.5 bg-champagne/20 border border-champagne/40 text-champagne text-[11px] tracking-[0.2em] uppercase hover:bg-champagne/30 transition-all duration-500">
              S'inscrire
            </button>
          </motion.div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h4 className="font-serif text-2xl tracking-[0.3em] text-ivory mb-2 font-light">{s.brandName}</h4>
            <p className="text-[9px] tracking-[0.5em] uppercase text-champagne/60 mb-6">Body Mist</p>
            <p className="text-sm text-ivory/40 font-light leading-relaxed">
              Maison de brumes corporelles premium. L'art de la fraîcheur élégante depuis 2020.
            </p>
          </div>

          {/* La Maison */}
          <div>
            <h5 className="text-[11px] tracking-[0.3em] uppercase text-champagne mb-6">La Maison</h5>
            <div className="flex flex-col gap-3">
              {[
                { label: 'L\'Univers', page: 'univers' },
                { label: 'Collection', page: 'collection' },
                { label: 'Catalogue', page: 'catalogue' },
                { label: 'Journal', page: 'journal' },
              ].map((item) => (
                <button
                  key={item.page}
                  onClick={() => onNavigate(item.page)}
                  className="text-sm text-ivory/40 hover:text-champagne transition-colors duration-300 text-left font-light"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Fragrances */}
          <div>
            <h5 className="text-[11px] tracking-[0.3em] uppercase text-champagne mb-6">Signatures</h5>
            <div className="flex flex-col gap-3">
              {data.fragrances.map((f) => (
                <button
                  key={f.id}
                  onClick={() => onNavigate('collection')}
                  className="text-sm text-ivory/40 hover:text-champagne transition-colors duration-300 text-left font-light"
                >
                  {f.name}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h5 className="text-[11px] tracking-[0.3em] uppercase text-champagne mb-6">Contact</h5>
            <div className="flex flex-col gap-3 text-sm text-ivory/40 font-light">
              <p>{s.email}</p>
              <p>{s.phone}</p>
              <p>{s.address}</p>
              <div className="flex gap-6 mt-4">
                <a href={s.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-ivory/30 hover:text-champagne transition-colors text-xs tracking-[0.2em] uppercase">Instagram</a>
                <a href="#" className="text-ivory/30 hover:text-champagne transition-colors text-xs tracking-[0.2em] uppercase">Pinterest</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-ivory/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[10px] tracking-[0.2em] text-ivory/25 font-light">
            © 2025 {s.brandName} — Tous droits réservés
          </p>
          <div className="flex items-center gap-8">
            <span className="text-[10px] tracking-[0.2em] text-ivory/25 font-light cursor-pointer hover:text-ivory/40 transition-colors">
              Mentions légales
            </span>
            <span className="text-[10px] tracking-[0.2em] text-ivory/25 font-light cursor-pointer hover:text-ivory/40 transition-colors">
              Confidentialité
            </span>
          </div>
        </div>

        {/* Hidden admin access */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => onNavigate('admin-gate')}
            className="text-ivory/[0.06] hover:text-ivory/20 transition-all duration-1000 text-[10px] select-none leading-none"
            aria-label="Settings"
          >
            ⚙
          </button>
        </div>
      </div>
    </footer>
  );
}
