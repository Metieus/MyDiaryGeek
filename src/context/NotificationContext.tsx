import React, { createContext, useContext, useEffect, useState } from 'react';
import { Notification, getNotifications, markNotificationRead } from '../services/notificationService';

interface NotificationContextType {
  notifications: Notification[];
  refresh: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const load = async () => {
    const list = await getNotifications();
    setNotifications(list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  };

  useEffect(() => {
    load();
  }, []);

  const markAsRead = async (id: string) => {
    await markNotificationRead(id);
    setNotifications(notifications.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  return (
    <NotificationContext.Provider value={{ notifications, refresh: load, markAsRead }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotifications must be used within NotificationProvider');
  return ctx;
};
