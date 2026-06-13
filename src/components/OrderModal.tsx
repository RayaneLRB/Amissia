import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSiteData, type Order, type OrderItem } from '../context/SiteDataContext';
import type { Fragrance } from '../data/fragrances';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  fragrance: Fragrance | null;
}

const wilayas = [
  'Adrar','Chlef','Laghouat','Oum El Bouaghi','Batna','Béjaïa','Biskra','Béchar','Blida','Bouira',
  'Tamanrasset','Tébessa','Tlemcen','Tiaret','Tizi Ouzou','Alger','Djelfa','Jijel','Sétif','Saïda',
  'Skikda','Sidi Bel Abbès','Annaba','Guelma','Constantine','Médéa','Mostaganem','M\'Sila','Mascara',
  'Ouargla','Oran','El Bayadh','Illizi','Bordj Bou Arréridj','Boumerdès','El Tarf','Tindouf',
  'Tissemsilt','El Oued','Khenchela','Souk Ahras','Tipaza','Mila','Aïn Defla','Naâma','Aïn Témouchent',
  'Ghardaïa','Relizane','Timimoun','Bordj Badji Mokhtar','Ouled Djellal','Béni Abbès','In Salah',
  'In Guezzam','Touggourt','Djanet','El M\'Ghair','El Meniaa'
];

