import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { PublicProfile, getPublicProfile } from '../../services/profileService';

interface Props {
  userId: string;
  onClose: () => void;
}

const ViewProfileModal: React.FC<Props> = ({ userId, onClose }) => {
  const [profile, setProfile] = useState<PublicProfile | null>(null);

  useEffect(() => {
    getPublicProfile(userId).then(setProfile);
  }, [userId]);

  if (!profile) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
        <div className="bg-slate-800 p-6 rounded-xl text-white">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 max-w-lg w-full overflow-hidden animate-slide-up">
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h2 className="text-2xl font-bold text-white">Perfil de {profile.name}</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
            <X className="text-slate-400" size={20} />
          </button>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-slate-700 flex items-center justify-center text-white text-2xl">
              {profile.avatar ? <img src={profile.avatar} className="w-full h-full object-cover" /> : profile.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-white font-semibold text-lg">{profile.name}</p>
              <p className="text-slate-400 text-sm">{profile.bio || 'Sem bio'}</p>
            </div>
          </div>
          <div>
            <h3 className="text-white font-medium mb-2">Favoritos</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {profile.favorites.characters.map(f => (
                <div key={f.id} className="text-center text-slate-300 text-sm">{f.name}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfileModal;
