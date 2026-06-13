import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const navLinks = [
  { id: 'home', label: 'Accueil' },
  { id: 'univers', label: 'L\'Univers' },
  { id: 'collection', label: 'Collection' },
  { id: 'catalogue', label: 'Catalogue' },
  { id: 'galerie', label: 'Galerie' },
  { id: 'journal', label: 'Journal' },
  { id: 'contact', label: 'Contact' },
];

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const navigate = (page: string) => {
    onNavigate(page);
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? 'bg-ivory/90 backdrop-blur-xl shadow-[0_1px_0_rgba(212,165,116,0.2)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <button
              onClick={() => navigate('home')}
              className="relative z-10"
            >
              <h1 className="font-serif text-2xl lg:text-3xl tracking-[0.35em] font-light text-brown-dark uppercase">
                Amissia
              </h1>
              <span className="block text-[9px] tracking-[0.5em] text-champagne uppercase mt-0.5 font-sans font-light">
                Body Mist
              </span>
            </button>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => navigate(link.id)}
                  className="group relative"
                >
                  <span className={`text-[11px] tracking-[0.2em] uppercase font-light transition-colors duration-300 ${
                    currentPage === link.id ? 'text-champagne-dark' : 'text-brown/70 hover:text-brown-dark'
                  }`}>
                    {link.label}
                  </span>
                  <span className={`absolute -bottom-1 left-0 h-px bg-champagne transition-all duration-500 ${
                    currentPage === link.id ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </button>
              ))}
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden relative z-10 w-8 h-8 flex flex-col justify-center items-center gap-1.5"
            >
              <motion.span
                animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 6 : 0 }}
                className="block w-6 h-px bg-brown-dark origin-center"
              />
              <motion.span
                animate={{ opacity: mobileOpen ? 0 : 1 }}
                className="block w-6 h-px bg-brown-dark"
              />
              <motion.span
                animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -6 : 0 }}
                className="block w-6 h-px bg-brown-dark origin-center"
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-40 bg-ivory/98 backdrop-blur-2xl flex items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col items-center gap-8"
            >
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06 }}
                  onClick={() => navigate(link.id)}
                  className="text-2xl font-serif tracking-[0.2em] text-brown-dark/80 hover:text-champagne-dark transition-colors"
                >
                  {link.label}
                </motion.button>
              ))}
              <div className="mt-8 w-12 h-px bg-champagne" />
              <p className="text-[10px] tracking-[0.3em] uppercase text-brown/50 font-light">
                L'art de la brume corporelle
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
