import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSiteData, type OrderStatus } from '../context/SiteDataContext';
import { compressImage } from '../utils/imageCompress';
import type { Fragrance } from '../data/fragrances';

type Tab = 'fragrances' | 'settings' | 'journal' | 'overview' | 'orders';

interface DashboardPageProps {
  onNavigate: (page: string) => void;
}

function generateId(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'new-fragrance';
}

const emptyFragrance: Fragrance = {
  id: '',
  name: '',
  subtitle: '',
  signature: '',
  description: '',
  story: '',
  notes: { top: [''], heart: [''], base: [''] },
  color: '#F5E1E1',
  colorAccent: '#E8C4C4',
  gradient: 'linear-gradient(135deg, #FFFEF7 0%, #F5E1E1 50%, #F2DEDE 100%)',
  image: '',
  bgImage: '',
  price: '',
  volume: '250ml',
};

export default function DashboardPage({ onNavigate }: DashboardPageProps) {
  const { data, orders, saveError, clearSaveError, updateFragrance, addFragrance, deleteFragrance, reorderFragrances, updateSettings, updateJournalEntry, updateOrderStatus, deleteOrder, getNewOrdersCount, resetAll } = useSiteData();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [addingNew, setAddingNew] = useState(false);
  const [newFragrance, setNewFragrance] = useState<Fragrance>({ ...emptyFragrance });
  const [toast, setToast] = useState<string | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const [viewOrderId, setViewOrderId] = useState<string | null>(null);
  const [orderFilter, setOrderFilter] = useState<'all' | OrderStatus>('all');
  const newCount = getNewOrdersCount();

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Show saveError from context as a toast-like banner
  useEffect(() => {
    if (saveError) {
      const timer = setTimeout(() => clearSaveError(), 8000);
      return () => clearTimeout(timer);
    }
  }, [saveError, clearSaveError]);

  const tabs: { id: Tab; label: string; icon: string; badge?: number }[] = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: '📊' },
    { id: 'orders', label: 'Commandes', icon: '📦', badge: newCount },
    { id: 'fragrances', label: 'Fragrances', icon: '🌸' },
    { id: 'settings', label: 'Paramètres', icon: '⚙️' },
    { id: 'journal', label: 'Journal', icon: '📝' },
  ];

  return (
    <div className="pt-24 min-h-screen bg-gray-50">
      {/* Save error banner */}
      <AnimatePresence>
        {saveError && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-28 left-1/2 -translate-x-1/2 z-[100] bg-red-600 text-white px-6 py-3 rounded-lg shadow-xl text-sm font-medium max-w-md text-center"
          >
            ⚠️ {saveError}
            <button onClick={clearSaveError} className="ml-3 underline text-white/80 hover:text-white">OK</button>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Toast */}
      <AnimatePresence>
        {toast && !saveError && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-28 left-1/2 -translate-x-1/2 z-[100] bg-emerald-600 text-white px-6 py-3 rounded-lg shadow-xl text-sm font-medium"
          >
            ✓ {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-20 lg:top-24 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-bold text-sm">
                A
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Amissia Dashboard</h1>
                <p className="text-xs text-gray-400">Panneau d'administration</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('home')}
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-md hover:bg-gray-200"
            >
              ← Retour au site
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 -mb-px overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setEditingId(null); setAddingNew(false); setViewOrderId(null); }}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap relative ${
                  activeTab === tab.id
                    ? 'border-amber-500 text-amber-700'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
                {tab.badge && tab.badge > 0 ? (
                  <span className="ml-1 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold px-1 animate-pulse">
                    {tab.badge}
                  </span>
                ) : null}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {/* OVERVIEW */}
          {activeTab === 'overview' && (
            <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              {/* Stats */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'Commandes', value: orders.length, icon: '📦', color: newCount > 0 ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700', extra: newCount > 0 ? `${newCount} nouvelle${newCount > 1 ? 's' : ''}` : '' },
                  { label: 'Fragrances', value: data.fragrances.length, icon: '🌸', color: 'bg-pink-50 text-pink-700', extra: '' },
                  { label: 'Prix unique', value: data.fragrances[0]?.price || '—', icon: '💰', color: 'bg-amber-50 text-amber-700', extra: '' },
                  { label: 'Marque', value: data.settings.brandName, icon: '✨', color: 'bg-purple-50 text-purple-700', extra: '' },
                ].map((stat, i) => (
                  <div key={i} className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{stat.label}</span>
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${stat.color}`}>
                        {stat.icon}
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    {stat.extra && <p className="text-[10px] text-red-500 font-medium mt-1">{stat.extra}</p>}
                  </div>
                ))}
              </div>

              {/* Quick list */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-8">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Fragrances actuelles</h3>
                  <button
                    onClick={() => setActiveTab('fragrances')}
                    className="text-xs text-amber-600 hover:text-amber-800 font-medium"
                  >
                    Tout gérer →
                  </button>
                </div>
                <div className="divide-y divide-gray-50">
                  {data.fragrances.map(f => (
                    <div key={f.id} className="flex items-center gap-4 px-6 py-3 hover:bg-gray-50 transition-colors">
                      <img src={f.image} alt={f.name} className="w-12 h-12 rounded-lg object-cover border border-gray-100" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{f.name}</p>
                        <p className="text-xs text-gray-400 truncate">{f.signature}</p>
                      </div>
                      <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">{f.price}</span>
                      <div className="w-5 h-5 rounded-full border border-gray-200 shrink-0" style={{ backgroundColor: f.colorAccent }} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Danger zone */}
              <div className="bg-white rounded-xl border border-red-200 p-6">
                <h3 className="font-semibold text-red-700 mb-2">⚠️ Zone dangereuse</h3>
                <p className="text-sm text-gray-500 mb-4">Réinitialiser toutes les données aux valeurs par défaut. Cette action est irréversible.</p>
                {!confirmReset ? (
                  <button
                    onClick={() => setConfirmReset(true)}
                    className="px-4 py-2 text-sm bg-red-50 text-red-600 rounded-lg border border-red-200 hover:bg-red-100 transition-colors"
                  >
                    Réinitialiser tout
                  </button>
                ) : (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => { resetAll(); setConfirmReset(false); showToast('Données réinitialisées'); }}
                      className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Confirmer la réinitialisation
                    </button>
                    <button
                      onClick={() => setConfirmReset(false)}
                      className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700"
                    >
                      Annuler
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* FRAGRANCES */}
          {activeTab === 'fragrances' && (
            <motion.div key="fragrances" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Gestion des Fragrances
                  <span className="ml-2 text-sm font-normal text-gray-400">({data.fragrances.length})</span>
                </h2>
                <button
                  onClick={() => { setAddingNew(true); setEditingId(null); setNewFragrance({ ...emptyFragrance }); }}
                  className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white text-sm font-medium rounded-lg hover:bg-amber-600 transition-colors shadow-sm"
                >
                  <span className="text-lg leading-none">+</span> Ajouter
                </button>
              </div>

              {/* Adding new */}
              <AnimatePresence>
                {addingNew && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden mb-6"
                  >
                    <div className="bg-white rounded-xl border-2 border-amber-300 p-6">
                      <h3 className="font-semibold text-gray-900 mb-4">✨ Nouvelle Fragrance</h3>
                      <FragranceForm
                        fragrance={newFragrance}
                        onChange={(updates) => setNewFragrance(prev => ({ ...prev, ...updates }))}
                        onSave={() => {
                          const id = generateId(newFragrance.name);
                          addFragrance({ ...newFragrance, id });
                          setAddingNew(false);
                          showToast(`"${newFragrance.name}" ajoutée`);
                        }}
                        onCancel={() => setAddingNew(false)}
                        isNew
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* List */}
              <div className="space-y-3">
                {data.fragrances.map((fragrance, index) => (
                  <motion.div
                    key={fragrance.id}
                    layout
                    className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                  >
                    {/* Row header */}
                    <div className="flex items-center gap-4 px-5 py-4">
                      {/* Reorder */}
                      <div className="flex flex-col gap-0.5 shrink-0">
                        <button
                          onClick={() => { if (index > 0) { reorderFragrances(index, index - 1); showToast('Ordre modifié'); } }}
                          disabled={index === 0}
                          className="text-gray-300 hover:text-gray-500 disabled:opacity-30 disabled:cursor-not-allowed text-xs leading-none"
                        >▲</button>
                        <button
                          onClick={() => { if (index < data.fragrances.length - 1) { reorderFragrances(index, index + 1); showToast('Ordre modifié'); } }}
                          disabled={index === data.fragrances.length - 1}
                          className="text-gray-300 hover:text-gray-500 disabled:opacity-30 disabled:cursor-not-allowed text-xs leading-none"
                        >▼</button>
                      </div>

                      {/* Thumbnail */}
                      <img src={fragrance.image} alt={fragrance.name} className="w-14 h-14 rounded-lg object-cover border border-gray-100 shrink-0" />

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-gray-900">{fragrance.name}</h4>
                          <div className="w-4 h-4 rounded-full border border-gray-200 shrink-0" style={{ backgroundColor: fragrance.colorAccent }} />
                        </div>
                        <p className="text-xs text-gray-400 truncate">{fragrance.signature}</p>
                      </div>

                      {/* Price */}
                      <span className="text-sm font-bold text-gray-700 shrink-0 hidden sm:block">{fragrance.price}</span>
                      <span className="text-xs text-gray-400 shrink-0 hidden sm:block">{fragrance.volume}</span>

                      {/* Actions */}
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => setEditingId(editingId === fragrance.id ? null : fragrance.id)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                            editingId === fragrance.id
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {editingId === fragrance.id ? 'Fermer' : 'Modifier'}
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Supprimer "${fragrance.name}" ?`)) {
                              deleteFragrance(fragrance.id);
                              showToast(`"${fragrance.name}" supprimée`);
                            }
                          }}
                          className="px-3 py-1.5 text-xs font-medium rounded-md bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                    </div>

                    {/* Expanded edit form */}
                    <AnimatePresence>
                      {editingId === fragrance.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-gray-100 px-5 py-5 bg-gray-50/50">
                            <FragranceForm
                              fragrance={fragrance}
                              onChange={(updated) => updateFragrance(fragrance.id, updated)}
                              onSave={() => { setEditingId(null); showToast(`"${fragrance.name}" sauvegardée`); }}
                              onCancel={() => setEditingId(null)}
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>

              {data.fragrances.length === 0 && (
                <div className="text-center py-16 text-gray-400">
                  <p className="text-4xl mb-4">🌸</p>
                  <p className="font-medium">Aucune fragrance</p>
                  <p className="text-sm mt-1">Cliquez sur "Ajouter" pour créer votre première fragrance.</p>
                </div>
              )}
            </motion.div>
          )}

          {/* SETTINGS */}
          {activeTab === 'settings' && (
            <motion.div key="settings" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Paramètres du site</h2>
              <div className="space-y-6">
                {/* Brand */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">🏷️ Identité de marque</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <SettingsField label="Nom de la marque" value={data.settings.brandName} onChange={(v) => updateSettings({ brandName: v })} />
                    <SettingsField label="Slogan" value={data.settings.tagline} onChange={(v) => updateSettings({ tagline: v })} />
                  </div>
                </div>

                {/* Hero */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">🎬 Héro de la page d'accueil</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <SettingsField label="Titre ligne 1" value={data.settings.heroTitle1} onChange={(v) => updateSettings({ heroTitle1: v })} />
                    <SettingsField label="Titre ligne 2 (italique)" value={data.settings.heroTitle2} onChange={(v) => updateSettings({ heroTitle2: v })} />
                  </div>
                  <div className="mt-4">
                    <SettingsField label="Sous-titre" value={data.settings.heroSubtitle} onChange={(v) => updateSettings({ heroSubtitle: v })} textarea />
                  </div>
                </div>

                {/* Contact */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">📞 Informations de contact</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <SettingsField label="E-mail" value={data.settings.email} onChange={(v) => updateSettings({ email: v })} />
                    <SettingsField label="Téléphone" value={data.settings.phone} onChange={(v) => updateSettings({ phone: v })} />
                    <SettingsField label="Adresse" value={data.settings.address} onChange={(v) => updateSettings({ address: v })} />
                    <SettingsField label="Instagram (@pseudo)" value={data.settings.instagram} onChange={(v) => updateSettings({ instagram: v })} />
                  </div>
                  <div className="mt-4">
                    <SettingsField label="Lien Instagram (URL complète)" value={data.settings.instagramUrl} onChange={(v) => updateSettings({ instagramUrl: v })} />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => showToast('Paramètres sauvegardés automatiquement')}
                  className="px-6 py-2.5 bg-amber-500 text-white text-sm font-medium rounded-lg hover:bg-amber-600 transition-colors"
                >
                  ✓ Les paramètres sont sauvegardés automatiquement
                </button>
              </div>
            </motion.div>
          )}

          {/* JOURNAL */}
          {activeTab === 'journal' && (
            <motion.div key="journal" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Gestion du Journal</h2>
              <div className="space-y-4">
                {data.journal.map(entry => (
                  <div key={entry.id} className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className="grid lg:grid-cols-[200px,1fr] gap-6">
                      {/* Image upload for journal */}
                      <div>
                        <label className="text-[10px] font-medium text-gray-400 uppercase tracking-wider block mb-2">Image</label>
                        <JournalImageUpload
                          value={entry.image}
                          onChange={(url) => updateJournalEntry(entry.id, { image: url })}
                        />
                      </div>
                      <div className="space-y-3">
                        <div>
                          <label className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">Titre</label>
                          <input
                            type="text"
                            value={entry.title}
                            onChange={(e) => updateJournalEntry(entry.id, { title: e.target.value })}
                            className="w-full mt-1 text-sm font-medium text-gray-900 border-b border-gray-200 pb-1 focus:outline-none focus:border-amber-400 bg-transparent"
                          />
                        </div>
                        <div className="grid sm:grid-cols-2 gap-3">
                          <div>
                            <label className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">Catégorie</label>
                            <input
                              type="text"
                              value={entry.category}
                              onChange={(e) => updateJournalEntry(entry.id, { category: e.target.value })}
                              className="w-full mt-1 text-sm text-gray-700 border-b border-gray-200 pb-1 focus:outline-none focus:border-amber-400 bg-transparent"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">Date</label>
                            <input
                              type="text"
                              value={entry.date}
                              onChange={(e) => updateJournalEntry(entry.id, { date: e.target.value })}
                              className="w-full mt-1 text-sm text-gray-700 border-b border-gray-200 pb-1 focus:outline-none focus:border-amber-400 bg-transparent"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">Extrait</label>
                          <textarea
                            value={entry.excerpt}
                            onChange={(e) => updateJournalEntry(entry.id, { excerpt: e.target.value })}
                            rows={2}
                            className="w-full mt-1 text-sm text-gray-600 border border-gray-200 rounded-md p-2 focus:outline-none focus:border-amber-400 bg-transparent resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ORDERS */}
          {activeTab === 'orders' && (
            <motion.div key="orders" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Commandes
                  {newCount > 0 && <span className="ml-2 text-sm font-normal bg-red-100 text-red-600 px-2 py-0.5 rounded-full">{newCount} nouvelle{newCount > 1 ? 's' : ''}</span>}
                </h2>
                <div className="flex gap-1">
                  {([['all', 'Toutes'], ['new', '🔴 Nouvelles'], ['read', 'Lues'], ['approved', '✅ Approuvées'], ['shipped', '📦 Expédiées'], ['cancelled', '❌ Annulées']] as const).map(([val, label]) => (
                    <button key={val} onClick={() => setOrderFilter(val)}
                      className={`px-3 py-1.5 text-[11px] rounded-md transition-colors ${orderFilter === val ? 'bg-amber-100 text-amber-700 font-medium' : 'text-gray-500 hover:bg-gray-100'}`}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {(() => {
                const filtered = orderFilter === 'all' ? orders : orders.filter(o => o.status === orderFilter);
                if (filtered.length === 0) return (
                  <div className="text-center py-20 text-gray-400">
                    <p className="text-4xl mb-4">📦</p>
                    <p className="font-medium">{orderFilter === 'all' ? 'Aucune commande pour le moment' : 'Aucune commande avec ce statut'}</p>
                  </div>
                );

                return (
                  <div className="space-y-3">
                    {filtered.map(order => {
                      const isExpanded = viewOrderId === order.id;
                      const statusConfig: Record<string, { label: string; color: string }> = {
                        new: { label: 'Nouvelle', color: 'bg-red-100 text-red-700' },
                        read: { label: 'Lue', color: 'bg-blue-100 text-blue-700' },
                        approved: { label: 'Approuvée', color: 'bg-emerald-100 text-emerald-700' },
                        shipped: { label: 'Expédiée', color: 'bg-purple-100 text-purple-700' },
                        cancelled: { label: 'Annulée', color: 'bg-gray-100 text-gray-500' },
                      };
                      const sc = statusConfig[order.status];

                      return (
                        <div key={order.id} className={`bg-white rounded-xl border overflow-hidden transition-colors ${order.status === 'new' ? 'border-red-200 shadow-sm' : 'border-gray-200'}`}>
                          {/* Row */}
                          <div className="flex items-center gap-3 px-5 py-4 cursor-pointer hover:bg-gray-50/50 transition-colors"
                            onClick={() => {
                              setViewOrderId(isExpanded ? null : order.id);
                              if (order.status === 'new') updateOrderStatus(order.id, 'read');
                            }}>
                            {/* Status dot */}
                            {order.status === 'new' && <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shrink-0" />}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-sm font-semibold text-gray-900">{order.id}</span>
                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${sc.color}`}>{sc.label}</span>
                              </div>
                              <p className="text-xs text-gray-400 mt-0.5">{order.customer.firstName} {order.customer.lastName} · {order.customer.wilaya}</p>
                            </div>
                            <div className="text-right shrink-0 hidden sm:block">
                              <p className="text-sm font-bold text-gray-800">{order.total}</p>
                              <p className="text-[10px] text-gray-400">{order.date}</p>
                            </div>
                            <span className={`text-gray-400 text-xs transition-transform ${isExpanded ? 'rotate-180' : ''}`}>▼</span>
                          </div>

                          {/* Expanded detail */}
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                                <div className="border-t border-gray-100 px-5 py-5 bg-gray-50/50">
                                  {/* Products */}
                                  <div className="mb-5">
                                    <h4 className="text-[10px] uppercase tracking-wider text-gray-400 font-medium mb-3">Produits commandés</h4>
                                    <div className="space-y-2">
                                      {order.items.map((item, idx) => (
                                        <div key={idx} className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-100">
                                          <div>
                                            <p className="text-sm font-medium text-gray-800">{item.fragranceName}</p>
                                            <p className="text-xs text-gray-400">Qté: {item.quantity} × {item.price}</p>
                                          </div>
                                          <span className="text-sm font-semibold text-gray-700">
                                            {(parseInt(item.price.replace(/[^\d]/g, '')) || 0) * item.quantity} DA
                                          </span>
                                        </div>
                                      ))}
                                    </div>
                                    <div className="flex justify-end mt-3 pt-3 border-t border-gray-100">
                                      <span className="text-base font-bold text-gray-900">Total : {order.total}</span>
                                    </div>
                                  </div>

                                  {/* Customer info */}
                                  <div className="mb-5">
                                    <h4 className="text-[10px] uppercase tracking-wider text-gray-400 font-medium mb-3">Informations client</h4>
                                    <div className="grid sm:grid-cols-2 gap-3 bg-white p-4 rounded-lg border border-gray-100">
                                      <div><span className="text-[10px] text-gray-400 block">Nom</span><span className="text-sm text-gray-800">{order.customer.firstName} {order.customer.lastName}</span></div>
                                      <div><span className="text-[10px] text-gray-400 block">Téléphone</span><a href={`tel:${order.customer.phone}`} className="text-sm text-amber-600 font-medium">{order.customer.phone}</a></div>
                                      {order.customer.email && <div><span className="text-[10px] text-gray-400 block">Email</span><span className="text-sm text-gray-800">{order.customer.email}</span></div>}
                                      <div><span className="text-[10px] text-gray-400 block">Wilaya</span><span className="text-sm text-gray-800">{order.customer.wilaya}</span></div>
                                      <div><span className="text-[10px] text-gray-400 block">Commune</span><span className="text-sm text-gray-800">{order.customer.commune}</span></div>
                                      <div className="sm:col-span-2"><span className="text-[10px] text-gray-400 block">Adresse</span><span className="text-sm text-gray-800">{order.customer.address}</span></div>
                                      {order.customer.notes && <div className="sm:col-span-2"><span className="text-[10px] text-gray-400 block">Note</span><span className="text-sm text-gray-600 italic">{order.customer.notes}</span></div>}
                                    </div>
                                  </div>

                                  {/* Actions */}
                                  <div className="flex flex-wrap gap-2">
                                    {order.status !== 'approved' && order.status !== 'shipped' && order.status !== 'cancelled' && (
                                      <button onClick={() => { updateOrderStatus(order.id, 'approved'); showToast('Commande approuvée'); }}
                                        className="px-4 py-2 text-xs font-medium rounded-md bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors">
                                        ✅ Approuver
                                      </button>
                                    )}
                                    {order.status === 'approved' && (
                                      <button onClick={() => { updateOrderStatus(order.id, 'shipped'); showToast('Commande marquée expédiée'); }}
                                        className="px-4 py-2 text-xs font-medium rounded-md bg-purple-50 text-purple-600 hover:bg-purple-100 transition-colors">
                                        📦 Marquer expédiée
                                      </button>
                                    )}
                                    {order.status !== 'cancelled' && order.status !== 'shipped' && (
                                      <button onClick={() => { updateOrderStatus(order.id, 'cancelled'); showToast('Commande annulée'); }}
                                        className="px-4 py-2 text-xs font-medium rounded-md bg-gray-50 text-gray-500 hover:bg-gray-100 transition-colors">
                                        ❌ Annuler
                                      </button>
                                    )}
                                    <button onClick={() => { if (window.confirm('Supprimer définitivement cette commande ?')) { deleteOrder(order.id); showToast('Commande supprimée'); } }}
                                      className="px-4 py-2 text-xs font-medium rounded-md bg-red-50 text-red-500 hover:bg-red-100 transition-colors ml-auto">
                                      🗑 Supprimer
                                    </button>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── Sub-components ─── */

function JournalImageUpload({ value, onChange }: { value: string; onChange: (url: string) => void }) {
  const [isUploading, setIsUploading] = useState(false);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) return;
    setIsUploading(true);
    try {
      const compressed = await compressImage(file);
      onChange(compressed);
    } catch {
      alert('Erreur lors du traitement de l\'image.');
    } finally {
      setIsUploading(false);
    }
  };

  const isBase64 = value.startsWith('data:image');

  return (
    <div className="space-y-2">
      {value && (
        <div className="relative group">
          <img src={value} alt="Aperçu" className="w-full h-24 object-cover rounded-lg border border-gray-200" />
          <button
            onClick={() => onChange('')}
            className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full text-[10px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
          >✕</button>
          {isBase64 && <span className="absolute bottom-1 left-1 text-[8px] bg-emerald-500 text-white px-1.5 py-0.5 rounded-full">📱</span>}
        </div>
      )}
      <label className="block cursor-pointer">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => { if (e.target.files?.[0]) handleFile(e.target.files[0]); e.target.value = ''; }}
          className="hidden"
        />
        <div className={`border border-dashed border-gray-300 rounded-lg p-3 text-center hover:border-amber-400 transition-colors ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}>
          <span className="text-xs text-gray-500">{isUploading ? '⏳ Compression...' : '📷 Choisir image'}</span>
        </div>
      </label>
      <input
        type="text"
        value={isBase64 ? '' : value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="ou URL..."
        className="w-full text-[10px] border border-gray-200 rounded px-2 py-1.5 focus:outline-none focus:border-amber-400 font-mono"
      />
    </div>
  );
}

function SettingsField({ label, value, onChange, textarea }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
}) {
  return (
    <div>
      <label className="text-[10px] font-medium text-gray-400 uppercase tracking-wider block mb-1.5">{label}</label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="w-full text-sm text-gray-800 border border-gray-200 rounded-lg p-3 focus:outline-none focus:border-amber-400 bg-white resize-none"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full text-sm text-gray-800 border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-amber-400 bg-white"
        />
      )}
    </div>
  );
}

function ImageUploadField({ label, value, onChange }: {
  label: string;
  value: string;
  onChange: (url: string) => void;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  // Create a safe id from label (strip anything that's not a letter/digit/dash)
  const safeId = `upload-${label.replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-')}-${Math.random().toString(36).slice(2, 6)}`;

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Veuillez sélectionner une image (JPG, PNG, WebP...)');
      return;
    }

    setIsUploading(true);
    try {
      const compressed = await compressImage(file);
      onChange(compressed);
    } catch {
      alert('Erreur lors du traitement de l\'image.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = ''; // Reset so same file can be re-selected
  };

  const isBase64 = value.startsWith('data:image');

  return (
    <div>
      <label className="text-[10px] font-medium text-gray-400 uppercase tracking-wider block mb-2">{label}</label>
      
      {/* Preview */}
      {value && (
        <div className="relative mb-3 group">
          <img 
            src={value} 
            alt="Aperçu" 
            className="w-full h-32 object-cover rounded-lg border border-gray-200" 
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <button
            onClick={() => onChange('')}
            className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
            title="Supprimer l'image"
          >
            ✕
          </button>
          {isBase64 && (
            <span className="absolute bottom-2 left-2 text-[9px] bg-emerald-500 text-white px-2 py-0.5 rounded-full">
              📱 Image locale
            </span>
          )}
        </div>
      )}

      {/* Upload zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
          dragActive ? 'border-amber-400 bg-amber-50' : 'border-gray-200 hover:border-gray-300'
        } ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleInputChange}
          className="hidden"
          id={safeId}
        />
        <label 
          htmlFor={safeId}
          className="cursor-pointer"
        >
          <div className="text-2xl mb-2">{isUploading ? '⏳' : '📷'}</div>
          <p className="text-xs text-gray-500 font-medium">
            {isUploading ? 'Compression en cours...' : 'Glisser une image ou cliquer pour parcourir'}
          </p>
          <p className="text-[10px] text-gray-400 mt-1">JPG, PNG, WebP — compressée automatiquement</p>
        </label>
      </div>

      {/* URL input as fallback */}
      <div className="mt-3">
        <div className="flex items-center gap-2 mb-1.5">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-[9px] text-gray-400 uppercase">ou URL externe</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <input 
          type="text" 
          value={isBase64 ? '' : value} 
          onChange={(e) => onChange(e.target.value)} 
          placeholder="https://..." 
          className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-amber-400 font-mono"
        />
      </div>
    </div>
  );
}

function FragranceForm({ fragrance, onChange, onSave, onCancel, isNew }: {
  fragrance: Fragrance;
  onChange: (updates: Partial<Fragrance>) => void;
  onSave: () => void;
  onCancel: () => void;
  isNew?: boolean;
}) {
  const update = (field: keyof Fragrance, value: string) => {
    onChange({ [field]: value } as Partial<Fragrance>);
  };

  const updateNotes = (level: 'top' | 'heart' | 'base', value: string) => {
    const arr = value.split(',').map(s => s.trim()).filter(Boolean);
    onChange({ notes: { ...fragrance.notes, [level]: arr.length ? arr : [''] } });
  };

  return (
    <div className="space-y-5">
      {/* Preview bar */}
      {fragrance.image && (
        <div className="flex items-center gap-4 p-3 bg-white rounded-lg border border-gray-100">
          <img src={fragrance.image} alt="Preview" className="w-16 h-16 rounded-lg object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          <div>
            <p className="text-xs text-gray-400">Aperçu</p>
            <p className="text-sm font-medium text-gray-700">{fragrance.name || 'Sans nom'}</p>
          </div>
          <div className="ml-auto flex gap-2">
            <div className="w-6 h-6 rounded-full border border-gray-200" style={{ backgroundColor: fragrance.color }} title="Couleur principale" />
            <div className="w-6 h-6 rounded-full border border-gray-200" style={{ backgroundColor: fragrance.colorAccent }} title="Couleur accent" />
          </div>
        </div>
      )}

      {/* Core info */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="text-[10px] font-medium text-gray-400 uppercase tracking-wider block mb-1.5">Nom *</label>
          <input type="text" value={fragrance.name} onChange={(e) => update('name', e.target.value)} placeholder="ex: Soft Aura" className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-amber-400" />
        </div>
        <div>
          <label className="text-[10px] font-medium text-gray-400 uppercase tracking-wider block mb-1.5">Sous-titre</label>
          <input type="text" value={fragrance.subtitle} onChange={(e) => update('subtitle', e.target.value)} placeholder="ex: L'essence de la douceur" className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-amber-400" />
        </div>
        <div>
          <label className="text-[10px] font-medium text-gray-400 uppercase tracking-wider block mb-1.5">Prix *</label>
          <input type="text" value={fragrance.price} onChange={(e) => update('price', e.target.value)} placeholder="ex: 49,90 €" className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-amber-400" />
        </div>
        <div>
          <label className="text-[10px] font-medium text-gray-400 uppercase tracking-wider block mb-1.5">Volume</label>
          <input type="text" value={fragrance.volume} onChange={(e) => update('volume', e.target.value)} placeholder="ex: 250ml" className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-amber-400" />
        </div>
      </div>

      {/* Signature */}
      <div>
        <label className="text-[10px] font-medium text-gray-400 uppercase tracking-wider block mb-1.5">Signature</label>
        <input type="text" value={fragrance.signature} onChange={(e) => update('signature', e.target.value)} placeholder="ex: Doux, frais, élégant naturel" className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-amber-400" />
      </div>

      {/* Images */}
      <div className="grid sm:grid-cols-2 gap-6">
        <ImageUploadField
          label="Image produit *"
          value={fragrance.image}
          onChange={(url) => update('image', url)}
        />
        <ImageUploadField
          label="Image d'ambiance"
          value={fragrance.bgImage}
          onChange={(url) => update('bgImage', url)}
        />
      </div>

      {/* Colors */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div>
          <label className="text-[10px] font-medium text-gray-400 uppercase tracking-wider block mb-1.5">Couleur principale</label>
          <div className="flex items-center gap-2">
            <input type="color" value={fragrance.color} onChange={(e) => update('color', e.target.value)} className="w-10 h-10 rounded cursor-pointer border-0 p-0" />
            <input type="text" value={fragrance.color} onChange={(e) => update('color', e.target.value)} className="flex-1 text-xs border border-gray-200 rounded-lg px-2 py-2 focus:outline-none focus:border-amber-400 font-mono" />
          </div>
        </div>
        <div>
          <label className="text-[10px] font-medium text-gray-400 uppercase tracking-wider block mb-1.5">Couleur accent</label>
          <div className="flex items-center gap-2">
            <input type="color" value={fragrance.colorAccent} onChange={(e) => update('colorAccent', e.target.value)} className="w-10 h-10 rounded cursor-pointer border-0 p-0" />
            <input type="text" value={fragrance.colorAccent} onChange={(e) => update('colorAccent', e.target.value)} className="flex-1 text-xs border border-gray-200 rounded-lg px-2 py-2 focus:outline-none focus:border-amber-400 font-mono" />
          </div>
        </div>
      </div>

      {/* Description & Story */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-[10px] font-medium text-gray-400 uppercase tracking-wider block mb-1.5">Description</label>
          <textarea value={fragrance.description} onChange={(e) => update('description', e.target.value)} rows={3} placeholder="Description du produit..." className="w-full text-sm border border-gray-200 rounded-lg p-3 focus:outline-none focus:border-amber-400 resize-none" />
        </div>
        <div>
          <label className="text-[10px] font-medium text-gray-400 uppercase tracking-wider block mb-1.5">Histoire</label>
          <textarea value={fragrance.story} onChange={(e) => update('story', e.target.value)} rows={3} placeholder="L'histoire de cette fragrance..." className="w-full text-sm border border-gray-200 rounded-lg p-3 focus:outline-none focus:border-amber-400 resize-none" />
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="text-[10px] font-medium text-gray-400 uppercase tracking-wider block mb-3">Pyramide olfactive <span className="text-gray-300">(séparer par des virgules)</span></label>
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className="text-[10px] text-amber-600 font-medium block mb-1">Notes de tête</label>
            <input type="text" value={fragrance.notes.top.join(', ')} onChange={(e) => updateNotes('top', e.target.value)} placeholder="Bergamote, Poire" className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-amber-400" />
          </div>
          <div>
            <label className="text-[10px] text-amber-600 font-medium block mb-1">Notes de cœur</label>
            <input type="text" value={fragrance.notes.heart.join(', ')} onChange={(e) => updateNotes('heart', e.target.value)} placeholder="Pivoine, Magnolia" className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-amber-400" />
          </div>
          <div>
            <label className="text-[10px] text-amber-600 font-medium block mb-1">Notes de fond</label>
            <input type="text" value={fragrance.notes.base.join(', ')} onChange={(e) => updateNotes('base', e.target.value)} placeholder="Muscs blancs, Cèdre" className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-amber-400" />
          </div>
        </div>
      </div>

      {/* Gradient */}
      <div>
        <label className="text-[10px] font-medium text-gray-400 uppercase tracking-wider block mb-1.5">Gradient CSS</label>
        <input type="text" value={fragrance.gradient} onChange={(e) => update('gradient', e.target.value)} className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-amber-400 font-mono" />
        <div className="mt-2 h-6 rounded-md border border-gray-200" style={{ background: fragrance.gradient }} />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <button onClick={onCancel} className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors">
          Annuler
        </button>
        <button
          onClick={onSave}
          disabled={!fragrance.name.trim() || !fragrance.price.trim()}
          className="px-6 py-2.5 bg-amber-500 text-white text-sm font-medium rounded-lg hover:bg-amber-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isNew ? '+ Ajouter la fragrance' : '✓ Sauvegarder'}
        </button>
      </div>
    </div>
  );
}
