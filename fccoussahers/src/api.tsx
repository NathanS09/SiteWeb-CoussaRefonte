import PocketBase from 'pocketbase';

const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8090';
const pb = new PocketBase(apiUrl);

export async function fetchDonnees() {
    try {
        const records = await pb.collection('matches').getFullList({
            sort: '-created',
            requestKey: null
        });

        return records;

    } catch (error) {
        console.error("Erreur lors de la récupération :", error);
    }
}

export async function fetchPartenaires() {
    try {
        const records = await pb.collection('partners').getFullList({
            sort: '-sort_order', 
            requestKey: null
        });
        return records;
    } catch (error) {
        console.error("Erreur récupération partenaires :", error);
        return [];
    }
}

export async function fetchTeams() {
    try {
        const records = await pb.collection('teams').getFullList({
            sort: 'sort_order', 
            requestKey: null
        });
        return records;
    } catch (error) {
        console.error("Erreur récupération équipes :", error);
        return [];
    }
}

export async function fetchBoardMembers() {
    try {
        const records = await pb.collection('board_members').getFullList({
            sort: 'sort_order', // On utilise notre champ de tri personnalisé
            requestKey: null
        });
        return records;
    } catch (error) {
        console.error("Erreur bureau :", error);
        return [];
    }
}

export async function fetchClubInfo(slug: string) {
    try {
        const record = await pb.collection('club_info').getFirstListItem(`slug="${slug}"`, {
            requestKey: null
        });
        return record;
    } catch (error) {
        console.error("Erreur info club :", error);
        return null;
    }
}

export async function fetchEvents() {
    try {
        const records = await pb.collection('events').getFullList({
            sort: '-start_date',
            requestKey: null
        });
        return records;
    } catch (error) {
        console.error("Erreur events :", error);
        return [];
    }
}

export async function fetchAmicale() {
    try {
        const records = await pb.collection('amicale').getFullList({
            sort: '-created',
            requestKey: null
        });
        return records;
    } catch (error) {
        console.error("Erreur amicale :", error);
        return [];
    }
}

export function getPbImageUrl(record: any, fileName: string): string {
    if (!fileName) return '';
    return `${pb.baseUrl}/api/files/${record.collectionId}/${record.id}/${fileName}`;
}

export async function login(email: string, password: string) {
    try {
        const authData = await pb.collection('users').authWithPassword(email, password);
        return authData;
    } catch (error) {
        throw error;
    }
}

export function logout() {
    pb.authStore.clear();
}


export function isAuthenticated() {
    return pb.authStore.isValid;
}

// --- FONCTIONS D'ÉCRITURE (C.R.U.D) ---

// Créer un nouvel élément (ex: un nouveau match)
export async function createRecord(collection: string, data: any) {
    try {
        return await pb.collection(collection).create(data);
    } catch (error) {
        console.error(`Erreur création ${collection}:`, error);
        throw error;
    }
}

// Mettre à jour un élément (ex: saisir le score)
export async function updateRecord(collection: string, id: string, data: any) {
    try {
        return await pb.collection(collection).update(id, data);
    } catch (error) {
        console.error(`Erreur mise à jour ${collection}:`, error);
        throw error;
    }
}

// Supprimer un élément
export async function deleteRecord(collection: string, id: string) {
    try {
        return await pb.collection(collection).delete(id);
    } catch (error) {
        console.error(`Erreur suppression ${collection}:`, error);
        throw error;
    }
}

export function getCurrentUser() {
    return pb.authStore.model;
}

export const generatePassword = (length = 12) => {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  let retVal = "";
  for (let i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
};
