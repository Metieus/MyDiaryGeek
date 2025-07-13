import { database } from './database';
import { getUserId } from './utils';

export async function followUser(targetId: string): Promise<void> {
  const uid = getUserId();
  if (uid === targetId) return;
  await database.set(['users', uid, 'following', targetId], { createdAt: new Date().toISOString() });
  await database.set(['users', targetId, 'followers', uid], { createdAt: new Date().toISOString() });
}

export async function unfollowUser(targetId: string): Promise<void> {
  const uid = getUserId();
  await database.delete(['users', uid, 'following', targetId]);
  await database.delete(['users', targetId, 'followers', uid]);
}

export async function getFollowing(uid: string = getUserId()): Promise<string[]> {
  const snap = await database.getCollection<{ createdAt: string }>(['users', uid, 'following']);
  return snap.map(d => d.id);
}

export async function getFollowers(uid: string = getUserId()): Promise<string[]> {
  const snap = await database.getCollection<{ createdAt: string }>(['users', uid, 'followers']);
  return snap.map(d => d.id);
}
