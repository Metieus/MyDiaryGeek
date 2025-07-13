import { database } from './database';
import { getUserId } from './utils';
import { getFollowers } from './followService';
import { getPublicProfile } from './profileService';

export interface Notification {
  id: string;
  fromUid: string;
  fromName: string;
  type: string;
  message: string;
  date: string;
  read: boolean;
}

export async function addNotification(toUid: string, data: Omit<Notification, 'id' | 'read'>): Promise<void> {
  await database.add(['users', toUid, 'notifications'], { ...data, read: false });
}

export async function getNotifications(): Promise<Notification[]> {
  const uid = getUserId();
  const snap = await database.getCollection<Omit<Notification, 'id'>>(['users', uid, 'notifications']);
  return snap.map(d => ({ id: d.id, ...d.data }));
}

export async function markNotificationRead(id: string): Promise<void> {
  const uid = getUserId();
  await database.update(['users', uid, 'notifications', id], { read: true });
}

export async function notifyFollowers(data: { type: string; message: string }): Promise<void> {
  const uid = getUserId();
  const followers = await getFollowers(uid);
  if (followers.length === 0) return;
  const profile = await getPublicProfile(uid);
  const fromName = profile?.name || 'Usuário';
  const date = new Date().toISOString();
  for (const follower of followers) {
    await addNotification(follower, {
      fromUid: uid,
      fromName,
      type: data.type,
      message: data.message,
      date,
    });
  }
}
