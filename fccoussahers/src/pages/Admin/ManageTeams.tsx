import React, { useState, useEffect } from 'react';
import { fetchTeams, createRecord, updateRecord, deleteRecord, getPbImageUrl } from '../../api';
import { Trash2, PlusCircle, Edit2, Users, Save, X, Search } from 'lucide-react';
import toast from 'react-hot-toast';

const ManageTeams: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [teams, setTeams] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ 
    name: '', category: '', coach: '', description: '', sort_order: 1 
  });
  
  // URL Image
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const loadData = async () => {
    try {
      const data = await fetchTeams();
      setTeams(data || []);
    } catch (error) { toast.error("Erreur de chargement des équipes"); }
    finally { setLoading(false); }
  };

  useEffect(() => { loadData(); }, []);

  const filteredTeams = teams.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.coach.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = (team?: any) => {
    if (team) {
      setEditingId(team.id);
      setFormData({
        name: team.name, category: team.category, coach: team.coach, description: team.description, sort_order: team.sort_order
      });
      // Gestion image unique ou multiple (on prend la première)
      const img = Array.isArray(team.image) ? team.image[0] : team.image;
      setCurrentImageUrl(img ? getPbImageUrl(team, img) : null);
    } else {
      setEditingId(null);
      setFormData({ name: '', category: '', coach: '', description: '', sort_order: teams.length + 1 });
      setCurrentImageUrl(null);
    }
    setFile(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('category', formData.category);
    data.append('coach', formData.coach);
    data.append('description', formData.description);
    data.append('sort_order', formData.sort_order.toString());
    if (file) data.append('image', file);

    const promise = editingId ? updateRecord('teams', editingId, data) : createRecord('teams', data);
    toast.promise(promise, {
      loading: 'Sauvegarde...',
      success: () => { setIsModalOpen(false); loadData(); return 'Enregistré !'; },
      error: 'Erreur',
    });
  };

  const handleDelete = async (id: string) => {
    if (confirm("Supprimer cette équipe ?")) {
      await deleteRecord('teams', id);
      toast.success("Supprimé");
      loadData();
    }
  };

  if (loading) return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div></div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Gestion Équipes</h1>
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

      {filteredTeams.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl bg-white">
           <Users className="mx-auto text-gray-300 mb-3" size={48} />
           <p className="text-gray-500">Aucune équipe trouvée.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeams.map((team) => (
            <div key={team.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 group hover:shadow-md transition-all">
              <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                 {team.image ? (
                   <img src={getPbImageUrl(team, Array.isArray(team.image) ? team.image[0] : team.image)} className="w-full h-full object-cover"/>
                 ) : (
                   <div className="w-full h-full flex items-center justify-center text-gray-400"><Users /></div>
                 )}
              </div>
              <div className="flex-grow min-w-0">
                <h3 className="font-bold text-gray-800 truncate">{team.name}</h3>
                <p className="text-xs font-bold text-primary">{team.category}</p>
                <p className="text-sm text-gray-500 truncate">Coach: {team.coach}</p>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => openModal(team)} className="p-2 text-gray-400 hover:text-orange-500"><Edit2 size={18} /></button>
                <button onClick={() => handleDelete(team.id)} className="p-2 text-gray-400 hover:text-red-500"><Trash2 size={18} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL */}
      {isModalOpen && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden max-h-[90vh] overflow-y-auto">
                <div className="p-4 border-b flex justify-between items-center bg-gray-50">
                    <h3 className="font-bold text-lg">{editingId ? 'Modifier' : 'Nouvelle Équipe'}</h3>
                    <button onClick={() => setIsModalOpen(false)}><X /></button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700">Nom</label>
                            <input required className="w-full border p-2 rounded mt-1" placeholder="Ex: Seniors 1" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700">Catégorie</label>
                            <input className="w-full border p-2 rounded mt-1" placeholder="Ex: R3" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
                        </div>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700">Coach</label>
                        <input className="w-full border p-2 rounded mt-1" value={formData.coach} onChange={e => setFormData({...formData, coach: e.target.value})} />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700">Description</label>
                        <textarea className="w-full border p-2 rounded mt-1" rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                    </div>
                    <div className="flex gap-4">
                         <div className="flex-1">
                            <label className="text-sm font-medium text-gray-700">Ordre d'affichage</label>
                            <input type="number" className="w-full border rounded p-2 mt-1" value={formData.sort_order} onChange={e => setFormData({...formData, sort_order: parseInt(e.target.value)})} />
                         </div>
                    </div>
                    
                    <div>
                        <label className="text-sm font-medium text-gray-700">Photo</label>
                        {/* APERÇU PHOTO */}
                        {currentImageUrl && !file && (
                            <div className="mt-2 mb-2 p-2 bg-gray-50 border rounded-lg flex items-center gap-3">
                                <img src={currentImageUrl} alt="Actuelle" className="h-16 w-16 object-cover rounded" />
                                <span className="text-xs text-gray-500">Image actuelle</span>
                            </div>
                        )}
                        <input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} className="w-full mt-1 text-sm" />
                    </div>

                    <button className="w-full bg-primary text-white py-3 rounded-xl font-bold mt-4 hover:bg-primary-dark flex justify-center gap-2">
                        <Save size={20} /> Enregistrer
                    </button>
                </form>
            </div>
         </div>
      )}
    </div>
  );
};
export default ManageTeams;