import React, { useState, useEffect } from 'react';
import { fetchEvents, createRecord, updateRecord, deleteRecord, getPbImageUrl } from '../../api';
import { Trash2, PlusCircle, Edit2, Calendar, X, Save, Search, Image as ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import imageCompression from 'browser-image-compression';

const ManageEvents: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ 
    title: '', description: '', start_date: '', end_date: '' 
  });
  
  // NOUVEAU : On stocke l'URL de l'image actuelle pour l'aperçu
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const loadData = async () => {
    try {
        const data = await fetchEvents();
        setEvents(data || []);
    } catch (e) { toast.error("Erreur chargement événements"); }
    finally { setLoading(false); }
  };
  useEffect(() => { loadData(); }, []);

  const filteredEvents = events.filter(e => e.title.toLowerCase().includes(searchTerm.toLowerCase()));

  const openModal = (evt?: any) => {
    if (evt) {
      // MODE MODIFICATION : On pré-remplit tout
      setEditingId(evt.id);
      setFormData({
        title: evt.title,
        description: evt.description,
        start_date: evt.start_date ? evt.start_date.split(' ')[0] : '',
        end_date: evt.end_date ? evt.end_date.split(' ')[0] : ''
      });
      console.log("Opening modal for event:", evt);
      // On récupère l'image existante
      setCurrentImageUrl(evt.image ? getPbImageUrl(evt, evt.image) : null);
    } else {
      // MODE CRÉATION : On vide tout
      setEditingId(null);
      setFormData({ title: '', description: '', start_date: '', end_date: '' });
      setCurrentImageUrl(null);
    }
    setFile(null); // Le fichier uploadé est toujours vide au début
    setIsModalOpen(true);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const imageFile = e.target.files?.[0];
  if (!imageFile) return;

  const options = {
    maxSizeMB: 1,          // Max 1 Mo
    maxWidthOrHeight: 1920, // Max 1920px de large
    useWebWorker: true
  };

  try {
    const compressedFile = await imageCompression(imageFile, options);
    // On crée un nouveau fichier File car l'API attend un File, pas un Blob
    const finalFile = new File([compressedFile], imageFile.name, { type: imageFile.type });
    
    setFile(finalFile); // Ton setFile existant
  } catch (error) {
    console.log(error);
    setFile(imageFile); // Fallback sur l'original si erreur
  }
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('start_date', formData.start_date);
    if (formData.end_date) data.append('end_date', formData.end_date);
    if (file) data.append('image', file);

    const promise = editingId ? updateRecord('events', editingId, data) : createRecord('events', data);
    toast.promise(promise, {
      loading: 'Sauvegarde...',
      success: () => { setIsModalOpen(false); loadData(); return 'Enregistré !'; },
      error: 'Erreur',
    });
  };

  const handleDelete = async (id: string) => {
    if (confirm("Supprimer cet événement ?")) {
      await deleteRecord('events', id);
      toast.success("Supprimé");
      loadData();
    }
  };

  if (loading) return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div></div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Gestion Événements</h1>
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

      {filteredEvents.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl bg-white">
           <Calendar className="mx-auto text-gray-300 mb-3" size={48} />
           <p className="text-gray-500">Aucun événement trouvé.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((evt) => (
            <div key={evt.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 group hover:shadow-md transition-all">
               <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden border border-gray-200">
                  {evt.image ? (
                      <img src={getPbImageUrl(evt, evt.image) ? getPbImageUrl(evt, evt.image)! : ''} alt={evt.title} className="w-full h-full object-cover" />
                  ) : (
                      <Calendar size={24} className="text-orange-500"/>
                  )}
               </div>
               <div className="flex-grow min-w-0">
                  <h3 className="font-bold text-gray-800 truncate">{evt.title}</h3>
                  <p className="text-sm text-gray-500">{new Date(evt.start_date).toLocaleDateString()}</p>
               </div>
               <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openModal(evt)} className="p-2 text-gray-400 hover:text-orange-500"><Edit2 size={18} /></button>
                  <button onClick={() => handleDelete(evt.id)} className="p-2 text-gray-400 hover:text-red-500"><Trash2 size={18} /></button>
               </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b flex justify-between items-center bg-gray-50">
              <h3 className="font-bold text-lg">{editingId ? 'Modifier' : 'Nouvel Événement'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-800"><X /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Titre</label>
                <input required className="w-full border rounded p-2 mt-1" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-sm font-medium text-gray-700">Début</label>
                    <input type="date" required className="w-full border rounded p-2 mt-1" value={formData.start_date} onChange={e => setFormData({...formData, start_date: e.target.value})} />
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-700">Fin</label>
                    <input type="date" className="w-full border rounded p-2 mt-1" value={formData.end_date} onChange={e => setFormData({...formData, end_date: e.target.value})} />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Description</label>
                <ReactQuill 
                  theme="snow"
                  value={formData.description}
                  onChange={(content) => setFormData({ ...formData, description: content })}
                  className="h-48 mb-12"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Affiche / Image</label>
                
                {/* APERÇU DE L'IMAGE ACTUELLE */}
                {currentImageUrl && !file && (
                    <div className="mt-2 mb-2 p-2 bg-gray-50 border rounded-lg flex items-center gap-3">
                        <img src={currentImageUrl} alt="Actuelle" className="h-16 w-16 object-cover rounded" />
                        <div>
                            <p className="text-xs font-bold text-gray-600">Image actuelle</p>
                            <p className="text-xs text-gray-400">Sélectionnez un fichier pour la remplacer.</p>
                        </div>
                    </div>
                )}

                <div className="mt-1 flex items-center gap-2">
                    <input type="file" accept="image/*" onChange={handleFileChange} className="w-full text-sm" />
                </div>
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
export default ManageEvents;