export default function OrderModal({ isOpen, onClose, fragrance }: OrderModalProps) {
  const { data, addOrder } = useSiteData();
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [selectedProducts, setSelectedProducts] = useState<{ id: string; qty: number }[]>(
    fragrance ? [{ id: fragrance.id, qty: 1 }] : []
  );
  const [form, setForm] = useState({
    firstName: '', lastName: '', phone: '', email: '',
    wilaya: '', commune: '', address: '', notes: '',
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const resetForm = () => {
    setStep('form');
    setSelectedProducts(fragrance ? [{ id: fragrance.id, qty: 1 }] : []);
    setForm({ firstName: '', lastName: '', phone: '', email: '', wilaya: '', commune: '', address: '', notes: '' });
    setErrors({});
  };

  const handleClose = () => { onClose(); setTimeout(resetForm, 300); };

  const toggleProduct = (id: string) => {
    setSelectedProducts(prev => {
      const exists = prev.find(p => p.id === id);
      if (exists) return prev.filter(p => p.id !== id);
      return [...prev, { id, qty: 1 }];
    });
  };

  const updateProductQty = (id: string, qty: number) => {
    setSelectedProducts(prev => prev.map(p => p.id === id ? { ...p, qty: Math.max(1, qty) } : p));
  };

  const calcTotal = () => {
    return selectedProducts.reduce((sum, sp) => {
      const f = data.fragrances.find(fr => fr.id === sp.id);
      if (!f) return sum;
      const price = parseInt(f.price.replace(/[^\d]/g, '')) || 0;
      return sum + price * sp.qty;
    }, 0);
  };

  const validate = () => {
    const e: Record<string, boolean> = {};
    if (!form.firstName.trim()) e.firstName = true;
    if (!form.lastName.trim()) e.lastName = true;
    if (!form.phone.trim() || form.phone.replace(/\s/g, '').length < 9) e.phone = true;
    if (!form.wilaya) e.wilaya = true;
    if (!form.commune.trim()) e.commune = true;
    if (!form.address.trim()) e.address = true;
    if (selectedProducts.length === 0) e.products = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const items: OrderItem[] = selectedProducts.map(sp => {
      const f = data.fragrances.find(fr => fr.id === sp.id)!;
      return { fragranceId: f.id, fragranceName: f.name, quantity: sp.qty, price: f.price };
    });

    const order: Order = {
      id: `ORD-${Date.now().toString(36).toUpperCase()}`,
      date: new Date().toLocaleString('fr-DZ', { dateStyle: 'long', timeStyle: 'short' }),
      status: 'new',
      items,
      customer: { ...form },
      total: `${calcTotal()} DA`,
    };

    addOrder(order);
    setStep('success');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[90] bg-brown-dark/60 backdrop-blur-sm flex items-start justify-center overflow-y-auto py-8 px-4"
        onClick={handleClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.4 }}
          className="bg-ivory w-full max-w-lg rounded-sm shadow-2xl my-auto relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close */}
          <button onClick={handleClose} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-brown/40 hover:text-brown-dark transition-colors text-lg z-10">✕</button>

          {step === 'form' ? (
            <form onSubmit={handleSubmit} className="p-6 sm:p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <span className="text-[9px] tracking-[0.5em] uppercase text-champagne block mb-2">Amissia</span>
                <h2 className="font-serif text-2xl sm:text-3xl text-brown-dark font-light">Passer <em className="italic">commande</em></h2>
                <p className="text-xs text-brown/40 mt-2 font-light">Remplissez le formulaire ci-dessous pour commander</p>
              </div>

              {/* Products selection */}
              <div className="mb-6">
                <label className="text-[10px] tracking-[0.3em] uppercase text-brown/50 block mb-3 font-medium">Produits sélectionnés *</label>
                {errors.products && <p className="text-red-400 text-[10px] mb-2">Sélectionnez au moins un produit</p>}
                <div className="space-y-2">
                  {data.fragrances.map(f => {
                    const selected = selectedProducts.find(sp => sp.id === f.id);
                    return (
                      <div
                        key={f.id}
                        className={`flex items-center gap-3 p-3 border rounded-sm cursor-pointer transition-all ${
                          selected ? 'border-champagne bg-champagne/5' : 'border-beige hover:border-champagne/40'
                        }`}
                        onClick={() => toggleProduct(f.id)}
                      >
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                          selected ? 'border-champagne bg-champagne' : 'border-beige-dark/40'
                        }`}>
                          {selected && <span className="text-ivory text-[10px]">✓</span>}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-brown-dark font-light">{f.name}</p>
                          <p className="text-[10px] text-brown/40 italic">{f.signature}</p>
                        </div>
                        <span className="text-sm text-brown-dark font-medium shrink-0">{f.price}</span>
                        {selected && (
                          <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                            <button type="button" onClick={() => updateProductQty(f.id, selected.qty - 1)} className="w-6 h-6 border border-beige rounded-sm text-brown/50 hover:border-champagne text-sm">−</button>
                            <span className="w-6 text-center text-sm text-brown-dark">{selected.qty}</span>
                            <button type="button" onClick={() => updateProductQty(f.id, selected.qty + 1)} className="w-6 h-6 border border-beige rounded-sm text-brown/50 hover:border-champagne text-sm">+</button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-1 h-px bg-beige" />
                <span className="text-[9px] tracking-[0.3em] uppercase text-champagne">Vos informations</span>
                <div className="flex-1 h-px bg-beige" />
              </div>

              {/* Customer info */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] tracking-[0.2em] uppercase text-brown/50 block mb-1.5">Prénom *</label>
                    <input type="text" value={form.firstName} onChange={e => setForm(p => ({ ...p, firstName: e.target.value }))}
                      className={`w-full border-b pb-2 text-sm bg-transparent focus:outline-none font-light transition-colors ${errors.firstName ? 'border-red-400' : 'border-beige-dark/40 focus:border-champagne'}`}
                      placeholder="Prénom" />
                  </div>
                  <div>
                    <label className="text-[10px] tracking-[0.2em] uppercase text-brown/50 block mb-1.5">Nom *</label>
                    <input type="text" value={form.lastName} onChange={e => setForm(p => ({ ...p, lastName: e.target.value }))}
                      className={`w-full border-b pb-2 text-sm bg-transparent focus:outline-none font-light transition-colors ${errors.lastName ? 'border-red-400' : 'border-beige-dark/40 focus:border-champagne'}`}
                      placeholder="Nom" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] tracking-[0.2em] uppercase text-brown/50 block mb-1.5">Téléphone *</label>
                  <input type="tel" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                    className={`w-full border-b pb-2 text-sm bg-transparent focus:outline-none font-light transition-colors ${errors.phone ? 'border-red-400' : 'border-beige-dark/40 focus:border-champagne'}`}
                    placeholder="0X XX XX XX XX" />
                </div>
                <div>
                  <label className="text-[10px] tracking-[0.2em] uppercase text-brown/50 block mb-1.5">E-mail <span className="text-brown/25">(optionnel)</span></label>
                  <input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                    className="w-full border-b border-beige-dark/40 pb-2 text-sm bg-transparent focus:outline-none focus:border-champagne font-light transition-colors"
                    placeholder="email@exemple.com" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] tracking-[0.2em] uppercase text-brown/50 block mb-1.5">Wilaya *</label>
                    <select value={form.wilaya} onChange={e => setForm(p => ({ ...p, wilaya: e.target.value }))}
                      className={`w-full border-b pb-2 text-sm bg-transparent focus:outline-none font-light appearance-none transition-colors ${errors.wilaya ? 'border-red-400' : 'border-beige-dark/40 focus:border-champagne'}`}>
                      <option value="">Choisir...</option>
                      {wilayas.map(w => <option key={w} value={w}>{w}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] tracking-[0.2em] uppercase text-brown/50 block mb-1.5">Commune *</label>
                    <input type="text" value={form.commune} onChange={e => setForm(p => ({ ...p, commune: e.target.value }))}
                      className={`w-full border-b pb-2 text-sm bg-transparent focus:outline-none font-light transition-colors ${errors.commune ? 'border-red-400' : 'border-beige-dark/40 focus:border-champagne'}`}
                      placeholder="Commune" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] tracking-[0.2em] uppercase text-brown/50 block mb-1.5">Adresse de livraison *</label>
                  <input type="text" value={form.address} onChange={e => setForm(p => ({ ...p, address: e.target.value }))}
                    className={`w-full border-b pb-2 text-sm bg-transparent focus:outline-none font-light transition-colors ${errors.address ? 'border-red-400' : 'border-beige-dark/40 focus:border-champagne'}`}
                    placeholder="Rue, quartier, bâtiment..." />
                </div>
                <div>
                  <label className="text-[10px] tracking-[0.2em] uppercase text-brown/50 block mb-1.5">Note <span className="text-brown/25">(optionnel)</span></label>
                  <textarea value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} rows={2}
                    className="w-full border-b border-beige-dark/40 pb-2 text-sm bg-transparent focus:outline-none focus:border-champagne font-light resize-none transition-colors"
                    placeholder="Instructions particulières..." />
                </div>
              </div>

              {/* Total + Submit */}
              <div className="mt-8 pt-6 border-t border-beige">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-brown/50">Total</span>
                  <span className="font-serif text-2xl text-brown-dark">{calcTotal()} DA</span>
                </div>
                <button type="submit"
                  className="w-full py-4 bg-brown-dark text-ivory text-[11px] tracking-[0.3em] uppercase hover:bg-brown transition-colors duration-500">
                  Commander maintenant
                </button>
                <p className="text-[9px] text-brown/30 text-center mt-3 font-light">Paiement à la livraison · Livraison sur tout le territoire</p>
              </div>
            </form>
          ) : (
            /* Success */
            <div className="p-8 sm:p-12 text-center">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.1 }}>
                <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">✓</span>
                </div>
              </motion.div>
              <h3 className="font-serif text-2xl text-brown-dark mb-3">Commande confirmée !</h3>
              <p className="text-sm text-brown/50 font-light mb-6 leading-relaxed">
                Merci pour votre confiance. Notre équipe va traiter votre commande et vous contacter très bientôt pour confirmer la livraison.
              </p>
              <div className="bg-beige/30 p-4 rounded-sm mb-6">
                <p className="text-[10px] tracking-[0.3em] uppercase text-champagne mb-1">Total</p>
                <p className="font-serif text-xl text-brown-dark">{calcTotal()} DA</p>
              </div>
              <button onClick={handleClose}
                className="px-10 py-3 border border-champagne/40 text-[11px] tracking-[0.2em] uppercase text-brown-dark hover:bg-champagne/10 transition-all duration-500">
                Fermer
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
