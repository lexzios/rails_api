import React, { useState } from 'react';
import { Share2, UserPlus, UserMinus, Edit2 } from 'lucide-react';

const Leaderboard = () => {
  const [players, setPlayers] = useState([
    { id: 1, name: "CyberNinja", score: 9850, photo: "https://i.pravatar.cc/150?u=1", following: false },
    { id: 2, name: "PixelArtisan", score: 8700, photo: "https://i.pravatar.cc/150?u=2", following: true },
    // ... more dummy data
  ]);

  const shareScore = (name, score) => {
    const text = `I just saw ${name} scored ${score} on NeonRunner! Can you beat them?`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-slate-900 text-white rounded-xl shadow-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-cyan-400">Global Leaderboard</h1>
      <div className="space-y-4">
        {players.map((player, index) => (
          <div key={player.id} className="flex items-center justify-between bg-slate-800 p-4 rounded-lg border border-slate-700 hover:border-cyan-500 transition">
            <div className="flex items-center gap-4">
              <span className="text-xl font-bold text-slate-500 w-6">#{index + 1}</span>
              <img src={player.photo} className="w-12 h-12 rounded-full border-2 border-cyan-400" />
              <div>
                <p className="font-bold text-lg">{player.name}</p>
                <p className="text-cyan-400 font-mono">{player.score.toLocaleString()} PTS</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button onClick={() => shareScore(player.name, player.score)} className="p-2 hover:bg-slate-700 rounded-full">
                <Share2 size={20} />
              </button>
              <button className="p-2 hover:bg-slate-700 rounded-full text-cyan-400">
                {player.following ? <UserMinus size={20} /> : <UserPlus size={20} />}
              </button>
              <button className="p-2 hover:bg-slate-700 rounded-full">
                <Edit2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;