import { createContext, useContext, useState, useEffect, useCallback, useRef, type ReactNode } from 'react';
import { db } from '../lib/firebase';
import {
  doc, setDoc, onSnapshot, collection, addDoc, deleteDoc, updateDoc, getDocs, writeBatch,
} from 'firebase/firestore';
import {
  fragrances as defaultFragrances,
  journalEntries as defaultJournal,
  images as defaultImages,
  type Fragrance,
} from '../data/fragrances';

/* ─── Types ─── */

export interface SiteSettings {
  brandName: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
  instagram: string;
  instagramUrl: string;
  heroTitle1: string;
  heroTitle2: string;
  heroSubtitle: string;
}

export type OrderStatus = 'new' | 'read' | 'approved' | 'shipped' | 'cancelled';

export interface OrderItem {
  fragranceId: string;
  fragranceName: string;
  quantity: number;
  price: string;
}

export interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
  customer: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    wilaya: string;
    commune: string;
    address: string;
    notes: string;
  };
  total: string;
}

interface SiteData {
  fragrances: Fragrance[];
  journal: typeof defaultJournal;
  images: typeof defaultImages;
  settings: SiteSettings;
}

interface SiteDataContextType {
  data: SiteData;
  orders: Order[];
  loading: boolean;
  saveError: string | null;
  clearSaveError: () => void;
  updateFragrance: (id: string, updates: Partial<Fragrance>) => void;
  addFragrance: (fragrance: Fragrance) => void;
  deleteFragrance: (id: string) => void;
  reorderFragrances: (fromIndex: number, toIndex: number) => void;
  updateSettings: (updates: Partial<SiteSettings>) => void;
  updateJournalEntry: (id: number, updates: Partial<typeof defaultJournal[0]>) => void;
  addOrder: (order: Order) => void;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  deleteOrder: (id: string) => void;
  getNewOrdersCount: () => number;
  resetAll: () => void;
}

const ADMIN_CODE = 'amissia2025';

const defaultSettings: SiteSettings = {
  brandName: 'AMISSIA',
  tagline: "L'art de la brume corporelle",
  email: 'contact@amissia.com',
  phone: '+213 7 74185185',
  address: 'Alger, Algérie',
  instagram: '@amissia.officiel',
  instagramUrl: 'https://www.instagram.com/amissia.officiel?igsh=MTA5NjlobjlmcXpuMw==',
  heroTitle1: "L'art de la",
  heroTitle2: 'brume corporelle',
  heroSubtitle: "Découvrez nos fragrances signatures, créées pour sublimer chaque instant d'une fraîcheur élégante et d'une sensualité raffinée.",
};

function getDefaultData(): SiteData {
  return {
    fragrances: structuredClone(defaultFragrances),
    journal: structuredClone(defaultJournal),
    images: structuredClone(defaultImages),
    settings: { ...defaultSettings },
  };
}

/* ─── Firestore doc refs ─── */
const SITE_DOC = 'siteConfig/main';
const ORDERS_COL = 'orders';

/* ─── Context ─── */

