import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SiteDataProvider, ADMIN_CODE, useSiteData } from './context/SiteDataContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import UniversPage from './pages/UniversPage';
import CollectionPage from './pages/CollectionPage';
import FragrancePage from './pages/FragrancePage';
import CataloguePage from './pages/CataloguePage';
import GaleriePage from './pages/GaleriePage';
import JournalPage from './pages/JournalPage';
import ContactPage from './pages/ContactPage';
import DashboardPage from './pages/DashboardPage';

function PageTransition({ children, pageKey }: { children: React.ReactNode; pageKey: string }) {
  return (
    <motion.div
      key={pageKey}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[200] bg-ivory flex items-center justify-center"
    >
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-[0.4em] font-light text-brown-dark">
            AMISSIA
          </h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ delay: 0.8, duration: 1.5, ease: 'easeInOut' }}
            className="h-px bg-gradient-to-r from-transparent via-champagne to-transparent mx-auto mt-6"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-[10px] tracking-[0.6em] uppercase text-champagne/70 mt-4 font-light"
          >
            L'art de la brume corporelle
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="mt-16 w-48 mx-auto"
        >
          <div className="h-px bg-beige overflow-hidden">
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 1.2, repeat: 1, ease: 'easeInOut' }}
              className="h-full w-1/2 bg-champagne"
            />
          </div>
        </motion.div>
      </div>

      <div className="absolute top-8 left-8 w-12 h-12 border-t border-l border-champagne/20" />
      <div className="absolute top-8 right-8 w-12 h-12 border-t border-r border-champagne/20" />
      <div className="absolute bottom-8 left-8 w-12 h-12 border-b border-l border-champagne/20" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-b border-r border-champagne/20" />
    </motion.div>
  );
}

/* ─── Admin Gate ─── */
function AdminGate({ onSuccess, onCancel }: { onSuccess: () => void; onCancel: () => void }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === ADMIN_CODE) {
      onSuccess();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 600);
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-ivory flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center mx-auto mb-5 shadow-sm">
            <span className="text-2xl">🔐</span>
          </div>
          <h2 className="font-serif text-2xl text-brown-dark mb-2">Accès Administration</h2>
          <p className="text-sm text-brown/40 font-light">
            Entrez le code d'accès pour accéder au tableau de bord.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <motion.div
            animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.4 }}
          >
            <input
              type="password"
              value={code}
              onChange={(e) => { setCode(e.target.value); setError(false); }}
              placeholder="Code d'accès"
              autoFocus
              className={`w-full text-center text-lg tracking-[0.5em] py-4 border-b-2 bg-transparent focus:outline-none transition-colors font-light ${
                error
                  ? 'border-red-400 text-red-500'
                  : 'border-beige-dark/40 text-brown-dark focus:border-champagne'
              }`}
            />
          </motion.div>

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-red-400 text-xs text-center mt-3"
              >
                Code incorrect. Veuillez réessayer.
              </motion.p>
            )}
          </AnimatePresence>

          <div className="flex flex-col gap-3 mt-8">
            <button
              type="submit"
              className="w-full py-3.5 bg-brown-dark text-ivory text-sm tracking-[0.2em] uppercase hover:bg-brown transition-colors rounded-lg"
            >
              Accéder
            </button>
            <button
              type="button"
              onClick={() => onCancel()}
              className="w-full py-3 text-sm text-brown/40 hover:text-brown/60 transition-colors"
            >
              ← Retour au site
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

/* ─── Main App ─── */
function AppContent() {
  const { loading: firebaseLoading } = useSiteData();
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedFragrance, setSelectedFragrance] = useState('soft-aura');
  const [splashDone, setSplashDone] = useState(false);
  const [adminAuthenticated, setAdminAuthenticated] = useState(false);

  // Show splash screen for at least 3s AND until Firebase data is ready
  const loading = !splashDone || firebaseLoading;

  // Centralized smooth scroll to top on every page change
  useEffect(() => {
    if (!loading) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentPage, selectedFragrance, loading]);

  const isDashboard = currentPage === 'dashboard';
  const isAdminGate = currentPage === 'admin-gate';

  const renderPage = () => {
    if (isAdminGate) {
      return (
        <PageTransition pageKey="admin-gate">
          <AdminGate
            onSuccess={() => {
              setAdminAuthenticated(true);
              setCurrentPage('dashboard');
            }}
            onCancel={() => setCurrentPage('home')}
          />
        </PageTransition>
      );
    }

    if (isDashboard && adminAuthenticated) {
      return (
        <PageTransition pageKey="dashboard">
          <DashboardPage onNavigate={setCurrentPage} />
        </PageTransition>
      );
    }

    switch (currentPage) {
      case 'home':
        return (
          <PageTransition pageKey="home">
            <HomePage onNavigate={setCurrentPage} onSelectFragrance={setSelectedFragrance} />
          </PageTransition>
        );
      case 'univers':
        return (
          <PageTransition pageKey="univers">
            <UniversPage />
          </PageTransition>
        );
      case 'collection':
        return (
          <PageTransition pageKey="collection">
            <CollectionPage onNavigate={setCurrentPage} onSelectFragrance={setSelectedFragrance} />
          </PageTransition>
        );
      case 'fragrance':
        return (
          <PageTransition pageKey={`fragrance-${selectedFragrance}`}>
            <FragrancePage
              fragranceId={selectedFragrance}
              onNavigate={setCurrentPage}
              onSelectFragrance={setSelectedFragrance}
            />
          </PageTransition>
        );
      case 'catalogue':
        return (
          <PageTransition pageKey="catalogue">
            <CataloguePage onNavigate={setCurrentPage} onSelectFragrance={setSelectedFragrance} />
          </PageTransition>
        );
      case 'galerie':
        return (
          <PageTransition pageKey="galerie">
            <GaleriePage />
          </PageTransition>
        );
      case 'journal':
        return (
          <PageTransition pageKey="journal">
            <JournalPage />
          </PageTransition>
        );
      case 'contact':
        return (
          <PageTransition pageKey="contact">
            <ContactPage />
          </PageTransition>
        );
      default:
        return (
          <PageTransition pageKey="home">
            <HomePage onNavigate={setCurrentPage} onSelectFragrance={setSelectedFragrance} />
          </PageTransition>
        );
    }
  };

  // If navigating away from dashboard pages, keep auth alive but don't redirect
  const showNav = !isAdminGate;
  const showFooter = !isDashboard && !isAdminGate;

  return (
    <div className="min-h-screen bg-ivory">
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen onComplete={() => setSplashDone(true)} />}
      </AnimatePresence>

      {!loading && (
        <>
          {showNav && (
            <Navigation
              currentPage={isDashboard ? '' : currentPage}
              onNavigate={(page) => {
                setCurrentPage(page);
              }}
            />
          )}
          {isAdminGate && (
            <Navigation currentPage="" onNavigate={(page) => { setCurrentPage(page); }} />
          )}
          <main>
            <AnimatePresence mode="wait">
              {renderPage()}
            </AnimatePresence>
          </main>
          {showFooter && <Footer onNavigate={setCurrentPage} />}
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <SiteDataProvider>
      <AppContent />
    </SiteDataProvider>
  );
}
