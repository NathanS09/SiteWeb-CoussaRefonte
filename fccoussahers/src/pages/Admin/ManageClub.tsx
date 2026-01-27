import React, { useState, useEffect } from 'react';
import { fetchClubInfo, fetchBoardMembers, updateRecord, createRecord, deleteRecord } from '../../api';
import { Save, UserPlus, Trash2, X, Info, Edit2 } from 'lucide-react';
import toast from 'react-hot-toast';

const ManageClub: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [infoId, setInfoId] = useState('');
  const [content, setContent] = useState('');
  const [members, setMembers] = useState<any[]>([]);
  
  // États Modal Bureau
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);
  
  // Formulaire Membre avec Sort Order
  const [memberForm, setMemberForm] = useState({ 
    name: '', 
    role: '', 
    sort_order: 10 
  });

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

  // --- ACTIONS HISTOIRE ---
  const handleSaveInfo = async () => {
    if (!infoId) return toast.error("Erreur technique (ID manquant)");
    toast.promise(updateRecord('club_info', infoId, { content }), {
      loading: 'Sauvegarde...', success: 'Historique mis à jour !', error: 'Erreur'
    });
  };

  // --- ACTIONS BUREAU ---
  const openModal = (member?: any) => {
    if (member) {
        // Mode Modification
        setEditingMemberId(member.id);
        setMemberForm({
            name: member.name,
            role: member.role,
            sort_order: member.sort_order || 10
        });
    } else {
        // Mode Création
        setEditingMemberId(null);
        setMemberForm({ name: '', role: '', sort_order: members.length + 10 });
    }
    setIsModalOpen(true);
  };

  const handleSaveMember = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const promise = editingMemberId 
        ? updateRecord('board_members', editingMemberId, memberForm)
        : createRecord('board_members', memberForm);

    toast.promise(
      promise.then(() => {
        setIsModalOpen(false);
        loadData();
      }),
      { 
          loading: 'Sauvegarde...', 
          success: editingMemberId ? 'Membre modifié' : 'Membre ajouté', 
          error: 'Erreur' 
      }
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
          {/* COLONNE GAUCHE : HISTOIRE */}
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

          {/* COLONNE DROITE : BUREAU */}
          <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-gray-800">Membres du Bureau</h2>
                <button onClick={() => openModal()} className="bg-secondary text-white px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-primary transition-colors text-sm font-bold">
                    <UserPlus size={16}/> Ajouter
                </button>
            </div>

            <div className="space-y-3">
                {members.length === 0 ? <p className="text-gray-400 text-center italic">Aucun membre.</p> : members.map(m => (
                    <div key={m.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100 group hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3">
                            <div className="bg-gray-100 text-gray-500 text-xs font-bold h-6 w-6 flex items-center justify-center rounded">
                                {m.sort_order}
                            </div>
                            <div>
                                <div className="font-bold text-gray-900">{m.role}</div>
                                <div className="text-sm text-gray-600">{m.name}</div>
                            </div>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                             <button onClick={() => openModal(m)} className="text-gray-400 hover:text-orange-500 p-2 transition-colors">
                                <Edit2 size={18} />
                            </button>
                            <button onClick={() => handleDeleteMember(m.id)} className="text-gray-400 hover:text-red-500 p-2 transition-colors">
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
          </section>
      </div>

      {/* MODAL BUREAU */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="p-4 border-b flex justify-between items-center bg-gray-50">
               <h3 className="font-bold text-lg">{editingMemberId ? 'Modifier le membre' : 'Nouveau Membre'}</h3>
               <button onClick={() => setIsModalOpen(false)}><X /></button>
            </div>
            <form onSubmit={handleSaveMember} className="p-6 space-y-4">
               <div>
                  <label className="text-sm font-bold text-gray-500">Rôle</label>
                  <input required placeholder="ex: Trésorier" className="w-full border p-2 rounded mt-1 outline-none focus:ring-2 focus:ring-primary" value={memberForm.role} onChange={e => setMemberForm({...memberForm, role: e.target.value})} />
               </div>
               <div>
                  <label className="text-sm font-bold text-gray-500">Nom & Prénom</label>
                  <input required className="w-full border p-2 rounded mt-1 outline-none focus:ring-2 focus:ring-primary" value={memberForm.name} onChange={e => setMemberForm({...memberForm, name: e.target.value})} />
               </div>
               <div>
                  <label className="text-sm font-bold text-gray-500">Ordre d'affichage (Tri)</label>
                  <input type="number" className="w-full border p-2 rounded mt-1 outline-none focus:ring-2 focus:ring-primary" value={memberForm.sort_order} onChange={e => setMemberForm({...memberForm, sort_order: parseInt(e.target.value)})} />
                  <p className="text-xs text-gray-400 mt-1">Plus le chiffre est petit, plus il apparait en haut.</p>
               </div>
               <button className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary-dark mt-2">
                   {editingMemberId ? 'Enregistrer les modifications' : 'Ajouter le membre'}
               </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default ManageClub;