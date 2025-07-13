import { database } from './database';
import { getUserId } from './utils';
import type { UserSettings, FavoriteItem } from '../App';

export interface PublicProfile {
  name: string;
  avatar?: string;
  bio?: string;
  favorites: {
    characters: FavoriteItem[];
    games: FavoriteItem[];
    movies: FavoriteItem[];
  };
}

export async function getPublicProfile(uid: string): Promise<PublicProfile | null> {
  return database.getDocument<PublicProfile>(['publicProfiles', uid]);
}

export async function savePublicProfile(data: PublicProfile): Promise<void> {
  const uid = getUserId();
  await database.set(['publicProfiles', uid], data, { merge: true });
}

export async function getAllPublicProfiles(): Promise<{ id: string; data: PublicProfile }[]> {
  return database.getCollection<PublicProfile>(['publicProfiles']);
}
