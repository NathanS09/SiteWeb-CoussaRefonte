import React, { useState, useEffect } from 'react';
import { fetchClubInfo, fetchBoardMembers, updateRecord, createRecord, deleteRecord } from '../../api';
import { Save, UserPlus, Trash2, X, Info } from 'lucide-react';
import toast from 'react-hot-toast';

const ManageClub: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [infoId, setInfoId] = useState('');
  const [content, setContent] = useState('');
  const [members, setMembers] = useState<any[]>([]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [memberForm, setMemberForm] = useState({ name: '', role: '' });

  const loadData = async () => {
    try {
        const [info, board] = await Promise.all([
            fetchClubInfo('FCCH'),
            fetchBoardMembers()
        ]);
        if (info) { setInfoId(info.id); setContent(info.content); }
        setMembers(board || []);
    } catch (e) {
        toast.error("Erreur chargement données club");
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleSaveInfo = async () => {
    if (!infoId) return toast.error("Erreur technique (ID manquant)");
    toast.promise(updateRecord('club_info', infoId, { content }), {
      loading: 'Sauvegarde...', success: 'Historique mis à jour !', error: 'Erreur'
    });
  };

  const handleSaveMember = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.promise(
      createRecord('board_members', memberForm).then(() => {
        setIsModalOpen(false);
        setMemberForm({ name: '', role: '' });
        loadData();
      }),
      { loading: 'Ajout...', success: 'Membre ajouté', error: 'Erreur' }
    );
  };

  const handleDeleteMember = async (id: string) => {
    if(confirm('Supprimer ce membre ?')) {
        await deleteRecord('board_members', id);
        toast.success("Membre supprimé");
        loadData();
    }
  };

  if (loading) return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div></div>;

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">Infos & Bureau</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* HISTOIRE */}
          <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col h-full">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <Info size={20} className="text-primary"/> Historique
                </h2>
                <button onClick={handleSaveInfo} className="bg-primary/10 text-primary hover:bg-primary hover:text-white px-3 py-1 rounded-lg flex gap-2 font-medium transition-colors text-sm">
                    <Save size={16} /> Sauvegarder
                </button>
            </div>
            <p className="text-xs text-gray-500 mb-2">Utilisez des tirets (-) pour créer des listes à puces.</p>
            <textarea 
                className="w-full flex-grow p-4 border rounded-lg bg-gray-50 focus:bg-white transition-colors focus:ring-2 focus:ring-primary outline-none min-h-[300px]"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
          </section>

          {/* BUREAU */}
          <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-gray-800">Membres du Bureau</h2>
                <button onClick={() => setIsModalOpen(true)} className="bg-secondary text-white px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-primary transition-colors text-sm font-bold">
                    <UserPlus size={16}/> Ajouter
                </button>
            </div>

            <div className="space-y-3">
                {members.length === 0 ? <p className="text-gray-400 text-center italic">Aucun membre.</p> : members.map(m => (
                    <div key={m.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100 group">
                        <div>
                            <div className="font-bold text-gray-900">{m.role}</div>
                            <div className="text-sm text-gray-600">{m.name}</div>
                        </div>
                        <button onClick={() => handleDeleteMember(m.id)} className="text-gray-300 hover:text-red-500 p-2 transition-colors opacity-0 group-hover:opacity-100">
                            <Trash2 size={18} />
                        </button>
                    </div>
                ))}
            </div>
          </section>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="p-4 border-b flex justify-between items-center">
               <h3 className="font-bold">Nouveau Membre</h3>
               <button onClick={() => setIsModalOpen(false)}><X /></button>
            </div>
            <form onSubmit={handleSaveMember} className="p-6 space-y-4">
               <div>
                  <label className="text-sm font-bold text-gray-500">Rôle</label>
                  <input required placeholder="ex: Trésorier" className="w-full border p-2 rounded mt-1" value={memberForm.role} onChange={e => setMemberForm({...memberForm, role: e.target.value})} />
               </div>
               <div>
                  <label className="text-sm font-bold text-gray-500">Nom & Prénom</label>
                  <input required className="w-full border p-2 rounded mt-1" value={memberForm.name} onChange={e => setMemberForm({...memberForm, name: e.target.value})} />
               </div>
               <button className="w-full bg-primary text-white py-2 rounded-lg font-bold hover:bg-primary-dark">Ajouter</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default ManageClub;