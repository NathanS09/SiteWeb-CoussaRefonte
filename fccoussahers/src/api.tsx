import PocketBase from 'pocketbase';

const pb = new PocketBase('http://51.91.254.20:8090/');

export async function fetchDonnees() {
    try {
        const records = await pb.collection('matches').getFullList({
            sort: '-created',
        });

        console.log(records);
        return records;

    } catch (error) {
        console.error("Erreur lors de la récupération :", error);
    }
}

export async function fetchPartenaires() {
    try {
        const records = await pb.collection('partners').getFullList({
            sort: '-created',
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
            sort: 'name', // ou sort: '-created' selon ta préférence
        });
        console.log('Fetched teams:', records);
        return records;
    } catch (error) {
        console.error("Erreur récupération équipes :", error);
        return [];
    }
}

export function getPbImageUrl(record: any, fileName: string) {
    if (!fileName) return null;
    return `${pb.baseUrl}/api/files/${record.collectionId}/${record.id}/${fileName}`;
}