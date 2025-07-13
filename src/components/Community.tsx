import React, { useState } from 'react';
import { followUser, unfollowUser, getFollowing } from '../services/followService';
import { getAllPublicProfiles, PublicProfile } from '../services/profileService';
import ViewProfileModal from './modals/ViewProfileModal';

interface ProfileResult {
  id: string;
  data: PublicProfile;
  following: boolean;
}

const Community: React.FC = () => {
  const [results, setResults] = useState<ProfileResult[]>([]);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<ProfileResult | null>(null);

  const search = async () => {
    const profiles = await getAllPublicProfiles();
    const following = new Set(await getFollowing());
    const filtered = profiles
      .filter(p => p.data.name.toLowerCase().includes(query.toLowerCase()))
      .map(p => ({ ...p, following: following.has(p.id) }));
    setResults(filtered);
  };

  const toggleFollow = async (profile: ProfileResult) => {
    if (profile.following) {
      await unfollowUser(profile.id);
    } else {
      await followUser(profile.id);
    }
    search();
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Buscar usuário"
          className="flex-1 px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none"
        />
        <button onClick={search} className="px-4 py-2 bg-purple-600 text-white rounded-lg">Buscar</button>
      </div>
      <div className="space-y-4">
        {results.map(res => (
          <div key={res.id} className="bg-slate-800/50 p-4 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-700 flex items-center justify-center text-white">
                {res.data.avatar ? <img src={res.data.avatar} className="w-full h-full object-cover" /> : res.data.name.charAt(0).toUpperCase()}
              </div>
              <p className="text-white font-medium">{res.data.name}</p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => toggleFollow(res)} className="px-3 py-1 bg-purple-600 rounded-lg text-white text-sm">
                {res.following ? 'Deixar de Seguir' : 'Seguir'}
              </button>
              <button onClick={() => setSelected(res)} className="px-3 py-1 bg-slate-700 rounded-lg text-white text-sm">Ver Perfil</button>
            </div>
          </div>
        ))}
      </div>
      {selected && (
        <ViewProfileModal userId={selected.id} onClose={() => setSelected(null)} />
      )}
    </div>
  );
};

export default Community;
