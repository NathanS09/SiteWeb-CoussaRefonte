import React, { useState, useEffect } from 'react';
import { fetchAmicale, createRecord, updateRecord, deleteRecord, getPbImageUrl } from '../../api';
import { Trash2, PlusCircle, Image as ImageIcon, X, Save, Edit2, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import imageCompression from 'browser-image-compression';

const ManageAmicale: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [photos, setPhotos] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  
  // URL Image
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const loadData = async () => {
    try {
        const data = await fetchAmicale();
        setPhotos(data || []);
    } catch (e) { toast.error("Erreur chargement galerie"); }
    finally { setLoading(false); }
  };
  useEffect(() => { loadData(); }, []);

  const filteredPhotos = photos.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));

  const openModal = (item?: any) => {
    if (item) {
        setEditingId(item.id);
        setTitle(item.title);
        setCurrentImageUrl(item.image ? getPbImageUrl(item, item.image) : null);
    } else {
        setEditingId(null);
        setTitle('');
        setCurrentImageUrl(null);
    }
    setFile(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId && !file) return toast.error("Image obligatoire !");

    const formData = new FormData();
    formData.append('title', title);
    if (file) formData.append('image', file);

    const promise = editingId ? updateRecord('amicale', editingId, formData) : createRecord('amicale', formData);
    toast.promise(promise, {
        loading: 'Envoi...',
        success: () => { setIsModalOpen(false); loadData(); return 'Enregistré !'; },
        error: 'Erreur'
    });
  };

  const handleDelete = async (id: string) => {
    if(confirm('Supprimer cette photo ?')) {
        await deleteRecord('amicale', id);
        toast.success("Supprimé");
        loadData();
    }
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

  if (loading) return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8 gap-4">
        <h1 className="text-2xl font-bold text-primary whitespace-nowrap">Galerie Amicale</h1>
        <button onClick={() => openModal()} className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary-dark transition-colors">
            <PlusCircle size={20} /> Ajouter
        </button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input 
          className="pl-9 pr-4 py-2 border rounded-lg w-full focus:ring-2 focus:ring-primary outline-none"
          placeholder="Rechercher une photo..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredPhotos.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl bg-white">
           <ImageIcon className="mx-auto text-gray-300 mb-3" size={48} />
           <p className="text-gray-500">Aucune photo trouvée.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredPhotos.map((item) => (
              <div key={item.id} className="group relative aspect-square bg-gray-100 rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-lg transition-all" onClick={() => openModal(item)}>
                  {item.image && <img src={getPbImageUrl(item, item.image)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />}
                  
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                      <div className="flex justify-end">
                          <button onClick={(e) => {e.stopPropagation(); handleDelete(item.id)}} className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors">
                              <Trash2 size={16} />
                          </button>
                      </div>
                      <div className="text-white text-center">
                          <p className="text-sm font-medium truncate">{item.title}</p>
                          <span className="text-xs bg-white/20 px-2 py-1 rounded mt-1 inline-flex items-center gap-1"><Edit2 size={10}/> Modifier</span>
                      </div>
                  </div>
              </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
                <div className="p-4 border-b flex justify-between items-center bg-gray-50">
                    <h3 className="font-bold text-lg">{editingId ? 'Modifier' : 'Ajouter une photo'}</h3>
                    <button onClick={() => setIsModalOpen(false)}><X /></button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="text-sm font-medium">Titre</label>
                        <input className="w-full border p-2 rounded mt-1" value={title} onChange={e => setTitle(e.target.value)} placeholder="Ex: Soirée du club" />
                    </div>
                    
                    <div className="border-2 border-dashed border-gray-300 p-6 rounded-xl text-center cursor-pointer hover:bg-gray-50 relative transition-colors">
                        
                        {currentImageUrl && !file ? (
                             <div className="flex flex-col items-center">
                                <img src={currentImageUrl} className="h-32 w-auto object-contain rounded mb-2" />
                                <p className="text-xs text-gray-400">Cliquez pour changer</p>
                             </div>
                        ) : (
                            <div className="flex flex-col items-center text-gray-400">
                                <ImageIcon size={32} className="mb-2" />
                                <span className="text-sm font-medium text-gray-600">{file ? file.name : "Choisir une image"}</span>
                            </div>
                        )}

                        <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 w-full h-full cursor-pointer" />
                    </div>
                    
                    <button className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary-dark mt-4 flex justify-center gap-2">
                        <Save size={20} /> Enregistrer
                    </button>
                </form>
            </div>
        </div>
      )}
    </div>
  );
};
export default ManageAmicale;