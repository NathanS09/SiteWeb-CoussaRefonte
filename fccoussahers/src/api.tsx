import PocketBase from 'pocketbase';

const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8090';
const pb = new PocketBase(apiUrl);

export async function fetchDonnees() {
    try {
        const records = await pb.collection('matches').getFullList({
            sort: '-created',
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
        });
        return records;
    } catch (error) {
        console.error("Erreur bureau :", error);
        return [];
    }
}

export async function fetchClubInfo(slug: string) {
    try {
        const record = await pb.collection('club_info').getFirstListItem(`slug="${slug}"`);
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
        });
        return records;
    } catch (error) {
        console.error("Erreur amicale :", error);
        return [];
    }
}

export function getPbImageUrl(record: any, fileName: string) {
    if (!fileName) return null;
    return `${pb.baseUrl}/api/files/${record.collectionId}/${record.id}/${fileName}`;
}