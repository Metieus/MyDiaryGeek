import React, { useState } from 'react';
import { Trophy } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { AchievementTree } from './AchievementTree';
import { AchievementModal } from './AchievementModal';
import { EditProfileModal } from './modals/EditProfileModal';
import { EditFavoritesModal } from './modals/EditFavoritesModal';
import { saveSettings } from '../services/settingsService';
import { AchievementNode } from '../types/achievements';

const Profile: React.FC = () => {
  const { settings, setSettings } = useAppContext();
  const { profile, loading } = useAuth();
  const [editProfile, setEditProfile] = useState(false);
  const [editFav, setEditFav] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState<AchievementNode | null>(null);
  const [activeTab, setActiveTab] = useState<'info' | 'achievements'>('info');

  const saveProfile = async (newSettings: typeof settings) => {
    setSettings(newSettings);
    await saveSettings(newSettings);
    setEditProfile(false);
  };

  const saveFav = async (fav: typeof settings.favorites) => {
    const updated = { ...settings, favorites: fav };
    setSettings(updated);
    await saveSettings(updated);
    setEditFav(false);
  };

  const renderCards = (items: typeof settings.favorites.characters) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {items.map((it) => {
        console.log('Favorite item', it);
        return (
          <div key={it.id} className="bg-slate-800/50 p-2 rounded-lg text-center border border-slate-700/50">
            <div className="w-full h-28 bg-slate-700 rounded-md overflow-hidden mb-2">
              {it.image ? <img src={it.image} alt={it.name} className="w-full h-full object-cover" /> : null}
            </div>
            <p className="text-sm text-white break-words">{it.name}</p>
          </div>
        );
      })}
      {items.length === 0 && <p className="text-slate-500 col-span-full">Nenhum item</p>}
    </div>
  );

  if (loading) {
    return <div className="text-white text-center p-6">Carregando perfil...</div>;
  }

  if (!profile) {
    return <div className="text-white text-center p-6">Perfil não encontrado.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-white mb-4">Meu Perfil</h1>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-slate-800/50 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('info')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'info'
              ? 'bg-purple-600 text-white'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Informações
        </button>
        <button
          onClick={() => setActiveTab('achievements')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
            activeTab === 'achievements'
              ? 'bg-purple-600 text-white'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Trophy size={16} />
          Conquistas
        </button>
      </div>
      {/* Tab Content */}
      {activeTab === 'info' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold overflow-hidden">
              {profile.avatar ? (
                <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
              ) : (
                profile.name?.charAt(0).toUpperCase()
              )}
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white">{profile.name}</h2>
              <p className="text-slate-400">{profile.bio || 'Sem bio definida.'}</p>
              <button
                onClick={() => setEditProfile(true)}
                className="mt-2 text-purple-400 hover:text-purple-300 text-sm"
              >
                Editar Perfil
              </button>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">Favoritos</h3>
              <button
                onClick={() => setEditFav(true)}
                className="text-purple-400 hover:text-purple-300 text-sm"
              >
                Editar Favoritos
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-800 p-4 rounded-xl">
                <h4 className="text-white font-medium mb-2">Personagens</h4>
                {profile.favorites?.characters?.length > 0 ? (
                  <ul className="text-slate-400 list-disc list-inside">
                    {profile.favorites.characters.map((char, idx) => (
                      <li key={idx}>{char}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-slate-500">Nenhum personagem favorito.</p>
                )}
              </div>

              <div className="bg-slate-800 p-4 rounded-xl">
                <h4 className="text-white font-medium mb-2">Jogos</h4>
                {profile.favorites?.games?.length > 0 ? (
                  <ul className="text-slate-400 list-disc list-inside">
                    {profile.favorites.games.map((game, idx) => (
                      <li key={idx}>{game}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-slate-500">Nenhum jogo favorito.</p>
                )}
              </div>

              <div className="bg-slate-800 p-4 rounded-xl">
                <h4 className="text-white font-medium mb-2">Filmes</h4>
                {profile.favorites?.movies?.length > 0 ? (
                  <ul className="text-slate-400 list-disc list-inside">
                    {profile.favorites.movies.map((movie, idx) => (
                      <li key={idx}>{movie}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-slate-500">Nenhum filme favorito.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Achievements Tab */}
      {activeTab === 'achievements' && (
        <AchievementTree onAchievementClick={setSelectedAchievement} />
      )}
      {editProfile && profile && (
        <EditProfileModal
          profile={profile}
          onSave={saveProfile}
          onClose={() => setEditProfile(false)}
        />
      )}

      {editFav && profile && (
        <EditFavoritesModal
          favorites={settings.favorites}
          onSave={saveFav}
          onClose={() => setEditFav(false)}
        />
      )}

      {/* Achievement Modal */}
      {selectedAchievement && (
        <AchievementModal
          achievement={selectedAchievement}
          onClose={() => setSelectedAchievement(null)}
        />
      )}
    </div>
  );
};

export default Profile;
