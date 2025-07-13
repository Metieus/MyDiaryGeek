import React from 'react';
import { useNotifications } from '../context/NotificationContext';

const NotificationBar: React.FC = () => {
  const { notifications, markAsRead } = useNotifications();

  if (notifications.length === 0) return null;

  return (
    <div className="space-y-2">
      {notifications.slice(0, 5).map(note => (
        <div key={note.id} className={`p-3 rounded-lg text-sm flex justify-between items-center ${note.read ? 'bg-slate-800/40' : 'bg-slate-800/80'}`}>
          <span className="text-white">{note.fromName} {note.message}</span>
          {!note.read && (
            <button onClick={() => markAsRead(note.id)} className="text-purple-400 text-xs">Marcar como lida</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default NotificationBar;
