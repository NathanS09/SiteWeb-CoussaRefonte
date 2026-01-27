import React, { useState, useEffect } from 'react';
import { fetchPartenaires, createRecord, updateRecord, deleteRecord, getPbImageUrl } from '../../api';
import { Trash2, PlusCircle, Edit2, X, Save, Star, Search, Handshake } from 'lucide-react';
import toast from 'react-hot-toast';

const ManagePartners: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [partners, setPartners] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', description: '', website: '', isFeatured: false });
  
  // URL Image
  const [currentLogoUrl, setCurrentLogoUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const loadData = async () => {
    try {
      const data = await fetchPartenaires();
      setPartners(data || []);
    } catch (e) { toast.error("Erreur chargement partenaires"); }
    finally { setLoading(false); }
  };
  useEffect(() => { loadData(); }, []);

  const filteredPartners = partners.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const openModal = (partner?: any) => {
    if (partner) {
      setEditingId(partner.id);
      setFormData({ 
        name: partner.name, 
        description: partner.description, 
        website: partner.website, 
        isFeatured: partner.isFeatured 
      });
      setCurrentLogoUrl(partner.logo ? getPbImageUrl(partner, partner.logo) : null);
    } else {
      setEditingId(null);
      setFormData({ name: '', description: '', website: '', isFeatured: false });
      setCurrentLogoUrl(null);
    }
    setFile(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('website', formData.website);
    data.append('isFeatured', String(formData.isFeatured));
    if (file) data.append('logo', file);

    const promise = editingId ? updateRecord('partners', editingId, data) : createRecord('partners', data);
    toast.promise(promise, {
      loading: 'Sauvegarde...',
      success: () => { setIsModalOpen(false); loadData(); return 'Enregistré !'; },
      error: 'Erreur',
    });
  };

  const handleDelete = async (id: string) => {
    if (confirm("Supprimer ce partenaire ?")) {
      await deleteRecord('partners', id);
      toast.success("Supprimé");
      loadData();
    }
  };

  if (loading) return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div></div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Partenaires</h1>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              className="pl-9 pr-4 py-2 border rounded-lg w-full focus:ring-2 focus:ring-primary outline-none"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <button onClick={() => openModal()} className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary-dark whitespace-nowrap">
            <PlusCircle size={20} /> Ajouter
          </button>
        </div>
      </div>

      {filteredPartners.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl bg-white">
           <Handshake className="mx-auto text-gray-300 mb-3" size={48} />
           <p className="text-gray-500">Aucun partenaire trouvé.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPartners.map((p) => (
            <div key={p.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 group hover:shadow-md transition-all">
              <div className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center p-2 flex-shrink-0 border border-gray-100">
                {p.logo ? <img src={getPbImageUrl(p, p.logo)} className="w-full h-full object-contain"/> : <span className="text-xs text-gray-400">No Logo</span>}
              </div>
              <div className="flex-grow min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-gray-800 truncate">{p.name}</h3>
                  {p.isFeatured && <Star size={14} className="text-yellow-500 fill-yellow-500 flex-shrink-0" />}
                </div>
                <p className="text-sm text-gray-500 truncate">{p.website || 'Pas de site web'}</p>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => openModal(p)} className="p-2 text-gray-400 hover:text-orange-500"><Edit2 size={18} /></button>
                <button onClick={() => handleDelete(p.id)} className="p-2 text-gray-400 hover:text-red-500"><Trash2 size={18} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center bg-gray-50">
              <h3 className="font-bold text-lg">{editingId ? 'Modifier' : 'Nouveau Partenaire'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-800"><X /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Nom</label>
                <input required className="w-full border rounded p-2 mt-1" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Description</label>
                <textarea className="w-full border rounded p-2 mt-1" rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Site Web</label>
                <input type="url" className="w-full border rounded p-2 mt-1" value={formData.website} onChange={e => setFormData({...formData, website: e.target.value})} />
              </div>
              <div className="flex items-center gap-2 bg-yellow-50 p-3 rounded border border-yellow-100">
                <input type="checkbox" id="feat" checked={formData.isFeatured} onChange={e => setFormData({...formData, isFeatured: e.target.checked})} className="w-4 h-4 text-primary" />
                <label htmlFor="feat" className="text-sm font-medium text-gray-700 cursor-pointer">Mettre à la une</label>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Logo</label>
                {/* APERÇU LOGO */}
                {currentLogoUrl && !file && (
                    <div className="mt-2 mb-2 p-2 bg-gray-50 border rounded-lg flex items-center gap-3">
                        <img src={currentLogoUrl} alt="Actuel" className="h-12 w-12 object-contain rounded bg-white border" />
                        <span className="text-xs text-gray-500">Logo actuel</span>
                    </div>
                )}
                <input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} className="w-full mt-1 text-sm" />
              </div>

              <button className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary-dark flex justify-center gap-2 mt-4">
                <Save size={20} /> Enregistrer
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default ManagePartners;