const SiteDataContext = createContext<SiteDataContextType | null>(null);

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SiteData>(getDefaultData);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Flag to prevent saving back what we just received from Firestore
  const skipSave = useRef(false);
  const saveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── Listen to siteConfig in real-time ── */
  useEffect(() => {
    const unsub = onSnapshot(doc(db, SITE_DOC), (snap) => {
      if (snap.exists()) {
        const remote = snap.data() as SiteData;
        // Merge with defaults to ensure new fields always exist
        const merged: SiteData = {
          fragrances: remote.fragrances?.length ? remote.fragrances : structuredClone(defaultFragrances),
          journal: remote.journal?.length ? remote.journal : structuredClone(defaultJournal),
          images: remote.images || structuredClone(defaultImages),
          settings: { ...defaultSettings, ...(remote.settings || {}) },
        };
        skipSave.current = true;
        setData(merged);
        setLoading(false);
      } else {
        // First time — push defaults to Firestore
        const defaults = getDefaultData();
        setDoc(doc(db, SITE_DOC), JSON.parse(JSON.stringify(defaults)));
        skipSave.current = true;
        setData(defaults);
        setLoading(false);
      }
    }, () => {
      // If offline / error, use defaults
      setLoading(false);
    });
    return () => unsub();
  }, []);

  /* ── Listen to orders in real-time ── */
  useEffect(() => {
    const unsub = onSnapshot(collection(db, ORDERS_COL), (snap) => {
      const list: Order[] = [];
      snap.forEach((d) => list.push({ id: d.id, ...d.data() } as Order));
      // Sort by newest first
      list.sort((a, b) => b.id.localeCompare(a.id));
      setOrders(list);
    }, () => { /* offline */ });
    return () => unsub();
  }, []);

  /* ── Debounced save to Firestore when data changes ── */
  useEffect(() => {
    if (skipSave.current) {
      skipSave.current = false;
      return;
    }
    // Debounce to avoid too many writes
    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(async () => {
      try {
        await setDoc(doc(db, SITE_DOC), JSON.parse(JSON.stringify(data)));
        setSaveError(null);
      } catch (e: unknown) {
        console.error('Firestore save error:', e);
        setSaveError('Erreur de synchronisation. Vérifiez votre connexion.');
      }
    }, 800);
    return () => { if (saveTimeout.current) clearTimeout(saveTimeout.current); };
  }, [data]);

  const clearSaveError = useCallback(() => setSaveError(null), []);

  /* ── Data mutations ── */
  const updateFragrance = (id: string, updates: Partial<Fragrance>) => {
    setData(prev => ({ ...prev, fragrances: prev.fragrances.map(f => f.id === id ? { ...f, ...updates } : f) }));
  };
  const addFragrance = (fragrance: Fragrance) => {
    setData(prev => ({ ...prev, fragrances: [...prev.fragrances, fragrance] }));
  };
  const deleteFragrance = (id: string) => {
    setData(prev => ({ ...prev, fragrances: prev.fragrances.filter(f => f.id !== id) }));
  };
  const reorderFragrances = (fromIndex: number, toIndex: number) => {
    setData(prev => {
      const arr = [...prev.fragrances];
      const [m] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, m);
      return { ...prev, fragrances: arr };
    });
  };
  const updateSettings = (updates: Partial<SiteSettings>) => {
    setData(prev => ({ ...prev, settings: { ...prev.settings, ...updates } }));
  };
  const updateJournalEntry = (id: number, updates: Partial<typeof defaultJournal[0]>) => {
    setData(prev => ({ ...prev, journal: prev.journal.map(j => j.id === id ? { ...j, ...updates } : j) }));
  };

  /* ── Order mutations (direct Firestore writes) ── */
  const addOrder = async (order: Order) => {
    try {
      const { id, ...rest } = order;
      await addDoc(collection(db, ORDERS_COL), { id, ...rest });
    } catch (e) {
      console.error('Failed to add order:', e);
      // Fallback: add locally anyway so user sees confirmation
      setOrders(prev => [order, ...prev]);
    }
  };

  const updateOrderStatus = async (id: string, status: OrderStatus) => {
    // Find the Firestore doc whose `id` field matches
    try {
      const snap = await getDocs(collection(db, ORDERS_COL));
      snap.forEach((d) => {
        if (d.data().id === id) {
          updateDoc(d.ref, { status });
        }
      });
    } catch {
      // Fallback local
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    }
  };

  const deleteOrder = async (id: string) => {
    try {
      const snap = await getDocs(collection(db, ORDERS_COL));
      snap.forEach((d) => {
        if (d.data().id === id) {
          deleteDoc(d.ref);
        }
      });
    } catch {
      setOrders(prev => prev.filter(o => o.id !== id));
    }
  };

  const getNewOrdersCount = () => orders.filter(o => o.status === 'new').length;

  const resetAll = async () => {
    const fresh = getDefaultData();
    setData(fresh);
    setSaveError(null);
    try {
      await setDoc(doc(db, SITE_DOC), JSON.parse(JSON.stringify(fresh)));
      // Delete all orders
      const snap = await getDocs(collection(db, ORDERS_COL));
      const batch = writeBatch(db);
      snap.forEach((d) => batch.delete(d.ref));
      await batch.commit();
    } catch { /* */ }
  };

  return (
    <SiteDataContext.Provider value={{
      data, orders, loading, saveError, clearSaveError,
      updateFragrance, addFragrance, deleteFragrance, reorderFragrances,
      updateSettings, updateJournalEntry,
      addOrder, updateOrderStatus, deleteOrder, getNewOrdersCount,
      resetAll,
    }}>
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData() {
  const ctx = useContext(SiteDataContext);
  if (!ctx) throw new Error('useSiteData must be used within SiteDataProvider');
  return ctx;
}

export { ADMIN_CODE };
